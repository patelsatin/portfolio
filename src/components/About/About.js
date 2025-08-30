import React, { useEffect, useRef } from 'react';
import './About.scss';

const About = () => {
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '4.3+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Completed' },
    { number: '50+', label: 'APIs Developed' },
    { number: '3', label: 'Awards Won' }
  ];

  const experiences = [
    {
      year: 'Sep 2024 - Present',
      title: 'Software Engineer',
      company: 'Amdocs, Pune',
      description: 'Working on Optima telecom management software, developing microservices using JBoss Fuse, Apache Camel, and Spring Boot with React and Redux for frontend.'
    },
    {
      year: 'Jan 2022 - Aug 2024',
      title: 'Software Engineer',
      company: 'Nagarro, Jaipur',
      description: 'Led frontend teams, developed full-stack applications using Spring Boot and ReactJS/Angular, implemented Redis caching, and optimized API performance to execute under 1 second.'
    },
    {
      year: 'Nov 2020 - Jan 2022',
      title: 'Assistant System Engineer',
      company: 'TCS, Hyderabad',
      description: 'Developed data retrieval pipelines, worked with Sparkola and Collibra, built internal dashboards using ReactJS, and gained expertise in MySQL and data visualization.'
    }
  ];

  const achievements = [
    {
      title: 'The Brightest Mind Award',
      company: 'Nagarro',
      year: '2023-2024',
    },
    {
      title: 'Best of the Best Award',
      company: 'Nagarro',
      year: 'Q3 & Q4 2022',
    },
    {
      title: 'On the Spot Gems Award',
      company: 'TCS',
      year: '2021',
    }
    ,{
      title: 'Go Above And Beyond',
      company: 'Amdocs',
      year: '2025'
    },{
      title: 'Knowledge Champion',
      company: 'Amdocs',
      year: '2025'
    },{
      title: 'Impact Master',
      company: 'Amdocs',
      year: '2025'
    }
  ];

  return (
    <section id="about" className="about section" ref={aboutRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Dynamic Full-stack Java developer with 4.3 years of hands-on experience
          </p>
        </div>

        <div className="about__content">
          <div className="about__text">
            <div className="about__intro">
              <h3>Hello! I'm Satin Patel</h3>
              <p>
                I'm a dynamic Full-stack Java developer with 4.3 years of hands-on experience, 
                adept at driving successful project outcomes through effective leadership and team collaboration. 
                I specialize in building enterprise-grade applications using modern technologies like Spring Boot, 
                ReactJS, and microservices architecture.
              </p>
              <p>
                My expertise lies in project management, consistently delivering high-quality solutions 
                by aligning client requirements with innovative technical solutions. I have a proven track 
                record of optimizing API performance, implementing secure coding practices, and leading 
                frontend development teams.
              </p>
              <p>
                I'm committed to excellence in service delivery, engaging closely with clients to understand 
                their needs and deliver exceptional results. When I'm not coding, I'm exploring new 
                technologies and contributing to open-source projects.
              </p>
            </div>

            <div className="about__skills-overview">
              <h4>What I Do</h4>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-icon">
                    <i className="fab fa-java"></i>
                  </div>
                  <h5>Backend Development</h5>
                  <p>Building robust microservices using Spring Boot, JBoss Fuse, Apache Camel, and implementing Drools rule engine for business logic.</p>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <i className="fab fa-react"></i>
                  </div>
                  <h5>Frontend Development</h5>
                  <p>Creating responsive interfaces using ReactJS, Angular, Redux, PrimeNG, and PrimeReact with focus on user experience.</p>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <i className="fas fa-database"></i>
                  </div>
                  <h5>Database Management</h5>
                  <p>Working with PostgreSQL, MySQL, Couchbase (NoSQL), and implementing Redis caching for performance optimization.</p>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                  <h5>DevOps & Cloud</h5>
                  <p>Utilizing Docker, Kubernetes, CI/CD pipelines, and ensuring code quality with SonarQube, Black Duck, and Checkmarx.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about__visual">
            <div className="about__image">
                             <img 
                 src="./aboutme.jpeg" 
                 alt="Satin Patel - Java Full Stack Developer"
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
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about__education">
          <h3>Education</h3>
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="education-content">
              <h4>Bachelor of Engineering in Information Technology</h4>
              <div className="education-institution">Samrat Ashok Technological Institute, Vidisha</div>
              <div className="education-period">Aug 2016 - June 2020</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;