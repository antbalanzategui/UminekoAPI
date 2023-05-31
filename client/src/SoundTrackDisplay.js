import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from './Footer';
import './styles/SoundTrackDisplay.css'; // Import your custom CSS file for styling

const SoundTrackDisplay = () => {
  const { id } = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const [graphics, setGraphics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const desiredIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const parsedId = parseInt(id);

    if (desiredIds.includes(parsedId)) {
      const fetchEpisodeData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/soundtrack/episode=${id}`);
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

      const fetchGraphics = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/images?episodeStart=${id}&episodeEnd=${id}&type=Graphic`);
          if (!response.ok) {
            throw new Error('Failed to fetch graphics data');
          }

          const jsonData = await response.json();
          setGraphics(jsonData);
          console.log(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEpisodeData();
      fetchGraphics();
    } else {
      // Handle invalid id (e.g., redirect to a not found page)
      navigate('/404'); // Replace '/404' with your desired not found page path
    }
  }, [id, navigate]);

  if (!episodeData || !graphics) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }
  episodeData.length = 5;

  console.log(id);
  const intId = parseInt(id);
  let graphicIndex;

  if (intId === 1) {
    graphicIndex = 0;
  }
  else if (intId === 2) {
    graphicIndex = 0;
  }
  else if (intId === 3) {
    graphicIndex = 1;
  }
  else if (intId === 4) {
    graphicIndex = 4;
  }
  else if (intId === 5) {
    graphicIndex = 1;
  }
  else if (intId === 6) {
    graphicIndex = 2;
  }
  else if (intId === 7) {
    graphicIndex = 2;
  }
  else if (intId === 8) {
    graphicIndex = 4;
  }
  console.log(graphicIndex);
  console.log(graphics);
  console.log(graphics[graphicIndex].url);

  
  

  return (
    <div>
      <div className="showcaseHeader">
        <h1>{`Episode: ${episodeData[0].episode}`}</h1>
        <div>The Following is Simply a Way to Use the API to Decorate a WebPage using the SoundTrack Route</div>
      </div>
      <div className="carouselContainer">
        <Carousel showArrows={true} className="carousel">
          {episodeData.map((episode) => (
            <div key={episode.id}>
              <iframe
                title={episode.title}
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
      <div className="showcaseHeader">
        For instance, if you wanted to display computer graphics from a particular episode using the Images route:
      </div>
      <div className="graphicContainer">
      <img className ="graphic-image" src={graphics[graphicIndex].url}/>
      </div>
      <Footer />
    </div>
  );
};

export default SoundTrackDisplay;
