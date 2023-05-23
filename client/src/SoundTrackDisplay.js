
import { useParams } from 'react-router-dom';
import Footer from "./Footer"

const SoundTrackDisplay = () => {
  const { id } = useParams();
  const episodeData = {
    1: {
      title: 'Project 1',
      description: 'Description for Project 1',
    },
    2: {
      title: 'Project 2',
      description: 'Description for Project 2',
    },
    3: {
      title: 'Project 3',
      description: 'Description for Project 3',
    },
    4: {
      title: 'Project 4',
      description: 'Description for Project 4',
    },
    5: {
      title: 'Project 1',
      description: 'Description for Project 1',
    },
    6: {
      title: 'Project 2',
      description: 'Description for Project 2',
    },
    7: {
      title: 'Project 3',
      description: 'Description for Project 3',
    },
    8: {
      title: 'Project 4',
      description: 'Description for Project 4',
    },
  };

  return (
    <div>
      <h1>{episodeData[id].title}</h1>
      <div>{episodeData[id].description}</div>
      <Footer/>
    </div>
  );
};

export default SoundTrackDisplay;
