import React, { useEffect, useRef, useState } from 'react';
import './Experience.scss';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const Experience = ({ portfolioData, isPublic = false, userId }) => {
  const experienceRef = useRef(null);
  const [activeExperience, setActiveExperience] = useState(0);
  const { data: hookData, loading, error } = usePortfolioData('experience');
  const experienceData = isPublic ? portfolioData : hookData;

  useEffect(() => {
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

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="experience section" ref={experienceRef}>
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading experience section...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !experienceData) {
    return (
      <section id="experience" className="experience section" ref={experienceRef}>
        <div className="container">
          <div className="error-container">
            <p>Error loading experience section</p>
          </div>
        </div>
      </section>
    );
  }

  const { sectionInfo, totalExperience, experiences, summary } = experienceData;

  return (
    <section id="experience" className="experience section" ref={experienceRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{sectionInfo.title}</h2>
          <p className="section-subtitle">
            {sectionInfo.subtitle}
          </p>
        </div>

        <div className="experience__stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalExperience.years}.{totalExperience.months}</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalExperience.companies}</div>
              <div className="stat-label">Companies</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalExperience.projects}+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies Mastered</div>
            </div>
          </div>
        </div>

        <div className="experience__content">
          <div className="experience__timeline">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`timeline-item ${activeExperience === index ? 'active' : ''}`}
                onClick={() => setActiveExperience(index)}
              >
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-content">
                  <div className="company-logo">
                    <img src={exp.logo} alt={`${exp.company} logo`} />
                  </div>
                  <div className="timeline-info">
                    <h4 className="company-name">{exp.company}</h4>
                    <p className="position-title">{exp.position}</p>
                    <span className="duration">{exp.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="experience__details">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`experience-card ${activeExperience === index ? 'active' : ''}`}
              >
                <div className="experience-header">
                  <div className="company-info">
                    <div className="company-logo-large">
                      <img src={exp.logo} alt={`${exp.company} logo`} />
                    </div>
                    <div className="company-details">
                      <h3 className="company-name">{exp.company}</h3>
                      <h4 className="position">{exp.position}</h4>
                      <div className="meta-info">
                        <span className="duration">
                          <i className="fas fa-calendar"></i>
                          {exp.duration}
                        </span>
                        <span className="location">
                          <i className="fas fa-map-marker-alt"></i>
                          {exp.location}
                        </span>
                        <span className="type">
                          <i className="fas fa-briefcase"></i>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="company-external">
                    <a 
                      href={exp.companyInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="company-link"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>

                <div className="experience-body">
                  <div className="description">
                    <p>{exp.description}</p>
                  </div>

                  <div className="responsibilities">
                    <h5>Key Responsibilities</h5>
                    <ul>
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="achievements">
                    <h5>Key Achievements</h5>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="technologies">
                    <h5>Technologies Used</h5>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="company-info-footer">
                    <div className="info-item">
                      <span className="label">Industry:</span>
                      <span className="value">{exp.companyInfo.industry}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Company Size:</span>
                      <span className="value">{exp.companyInfo.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience__summary">
          <div className="summary-content">
            <h3>{summary.title}</h3>
            <p>
              {summary.description}
            </p>
            <div className="progression-highlights">
              {summary.highlights.map((highlight, index) => (
                <div key={index} className="highlight">
                  <i className={highlight.icon}></i>
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;