import React, { useState, useEffect } from "react";
import Footer from './Footer';
import './styles/Documentation.css'; // Import your custom CSS file
import Button from '@mui/material/Button';
import { BookOpen, Users, Headphones, Calendar, Image, MessageCircle, Clock, Code } from 'react-feather';
import { FaReddit } from 'react-icons/fa';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      let currentSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
                  <Button
                    className={`docsButton ${activeSection === 'introduction' ? 'active' : ''}`}
                    onClick={() => setActiveSection('introduction')}
                  >
                    <a href="#introduction"><BookOpen size={24} className="docsIcon" />Introduction</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'characters' ? 'active' : ''}`}
                    onClick={() => setActiveSection('characters')}
                  >
                    <a href="#characters"><Users size={24} className="docsIcon" />Characters</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'soundtrack' ? 'active' : ''}`}
                    onClick={() => setActiveSection('soundtrack')}
                  >
                    <a href="#soundtrack"><Headphones size={24} className="docsIcon" />Soundtrack</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'graphics' ? 'active' : ''}`}
                    onClick={() => setActiveSection('graphics')}
                  >
                    <a href="#graphics"><Image size={24} className="docsIcon" />Graphics</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'quotes' ? 'active' : ''}`}
                    onClick={() => setActiveSection('quotes')}
                  >
                    <a href="#quotes"><MessageCircle size={24} className="docsIcon" />Quotes</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'timeline' ? 'active' : ''}`}
                    onClick={() => setActiveSection('timeline')}
                  >
                    <a href="#timeline"><Calendar size={24} className="docsIcon" />Timeline</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'reddit' ? 'active' : ''}`}
                    onClick={() => setActiveSection('reddit')}
                  >
                    <a href="#reddit"><FaReddit size={24} className="docsIcon" />Reddit</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'rate-limiting' ? 'active' : ''}`}
                    onClick={() => setActiveSection('rate-limiting')}
                  >
                    <a href="#rate-limiting"><Clock size={24} className="docsIcon" />Rate Limiting</a>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`docsButton ${activeSection === 'code-example' ? 'active' : ''}`}
                    onClick={() => setActiveSection('code-example')}
                  >
                    <a href="#code-example"><Code size={24} className="docsIcon" />Code Example</a>
                  </Button>
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
      <Footer />
    </div>
  );
};

export default Documentation;
