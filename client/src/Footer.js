import React from 'react';
import { MarkGithubIcon } from '@primer/octicons-react';
import './styles/Footer.css';

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
      <a href="https://github.com/antbalanzategui/UminekoAPI" target="_blank" rel="noopener noreferrer">
      <MarkGithubIcon size={32} />
      </a>
    </div>
  </div>
</footer>;
}

export default Footer;
