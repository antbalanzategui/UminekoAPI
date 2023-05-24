import React from "react";
import Footer from './Footer';
import './styles/Documentation.css'; // Import your custom CSS file
import Button from '@mui/material/Button';
import {BookOpen, Users, Headphones, Calendar,  Image, MessageCircle, Clock, Code} from 'react-feather';
import { FaReddit } from 'react-icons/fa';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

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
            
            <Button><a href="#introduction"><BookOpen size={24} className="docsIcon"/>Introduction</a></Button>
            </li>
            <li>
              <Button><a href="#characters"><Users size={24} className="docsIcon"/>Characters</a></Button>
            </li>
            <li>
              <Button><a href="#soundtrack"><Headphones size={24} className="docsIcon"/>Soundtrack</a></Button>
            </li>
            <li>
              <Button><a href="#graphics"><Image size={24} className="docsIcon"/>Graphics</a></Button>
            </li>
            <li>
              <Button><a href="#quotes"><MessageCircle size={24} className="docsIcon"/>Quotes</a></Button>
            </li>
            <li>
              <Button><a href="#timeline"><Calendar size={24} className="docsIcon"/>Timeline</a></Button>
            </li>
            <li>
              <Button><a href="#reddit"><FaReddit size={24} className="docsIcon"/>Reddit</a></Button>
            </li>
            <li>
              <Button><a href="#rate-limiting"><Clock size={24} className="docsIcon"/>Rate Limiting</a></Button>
            </li>
            <li>
              <Button><a href="#code-example"><Code size={24} className="docsIcon"/>Code Example</a></Button>
            </li>
          </ul>
        </nav>
      </header>
      </div>

      <div className="content">
        <section id="introduction" className="content-section"><h2>Introduction</h2></section>
        <section id="characters" className="content-section"><h2>Characters</h2></section>
        <section id="soundtrack" className="content-section"><h2>Soundtrack</h2></section>
        <section id="graphics" className="content-section"><h2> Graphics</h2></section>
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
