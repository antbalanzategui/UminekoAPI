import MetaBalls from './Metaballs';
import './styles/NoPage.css'; // Import your custom CSS file for styling
import Header from './Header';
import Footer from './Footer';

const NoPage = () => {
  return (
    <div className="NoPage-Container">
      <Header></Header>
      <div className="MetaBallsContainer">
        <MetaBalls />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NoPage;
