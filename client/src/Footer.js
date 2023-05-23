import React from 'react';
import { MarkGithubIcon } from '@primer/octicons-react';
import './styles/Footer.css';
import IconButton from '@mui/material/IconButton';

function Footer() {
  return <footer className="footer">
  <div className="footer-content">
    <div className="footer-links">
      <a href="/contact">Contact</a>
    </div>
    <div className="footer-bottom">
    <p>© {new Date().getFullYear()} UminekoAPI. All rights reserved.</p>
  </div>
    <div className="footer-social">
      <IconButton>
      <a href="https://github.com/antbalanzategui/UminekoAPI" target="_blank" rel="noopener noreferrer">
      <MarkGithubIcon size={32} />
      </a>
      </IconButton>
    </div>
  </div>
</footer>;
}

export default Footer;
