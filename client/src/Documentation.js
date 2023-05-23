import React from "react";
import Footer from './Footer';
import './styles/Documentation.css'; // Import your custom CSS file
import Button from '@mui/material/Button';

const Documentation = () => {
  return (
    <div>
    <div className="docContainer">

    <div className="navHolder">
      <header className="headerNav">
        <nav className="navbar">
          <ul>
            <li>
              <h1>Table of Contents</h1>
            </li>
            <li>
            <Button><a href="#introduction">Introduction</a></Button>
            </li>
            <li>
              <Button><a href="#characters">Characters</a></Button>
            </li>
            <li>
              <Button><a href="#soundtrack">Soundtrack</a></Button>
            </li>
            <li>
              <Button><a href="#computer-graphics">Computer Graphics</a></Button>
            </li>
            <li>
              <Button><a href="#quotes">Quotes</a></Button>
            </li>
            <li>
              <Button><a href="#timeline">Timeline</a></Button>
            </li>
            <li>
              <Button><a href="#reddit">Reddit</a></Button>
            </li>
            <li>
              <Button><a href="#rate-limiting">Rate Limiting</a></Button>
            </li>
            <li>
              <Button><a href="#code-example">Code Example</a></Button>
            </li>
          </ul>
        </nav>
      </header>
      </div>

      <div className="content">
        <section id="introduction" className="content-section"><h2>Introduction</h2></section>
        <section id="characters" className="content-section"><h2>Characters</h2></section>
        <section id="soundtrack" className="content-section"><h2>Soundtrack</h2></section>
        <section id="computer-graphics" className="content-section"><h2>Computer Graphics</h2></section>
        <section id="quotes" className="content-section"><h2>Quotes</h2></section>
        <section id="timeline" className="content-section"><h2>Timeline</h2></section>
        <section id="reddit" className="content-section"><h2>Reddit</h2></section>
        <section id="rate-limiting" className="content-section"><h2>Rate Limiting</h2></section>
        <section id="code-example" className="content-section"><h2>Code Examples</h2></section>
      </div>

    </div>
    <Footer/>
    </div>
  );
};







export default Documentation;
