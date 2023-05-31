import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/SoundTrackShowcase.css'; // Import your custom CSS file

const SoundTrackShowcase = () => {
  const [episodeData, setEpisodeData] = useState([]);

  useEffect(() => {
    const desiredIds = [1, 48, 65, 91, 117, 145, 172, 197];
    const descArr = [
      "Legend of the Golden Witch",
      "Turn of the Golden Witch",
      "Banquet of the Golden Witch",
      "Alliance of the Golden Witch",
      "End of the Golden Witch",
      "Dawn of the Golden Witch",
      "Requiem of the Golden Witch",
      "Twilight of the Golden Witch"
    ];

    const formattedData = desiredIds.map((id, index) => ({
      id: index + 1,
      title: `Episode ${index + 1}`,
      description: descArr[index],
      imageUrl: `http://localhost:3001/api/media/thumbnail${index + 1}.jpg`,
      hoverImageUrl: `/portraits/episode${index + 1}Portrait.jpg`,
      isHovered: false // Add a new property to track hover state per card
    }));

    setEpisodeData(formattedData);
    console.log(formattedData);
  }, []);

  const handleMouseEnter = (index) => {
    setEpisodeData((prevState) =>
      prevState.map((episode, i) => ({
        ...episode,
        isHovered: i === index // Set isHovered to true for the hovered card, false for others
      }))
    );
  };

  const handleMouseLeave = (index) => {
    setEpisodeData((prevState) =>
      prevState.map((episode, i) => ({
        ...episode,
        isHovered: false // Set isHovered to false for all cards
      }))
    );
  };

  return (
    <div>
      <h1 className="stsHeader">Episode 1 - 8</h1>
      <div className="card-grid">
        {episodeData.map((episode, index) => (
          <Link to={`/soundtrack/${episode.id}`} key={episode.id} style={{ textDecoration: 'none' }}>
            <div className="card-container">
              <Card
                className={`episodeCard cardWithBorder ${episode.isHovered ? 'cardHovered' : ''}`}
                sx={{ marginBottom: 2, cursor: 'pointer', borderRadius: '4px' }}
                onMouseEnter={() => handleMouseEnter(index)} // Pass the index to event handler
                onMouseLeave={() => handleMouseLeave(index)} // Pass the index to event handler
              >
                <CardMedia
                  sx={{ height: "80%" }}
                  component="img"
                  image={episode.imageUrl}
                  alt={episode.title}
                  onMouseOver={(e) => { e.currentTarget.src = episode.hoverImageUrl }}
                  onMouseOut={(e) => { e.currentTarget.src = episode.imageUrl }}
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
