import MetaBalls from './Metaballs';
import './styles/NoPage.css'; // Import your custom CSS file for styling

const NoPage = () => {
  return (
    <div className="NoPage-Container">
      <div className="nPHSticky">
        <section className="container">
          <div className="list">
            <div className="item">
              <span className="item-txt">404 </span>
              <span className="item-d">
                <p className="item-dot dot-t"></p>
              </span>
              <span className="item-txt">You Should Return </span>
              <span className="item-d">
                <p className="item-dot dot-b"></p>
              </span>
              <span className="item-txt " ><a href="/">Home</a></span>
              <span className="item-d">
                <p className="item-dot dot-g"></p>
              </span>
              <span className="item-txt">404 </span>
              <span className="item-d">
                <p className="item-dot dot-t"></p>
              </span>
              <span className="item-txt">You Should Return </span>
              <span className="item-d">
                <p className="item-dot dot-b"></p>
              </span>
              <span className="item-txt"><a href="/">Home</a></span>
              <span className="item-d">
                <p className="item-dot dot-g"></p>
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="MetaBallsContainer">
        <MetaBalls />
      </div>
    </div>
  );
};

export default NoPage;
