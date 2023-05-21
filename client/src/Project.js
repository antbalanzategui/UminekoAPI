
import { useParams } from 'react-router-dom';
import Footer from "./Footer"

const Project = () => {
  const { id } = useParams();
  const projectData = {
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
  };

  return (
    <div>
      <h1>{projectData[id].title}</h1>
      <div>{projectData[id].description}</div>
      <Footer/>
    </div>
  );
};

export default Project;
