import { Outlet, Link } from "react-router-dom";
import { MarkGithubIcon } from '@primer/octicons-react';
import { Sun, Moon } from 'react-feather';
import './styles/Header.css';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          '&:hover': {
            border: '1.5px solid',
            borderImage: 'linear-gradient(to right,#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) 1',
            borderImageSlice: 1,
          },
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          '&:hover': {
            border: '1.5px solid',
            borderImage: 'linear-gradient(to right,#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) 1',
            borderImageSlice: 1,
          },
        },
      },
    },
  },
});


  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
    <CssBaseline />
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
            <Link to="/showcase">Showcase</Link>
          </li>
          <li>
            <IconButton onClick={toggleLightMode}>
              {isLightMode ? <Moon className="logo" size={32} /> : <Sun className="logo" size={32} />}
              {/* Moon/Sun icon */}
            </IconButton>
          </li>
          <li>
            <IconButton className = "iconButton">
            <a href="https://github.com/antbalanzategui/UminekoAPI" target="_blank" rel="noopener noreferrer" className="GitHubHolder">
              <MarkGithubIcon className="logo" size={32} />
              {/* GitHub icon */}
            </a>
            </IconButton>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
    </ThemeProvider>
  );
};

export default Header;
