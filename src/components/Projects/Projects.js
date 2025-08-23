import React, { useEffect, useRef, useState } from 'react';
import './Projects.scss';

const Projects = () => {
  const projectsRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Telecom Management Software',
      category: 'enterprise',
      company: 'Amdocs',
      duration: 'Sep 2024 - Present',
      description: 'Working on Optima telecom management software, developing microservices and frontend components for telecom industry solutions.',
      technologies: ['ReactJS', 'Redux', 'Apache Camel', 'JBoss Fuse', 'Java 8', 'Spring Boot', 'PostgreSQL', 'Couchbase', 'Drools'],
      features: [
        'Developing backend services using Spring Boot, JBoss Fuse, and Apache Camel',
        'Working with ReactJS and Redux for frontend development',
        'Integrating Drools rule engine for business logic',
        'Working with PostgreSQL and Couchbase databases',
        'Utilizing Docker + kubectl for local development testing'
      ],
      image: '/logos/amdocs.png',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Enterprise Management System',
      category: 'enterprise',
      company: 'Nagarro',
      duration: 'Jan 2023 - Aug 2024',
      description: 'Led frontend team development for comprehensive enterprise management system with document handling and reporting capabilities.',
      technologies: ['Angular', 'Spring Boot', 'Java 17', 'PrimeNG', 'Redis', 'GitHub Copilot', 'PostgreSQL'],
      features: [
        'Managed and guided frontend development team',
        'Led design and implementation of responsive user interfaces',
        'Developed RESTful APIs with comprehensive documentation',
        'Optimized database schemas and implemented business logic',
        'Enhanced development productivity with modern tools'
      ],
      image: '/logos/nagarro.png',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Supplier Management Platform',
      category: 'web-app',
      company: 'Nagarro',
      duration: 'Jun 2022 - Dec 2022',
      description: 'User-friendly supplier registration platform enabling organizational users to review and approve supplier details for compliance.',
      technologies: ['ReactJS', 'Spring Boot', 'PostgreSQL', 'Redis', 'PrimeReact', 'Axios', 'Redux'],
      features: [
        'Solely handled frontend development responsibilities',
        'Designed responsive UI with React and PrimeReact',
        'Created user-friendly forms with Redux state management',
        'Utilized Axios for seamless API integration',
        'Implemented robust access control for data security'
      ],
      image: '/logos/nagarro.png',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Automated Reporting System',
      category: 'web-app',
      company: 'Nagarro',
      duration: 'Mar 2022 - May 2022',
      description: 'Automated system for team data management, calculations, and collaborative reviews with dynamic report generation capabilities.',
      technologies: ['Angular 7/14', 'Spring Boot', 'PostgreSQL', 'Thymeleaf', 'Redis'],
      features: [
        'Migrated existing Angular 7 module to Angular 14',
        'Implemented server-to-server communication for REST APIs',
        'Designed dynamic screens for versatile data management',
        'Developed APIs for dynamic document generation',
        'Integrated multi-department approval processes'
      ],
      image: '/logos/nagarro.png',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Internal Analytics Dashboard',
      category: 'dashboard',
      company: 'TCS',
      duration: 'Nov 2020 - Jan 2022',
      description: 'Internal dashboard providing valuable insights and data visualization with comprehensive data retrieval and transformation pipelines.',
      technologies: ['ReactJS', 'MySQL', 'Sparkola', 'Collibra', 'JavaScript'],
      features: [
        'Developed data retrieval pipelines from database systems',
        'Worked with data transformation and processing tools',
        'Created datasets for data governance and management',
        'Built interactive and user-friendly dashboard components',
        'Implemented comprehensive data visualization features'
      ],
      image: '/logos/tcs.png',
      status: 'Completed'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'enterprise', name: 'Enterprise', count: projects.filter(p => p.category === 'enterprise').length },
    { id: 'web-app', name: 'Web Applications', count: projects.filter(p => p.category === 'web-app').length },
    { id: 'dashboard', name: 'Dashboards', count: projects.filter(p => p.category === 'dashboard').length }
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <section id="projects" className="projects section" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Showcasing my expertise in full-stack development and enterprise solutions
          </p>
        </div>

        <div className="projects__filters">
          {categories.map((category) => (
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
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">5+</div>
              <div className="stat-label">Major Projects</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-code-branch"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies Used</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">3</div>
              <div className="stat-label">Companies</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">4.3</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="projects__note">
          <div className="note-content">
            <div className="note-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="note-text">
              <h4>Professional Work Portfolio</h4>
              <p>
                The projects showcased here represent my professional experience across enterprise-level 
                applications. Due to confidentiality agreements and proprietary nature of the work, 
                specific implementation details and source code cannot be shared publicly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;