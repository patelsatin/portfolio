import React, { useEffect, useRef, useState } from 'react';
import './Projects.scss';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import PortfolioDataMissing from '../PortfolioDataMissing/PortfolioDataMissing';

const Projects = ({ onEditClick, portfolioData, isPublic = false, userId }) => {
  const projectsRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { data: hookData, loading, error } = usePortfolioData('projects');
  const projectsData = isPublic ? portfolioData : hookData;

  useEffect(() => {
    if (loading || !projectsData) return;

    const node = projectsRef.current;
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
    // Ensure visible if already in view
    node.classList.add('animate');

    return () => observer.disconnect();
  }, [loading, projectsData]);

  useEffect(() => {
    if (!projectsData?.projects) return;
    
    if (activeFilter === 'all') {
      setFilteredProjects(projectsData.projects);
    } else {
      setFilteredProjects(projectsData.projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, projectsData]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading projects section...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <div className="error-container">
            <p>Error loading projects section: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!projectsData) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <PortfolioDataMissing 
            sectionName="Projects" 
            onEditClick={onEditClick}
          />
        </div>
      </section>
    );
  }

  const { sectionInfo, projects, categories, stats, note } = projectsData;

  // Calculate category counts dynamically
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: category.id === 'all' ? projects.length : projects.filter(p => p.category === category.id).length
  }));

  return (
    <section id="projects" className="projects section" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{sectionInfo.title}</h2>
          <p className="section-subtitle">
            {sectionInfo.subtitle}
          </p>
        </div>

        <div className="projects__filters">
          {categoriesWithCounts.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(category.id)}
            >
              {category.name}
              <span className="count">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <div className="overlay-btn">
                      <i className="fas fa-briefcase"></i>
                      <span>Professional Work</span>
                    </div>
                    <div className="overlay-btn">
                      <i className="fas fa-shield-alt"></i>
                      <span>Confidential</span>
                    </div>
                  </div>
                </div>
                <div className="project-status">
                  <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <div className="project-meta">
                    <span className="company">{project.company}</span>
                    <span className="duration">{project.duration}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-more">+{project.technologies.length - 4} more</span>
                  )}
                </div>

                <div className="project-features">
                  <h4>Key Contributions:</h4>
                  <ul>
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-actions">
                  <button className="btn btn--primary" disabled>
                    <i className="fas fa-lock"></i>
                    Confidential Project
                  </button>
                  <div className="project-links">
                    <div className="project-link disabled" title="Internal Project">
                      <i className="fas fa-building"></i>
                    </div>
                    <div className="project-link disabled" title="Proprietary Code">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__note">
          <div className="note-content">
            <div className="note-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="note-text">
              <h4>{note.title}</h4>
              <p>
                {note.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;