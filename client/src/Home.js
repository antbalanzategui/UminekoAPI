import Footer from './Footer';
import './styles/Home.css';

const Home = () => {
  return (
    <div className = "IntroDiv">
      <h1>
        A User-Friendly API For Visual Novel Series
      </h1>
      <span>
        <h1>
          Umineko When They Cry
          </h1>
        </span>
      <span>
        <h3>Access Information Regarding the Visual Novel's SoundTrack, Characters, Computer Graphics, and Quotes</h3>
      </span>
      <Footer />
    </div>
  );
};

export default Home;
