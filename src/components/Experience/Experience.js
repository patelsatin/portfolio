import React, { useEffect, useRef, useState } from 'react';
import './Experience.scss';

const Experience = () => {
  const experienceRef = useRef(null);
  const [activeExperience, setActiveExperience] = useState(0);

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

  const experiences = [
    {
      id: 1,
      company: 'Amdocs',
      logo: '/logos/amdocs.png',
      position: 'Software Engineer',
      duration: 'Sep 2024 - Present',
      location: 'Pune, Maharashtra, India',
      type: 'Full-time',
      description: 'Working on Optima telecom management software, developing microservices and frontend components for telecom industry solutions.',
      responsibilities: [
        'Developing backend services using Spring Boot, JBoss Fuse, and Apache Camel',
        'Working with ReactJS and Redux for frontend development',
        'Integrating Drools rule engine for business logic implementation',
        'Working with PostgreSQL and Couchbase databases for data management',
        'Utilizing Docker + kubectl for local development testing and deployment',
        'Collaborating with cross-functional teams to deliver telecom solutions'
      ],
      technologies: ['ReactJS', 'Redux', 'Apache Camel', 'JBoss Fuse', 'Java 8', 'Spring Boot', 'PostgreSQL', 'Couchbase', 'Drools', 'Docker', 'Kubernetes'],
      achievements: [
        'Successfully integrated multiple microservices for telecom management',
        'Improved system performance through optimized database queries',
        'Contributed to the development of scalable frontend components'
      ],
      companyInfo: {
        industry: 'Telecommunications Software',
        size: '25,000+ employees',
        website: 'https://www.amdocs.com'
      }
    },
    {
      id: 2,
      company: 'Nagarro',
      logo: '/logos/nagarro.png',
      position: 'Staff Engineer',
      duration: 'Feb 2023 - Aug 2024',
      location: 'Gurgaon, Haryana, India',
      type: 'Full-time',
      description: 'Led frontend team development for comprehensive enterprise management systems with document handling and reporting capabilities.',
      responsibilities: [
        'Managed and guided frontend development team of 4+ developers',
        'Led design and implementation of responsive user interfaces using Angular',
        'Developed RESTful APIs with comprehensive documentation using Spring Boot',
        'Optimized database schemas and implemented complex business logic',
        'Enhanced development productivity with modern tools like GitHub Copilot',
        'Conducted code reviews and mentored junior developers'
      ],
      technologies: ['Angular', 'Spring Boot', 'Java 17', 'PrimeNG', 'Redis', 'GitHub Copilot', 'PostgreSQL', 'TypeScript', 'RxJS'],
      achievements: [
        'Led successful delivery of 3 major enterprise applications',
        'Reduced development time by 30% through team optimization',
        'Implemented automated testing strategies improving code quality',
        'Mentored 2 junior developers who were promoted during tenure'
      ],
      companyInfo: {
        industry: 'Digital Product Engineering',
        size: '10,000+ employees',
        website: 'https://www.nagarro.com'
      }
    },
    {
      id: 3,
      company: 'ATCS',
      logo: '/logos/ATCS.png',
      position: 'Associate Software Engineer',
      duration: 'Jun 2022 - Feb 2023',
      location: 'Jaipur, Rajasthan, India',
      type: 'Full-time',
      description: 'Developed user-friendly supplier registration platform enabling organizational users to review and approve supplier details for compliance.',
      responsibilities: [
        'Solely handled frontend development responsibilities for supplier management platform',
        'Designed responsive UI components using React and PrimeReact',
        'Created intuitive user-friendly forms with Redux state management',
        'Utilized Axios for seamless API integration and data fetching',
        'Implemented robust access control mechanisms for data security',
        'Collaborated with backend team for API design and integration'
      ],
      technologies: ['ReactJS', 'Spring Boot', 'PostgreSQL', 'Redis', 'PrimeReact', 'Axios', 'Redux', 'JavaScript', 'CSS3'],
      achievements: [
        'Delivered supplier management platform ahead of schedule',
        'Achieved 95% user satisfaction rating for UI/UX design',
        'Implemented efficient state management reducing load times by 40%',
        'Zero critical bugs reported in production deployment'
      ],
      companyInfo: {
        industry: 'Digital Product Engineering',
        size: '10,000+ employees',
        website: 'https://www.nagarro.com'
      }
    },
    {
      id: 4,
      company: 'Tata Consultancy Services',
      logo: '/logos/tcs.png',
      position: 'Assistant Systems Engineer - Trainee',
      duration: 'Nov 2020 - Jan 2022',
      location: 'Pune, Maharashtra, India',
      type: 'Full-time',
      description: 'Developed internal analytics dashboard providing valuable insights and data visualization with comprehensive data retrieval and transformation pipelines.',
      responsibilities: [
        'Developed comprehensive data retrieval pipelines from multiple database systems',
        'Worked with advanced data transformation and processing tools',
        'Created and maintained datasets for data governance and management using Collibra',
        'Built interactive and user-friendly dashboard components using ReactJS',
        'Implemented data visualization features for business intelligence',
        'Collaborated with data analysts and business stakeholders for requirements'
      ],
      technologies: ['ReactJS', 'MySQL', 'Sparkola', 'Collibra', 'JavaScript', 'Python', 'SQL', 'Data Visualization', 'ETL'],
      achievements: [
        'Built analytics dashboard serving 1000+ internal users',
        'Processed and visualized data from 10+ different data sources',
        'Reduced data processing time by 70% through pipeline optimization',
        'Received "Outstanding Performer" award for exceptional contribution'
      ],
      companyInfo: {
        industry: 'IT Services & Consulting',
        size: '500,000+ employees',
        website: 'https://www.tcs.com'
      }
    }
  ];

  const totalExperience = {
    years: 4,
    months: 3,
    companies: 3,
    projects: 8
  };

  return (
    <section id="experience" className="experience section" ref={experienceRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            {totalExperience.years}+ years of experience building scalable applications and leading development teams
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
            <h3>Career Progression</h3>
            <p>
              My journey in software development has been marked by continuous growth and increasing responsibilities. 
              Starting as a Systems Engineer at TCS, I've progressed to senior roles, leading teams and delivering 
              complex enterprise solutions across telecommunications, digital product engineering, and IT consulting domains.
            </p>
            <div className="progression-highlights">
              <div className="highlight">
                <i className="fas fa-arrow-up"></i>
                <span>Promoted 4 times across different organizations</span>
              </div>
              <div className="highlight">
                <i className="fas fa-users-cog"></i>
                <span>Led and mentored development teams</span>
              </div>
              <div className="highlight">
                <i className="fas fa-trophy"></i>
                <span>Consistently delivered projects ahead of schedule</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;