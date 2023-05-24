import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/SoundTrackShowcase.css'; // Import your custom CSS file

const SoundTrackShowcase = () => {
  const [episodeData, setEpisodeData] = useState([]); // Declare projectData state

  useEffect(() => {
    const desiredIds = [1, 48, 65, 91, 117, 145, 172, 197]; // Specify the desired ids here
    const descArr = ["Legend of the Golden Witch", "Turn of the Golden Witch", "Banquet of the Golden Witch",
      "Alliance of the Golden Witch", "End of the Golden Witch", "Dawn of the Golden Witch", "Requiem of the Golden Witch", "Twilight of the Golden Witch"];
  
    const formattedData = desiredIds.map((id, index) => ({
      id: index + 1,
      title: `Episode ${index + 1}`,
      description: descArr[index],
      imageUrl: `http://localhost:3001/api/thumbnail${index + 1}.jpg`,
      hoverImageUrl: `/portraits/episode${index + 1}Portrait.jpg`,
    }));
  
    // Update the episodeData state with the formatted data
    setEpisodeData(formattedData);
    console.log(formattedData);
  }, []);
  

  return (
    <div>
      <h1 className = "stsHeader">Episode 1 - 8</h1>
      <div className="card-grid">
        {episodeData.map((episode) => (
          <Link to={`/soundtrack/${episode.id}`} key={episode.id}>
            <div className="card-container">
            <Card
              sx={{ marginBottom: 2, cursor: 'pointer' }}
            >

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
                className="cardImage"
              />
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
