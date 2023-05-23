import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/SoundTrackShowcase.css'; // Import your custom CSS file

const SoundTrackShowcase = () => {
  const [episodeData, setEpisodeData] = useState([]); // Declare projectData state

  useEffect(() => {
    fetch('http://localhost:3001/api/umineko/soundtrack?')
      .then((response) => response.json())
      .then((data) => {
        const desiredIds = [1, 48, 65, 91, 117, 145, 172, 197]; // Specify the desired ids here
        
        const filteredData = data.filter(item => desiredIds.includes(item.id));

        // Create the projectData array with the filtered items
        const formattedData = filteredData.map((item, index) => ({
          id: index + 1,
          title: `Episode ${item.episode}`,
          description: `Description for Episode ${index + 1}`,
          imageUrl: item.thumbnail,
          hoverImageUrl: `/portraits/episode${index + 1}Portrait.jpg`,
        }));        
        // Update the projectData state with the formatted data
        setEpisodeData(formattedData);
        console.log(formattedData);
      });
  }, []);

  return (
    <div>
      <h1>Episode 1 - 8</h1>
      <div className="card-grid">
        {episodeData.map((episode) => (
          <Link to={`/soundtrack/${episode.id}`} key={episode.id}>
            <div className="card-container">
            <Card
              sx={{ marginBottom: 2, cursor: 'pointer' }}
            >
              <div class="cardImage">
              <CardMedia
              sx={{
                height: "80%",
                transition: 'padding 0.2s', // Add a transition for a smooth effect
              }}
                component="img"
                image={episode.imageUrl}
                alt={episode.title}
                onMouseOver={(e) => { e.currentTarget.src = episode.hoverImageUrl }} // Change the image on hover
                onMouseOut={(e) => { e.currentTarget.src = episode.imageUrl }} // Revert to the original image on mouse out
              />
              </div>
              <CardContent>
                <Typography variant="h6">{episode.title}</Typography>
                <Typography variant="body2">{episode.description}</Typography>
              </CardContent>
            </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );  
};

export default SoundTrackShowcase;
