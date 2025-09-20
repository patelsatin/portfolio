import React, { useEffect, useRef, useState } from 'react';
import './Skills.scss';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import PortfolioDataMissing from '../PortfolioDataMissing/PortfolioDataMissing';

const Skills = ({ onEditClick, portfolioData, isPublic = false, userId }) => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { data: hookData, loading, error } = usePortfolioData('skills');
  const skillsData = isPublic ? portfolioData : hookData;

  useEffect(() => {
    if (loading || !skillsData) return;

    const node = skillsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    // Ensure visible if already in view
    node.classList.add('animate');
    setIsVisible(true);

    return () => observer.disconnect();
  }, [loading, skillsData]);

  if (loading) {
    return (
      <section id="skills" className="skills section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading skills section...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="skills section">
        <div className="container">
          <div className="error-container">
            <p>Error loading skills section: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!skillsData) {
    return (
      <section id="skills" className="skills section">
        <div className="container">
          <PortfolioDataMissing 
            sectionName="Skills" 
            onEditClick={onEditClick}
          />
        </div>
      </section>
    );
  }

  const { sectionInfo, skillCategories, certifications, tools, expertiseHighlights, stats } = skillsData;

  return (
    <section id="skills" className="skills section" ref={skillsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{sectionInfo.title}</h2>
          <p className="section-subtitle">
            {sectionInfo.subtitle}
          </p>
        </div>

        <div className="skills__content">
          <div className="skills__categories">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="skill-category">
                <div className="category-header">
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                
                <div className="category-skills">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="skill-info">
                        <div className="skill-name">
                          <i className={skill.icon}></i>
                          <span>{skill.name}</span>
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="skills__additional">
            <div className="tools-section">
              <h3>Development Tools & IDEs</h3>
              <div className="tools-grid">
                {tools.map((tool, index) => (
                  <div key={index} className="tool-item">
                    <div className="tool-icon">
                      <i className={tool.icon}></i>
                    </div>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="certifications-section">
              <h3>Certifications & Learning</h3>
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <div className="cert-icon">
                      <i className={cert.icon}></i>
                    </div>
                    <div className="cert-content">
                      <h4 className="cert-name">{cert.name}</h4>
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-year">{cert.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="expertise-highlights">
              <h3>Key Expertise Areas</h3>
              <div className="highlights-grid">
                {expertiseHighlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-icon">
                      <i className={highlight.icon}></i>
                    </div>
                    <h4>{highlight.title}</h4>
                    <p>{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="skills__stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;