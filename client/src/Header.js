import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MarkGithubIcon } from '@primer/octicons-react';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';
import './Header.css'

const Header = () => {
  return (
    <>
      <nav>
        <ul className = 'navbar-list'>
          <li>
          <img src={process.env.PUBLIC_URL + '/Umineko_One-Winged_Eagle.png'} alt="Umineko Logo" className='logo'/>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/documentation">Documentation</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
          <Sun size={32} />
          {/* Sun icon */}
        </li>
          <li>
          <MarkGithubIcon size={32} />
          {/* GitHub icon */}
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;