import Footer from './Footer';
import './styles/Home.css';
import {Star, Users, Headphones, Calendar,  Image, MessageCircle} from 'react-feather';
import { Card, CardContent, Typography} from '@mui/material';
import { FaReddit } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Home = () => {


  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
    <div className="page-container">
      <div className="IntroDiv">
        <h1>
          A User-Friendly API For Visual Novel Series
        </h1>
        <span>
          <h1 className="UminekoName">
            Umineko When They Cry
          </h1>
        </span>
        <div className = "h3container">
        <span>
          <h3>Access Information Regarding the Visual Novel's</h3>
        </span>
        <span>
          <h3>SoundTrack, Characters, Computer Graphics, Timeline, and Quotes</h3>
        </span>
        </div>
      </div>
      <div className ="FeatureSection">
        <div className = "featureHeader">
        <Star size={24}/>
        <h1>Features</h1>
        </div>
        <div className="featuresGrid">
      <Card className="gridItem cardWithBorder"  
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ borderRadius: '4px' }}
      >
        <CardContent>
          <Users size={24} />
          <Typography variant="h5" component="h2">
            Character Data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access to All Characters Within the Visual Novel
          </Typography>
        </CardContent>
        {isHovered && 
        <div
          className="gradientBorder"
        />
      }
      </Card>
      <Card className="gridItem" sx={{ borderRadius: '4px' }}>
        <CardContent>
          <Headphones size = {24}/>
          <Typography variant="h5" component="h2">
            SoundTrack Data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access to All SoundTracks Within the Visual Novel
          </Typography>
        </CardContent>
      </Card>
      <Card className="gridItem" sx={{ borderRadius: '4px' }}>
        <CardContent>
          <Calendar size = {24}/>
          <Typography variant="h5" component="h2">
            Timeline Data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            An Indepth Timeline of All Events Within the Visual Novel
          </Typography>
        </CardContent>
      </Card>
      <Card className="gridItem" sx={{ borderRadius: '4px' }}>
        <CardContent>
          <Image size = {24}/>
          <Typography variant="h5" component="h2">
            Computer Graphics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access to Computer Graphics used throughout the Visual Novel
          </Typography>
        </CardContent>
      </Card>
      <Card className="gridItem" sx={{ borderRadius: '4px' }}> 
        <CardContent>
          <MessageCircle size = {24}/>
          <Typography variant="h5" component="h2">
            Quotes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            An extensive list of Quotes used throughout the Visual Novel
          </Typography>
        </CardContent>
      </Card>
      <Card className="gridItem" sx={{ borderRadius: '4px' }}>
        <CardContent>
        <div className="card-icon">
          <FaReddit className="inverted-icon" size={24} />
        </div>
          <Typography variant="h5" component="h2">
            Reddit
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Incoming Feature...
          </Typography>
        </CardContent>
      </Card>
    </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
