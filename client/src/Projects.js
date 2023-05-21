import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from "./Footer"

const projectData = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description for Project 1',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description for Project 2',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Description for Project 3',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'Description for Project 4',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const Projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {projectData.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <Card
              sx={{ width: "20vw", height: "40vh", marginBottom: 2, cursor: 'pointer' }}
            >
              <CardMedia
              component="img"
              height="60%"
              width = "100%"
              image= {project.imageUrl}
              alt={project.title}
              />
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
            </Card>
            
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
