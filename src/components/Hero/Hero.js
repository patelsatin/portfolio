import React, { useState, useEffect } from 'react';
import './Hero.scss';

const Hero = () => {
    const skills = [
        'Java Development',
        'Spring Boot',
        'ReactJS',
        'JavaScript ES6+',
        'REST APIs',
        'Microservices',
        'PostgreSQL',
        'Docker',
        'Redux',
        'Spring Data JPA',
        'TypeScript',
        'Angular',
        'PrimeReact',
        'Redis Caching',
        'Git & DevOps',
        'AWS Cloud',
        'Secure Coding'
      ];

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex];
    
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentSkill) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        // Finished deleting, move to next skill
        setIsDeleting(false);
        setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
      } else if (isDeleting) {
        // Continue deleting
        setDisplayText(currentSkill.substring(0, displayText.length - 1));
      } else {
        // Continue typing
        setDisplayText(currentSkill.substring(0, displayText.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSkillIndex, skills]);

  return (
    <section className="hero animate" id='home'>
      <div className="hero__background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__greeting">Hello, I'm</p>
            <h1 className="hero__name">Satin Patel</h1>
            <h2 className="hero__title">Full Stack Developer</h2>
            <p className="hero__description">
              Passionate about creating innovative web solutions and bringing ideas to life through code.
            </p>

            <div className="hero__expertise" style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <p className="expertise-label">I have expertise in:</p>
              <div className="typing-container">
                <span className={`typing-text ${isTyping ? 'typing' : ''}`}>
                  {displayText}
                </span>
              </div>
            </div>

            <div className="hero__actions">
              <a href="#experience" className="btn btn-primary">View My Work</a>
              <a href="/resume.pdf" download className="btn btn-outline">Download CV</a>
            </div>

            <div className="hero__social">
              <a 
                href="https://github.com/patelsatin" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link github"
                aria-label="Visit GitHub Profile"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/satin-patel-07967a150/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link linkedin"
                aria-label="Visit LinkedIn Profile"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://twitter.com/satinpatel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link twitter"
                aria-label="Visit Twitter Profile"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://medium.com/@satin15patel1996" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link dribbble"
                aria-label="Visit Dribbble Profile"
              >
                <i className="fab fa-medium"></i>
              </a>
            </div>
          </div>

          <div className="hero__image">
            <div className="image-container">
              <div className="image-placeholder">
                <img src="/pp.jpg" alt="Profile" className="profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;