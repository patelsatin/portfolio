import React, { useEffect, useRef } from 'react';
import './About.scss';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import PortfolioDataMissing from '../PortfolioDataMissing/PortfolioDataMissing';

const About = ({ onEditClick, portfolioData, isPublic = false, userId }) => {
  const aboutRef = useRef(null);
  const { data: hookData, loading, error, hasUserData } = usePortfolioData('about');
  const aboutData = isPublic ? portfolioData : hookData;
  
  // Debug logs removed in production

  useEffect(() => {
    if (loading || !aboutData) return;

    const node = aboutRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    // Ensure visible even if already in view
    node.classList.add('animate');

    return () => observer.disconnect();
  }, [loading, aboutData]);

  if (!isPublic && loading) {
    return (
      <section id="about" className="about section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading about section...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isPublic && error) {
    return (
      <section id="about" className="about section">
        <div className="container">
          <div className="error-container">
            <p>Error loading about section: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isPublic && !aboutData) {
    console.log('About: aboutData is falsy, showing PortfolioDataMissing');
    return (
      <section id="about" className="about section">
        <div className="container">
          <PortfolioDataMissing 
            sectionName="About" 
            onEditClick={onEditClick}
          />
        </div>
      </section>
    );
  }
  
  console.log('About: aboutData exists, proceeding to render with data:', aboutData);

  const { sectionInfo, personalInfo, skillsOverview, stats, achievements, education } = aboutData;
  
  // Hardcoded values (do not come from JSON/response)
  const HARD_TITLE = 'About Me';
  // Use a playful cartoon avatar instead of a real image
  const HARD_IMAGE = { 
    src: './about.jpeg', 
    alt: 'Professional developer illustration' 
  };

  return (
    <section id="about" className="about section" ref={aboutRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{HARD_TITLE}</h2>
          <p className="section-subtitle">
            {sectionInfo.subtitle}
          </p>
          {hasUserData && (
            <div className="data-source-indicator">
              <i className="fas fa-database"></i>
              <span>Your Custom Data</span>
            </div>
          )}
        </div>

        <div className="about__content">
          <div className="about__text">
            <div className="about__intro">
              <h3>{personalInfo.greeting}</h3>
              {personalInfo.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="about__skills-overview">
              <h4>{skillsOverview.title}</h4>
              <div className="skills-grid">
                {skillsOverview.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-icon">
                      <i className={skill.icon}></i>
                    </div>
                    <h5>{skill.title}</h5>
                    <p>{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about__visual">
            <div className="about__image">
              <img 
                src={HARD_IMAGE.src} 
                alt={HARD_IMAGE.alt}
                className="about-img"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <i className="fas fa-code"></i>
                  <span>View My Work</span>
                </div>
              </div>
            </div>

            <div className="about__stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about__achievements">
          <h3>Recognition & Awards</h3>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="achievement-content">
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <div className="achievement-meta">
                    <span className="achievement-company">{achievement.company}</span>
                    <span className="achievement-year">{achievement.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about__education">
          <h3>{education.title}</h3>
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="education-content">
              <h4>{education.degree}</h4>
              <div className="education-institution">{education.institution}</div>
              <div className="education-period">{education.period}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;