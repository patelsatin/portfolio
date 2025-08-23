import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Experience from './components/Experience/Experience';
import { ThemeProvider } from './components/ThemeContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;