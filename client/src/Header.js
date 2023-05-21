import { Outlet, Link } from "react-router-dom";
import { MarkGithubIcon } from '@primer/octicons-react';
import { Sun, Moon } from 'react-feather';
import './styles/Header.css';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem('lightMode');
    if (storedPreference !== null) {
      setIsLightMode(storedPreference === 'true');
    }
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('lightMode', isLightMode.toString());
  }, [isLightMode]);

  const toggleLightMode = () => {
    setIsLightMode(prevMode => !prevMode);
  };

  return (
    <>
      <nav className = "sticky-navbar">
        <ul className='navbar-list'>
          <li>
            <Link to="/">
              <div className="HomeDiv">
                <img src={process.env.PUBLIC_URL + '/Umineko_One-Winged_Eagle.png'} alt="Umineko Logo" className='logo' />
                <span className="UmiSpan">UminekoAPI</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/documentation">Documentation</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <button onClick={toggleLightMode}>
              {isLightMode ? <Moon size={32} /> : <Sun size={32} />}
              {/* Moon/Sun icon */}
            </button>
          </li>
          <li>
            <a href="https://github.com/antbalanzategui/UminekoAPI" target="_blank" rel="noopener noreferrer">
              <MarkGithubIcon size={32} />
              {/* GitHub icon */}
            </a>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;
