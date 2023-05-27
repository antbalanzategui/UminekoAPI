import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from './Footer';
import './styles/SoundTrackDisplay.css'; // Import your custom CSS file for styling

const SoundTrackDisplay = () => {
  const { id } = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const desiredIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const parsedId = parseInt(id);

    if (desiredIds.includes(parsedId)) {
      const fetchEpisodeData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/umineko/soundtrack/episode=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch episode data');
          }
  
          const jsonData = await response.json();
          setEpisodeData(jsonData);
          console.log(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEpisodeData();
    } else {
      // Handle invalid id (e.g., redirect to a not found page)
      navigate('/404'); // Replace '/404' with your desired not found page path
    }
  }, [id, navigate]);

  if (!episodeData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  console.log(episodeData);
  console.log(episodeData[0]);
  console.log(episodeData[0].composer);
  console.log(episodeData[0].link);
  episodeData.length = 5;

  return (
    <div>
      <h1>{`Episode: ${episodeData[0].episode}`}</h1>
      <div>The Following is Simply a Way to Use the API to Decorate a WebPage using the SoundTrack Route</div>
      <div className="carouselContainer">
      <Carousel showArrows={true} className="carousel">
        {episodeData.map((episode) => (
          <div key={episode.id}>
            <iframe
              title={episode.title}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${episode.videoId}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <h3>{episode.title}</h3>
            <p>Composer: {episode.composer}</p>
          </div>
        ))}
      </Carousel>
      </div>
      <Footer />
    </div>
  );
};

export default SoundTrackDisplay;
