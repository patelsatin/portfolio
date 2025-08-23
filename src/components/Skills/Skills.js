import React, { useEffect, useRef, useState } from 'react';
import './Skills.scss';

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: 'fas fa-code',
      skills: [
        { name: 'Java', level: 95, icon: 'fab fa-java' },
        { name: 'JavaScript', level: 90, icon: 'fab fa-js-square' },
        { name: 'TypeScript', level: 85, icon: 'fab fa-js-square' },
        { name: 'SQL', level: 88, icon: 'fas fa-database' }
      ]
    },
    {
      title: 'Frontend Technologies',
      icon: 'fas fa-laptop-code',
      skills: [
        { name: 'ReactJS', level: 92, icon: 'fab fa-react' },
        { name: 'Redux', level: 88, icon: 'fab fa-react' },
        { name: 'Angular', level: 85, icon: 'fab fa-angular' },
        { name: 'PrimeNG/PrimeReact', level: 90, icon: 'fas fa-layer-group' },
        { name: 'HTML5/CSS3', level: 93, icon: 'fab fa-html5' },
        { name: 'Thymeleaf', level: 80, icon: 'fas fa-file-code' }
      ]
    },
    {
      title: 'Backend & Microservices',
      icon: 'fas fa-server',
      skills: [
        { name: 'Spring Boot', level: 95, icon: 'fas fa-leaf' },
        { name: 'Spring Data JPA', level: 90, icon: 'fas fa-leaf' },
        { name: 'JBoss Fuse', level: 88, icon: 'fas fa-cogs' },
        { name: 'Apache Camel', level: 85, icon: 'fas fa-route' },
        { name: 'REST APIs', level: 92, icon: 'fas fa-exchange-alt' },
        { name: 'Drools Rule Engine', level: 82, icon: 'fas fa-brain' },
        { name: 'Microservices Architecture', level: 88, icon: 'fas fa-cubes' }
      ]
    },
    {
      title: 'Databases & Caching',
      icon: 'fas fa-database',
      skills: [
        { name: 'PostgreSQL', level: 90, icon: 'fas fa-database' },
        { name: 'MySQL', level: 88, icon: 'fas fa-database' },
        { name: 'Couchbase (NoSQL)', level: 85, icon: 'fas fa-database' },
        { name: 'Redis Caching', level: 87, icon: 'fas fa-memory' }
      ]
    },
    {
      title: 'DevOps & Cloud Tools',
      icon: 'fas fa-cloud',
      skills: [
        { name: 'Docker', level: 85, icon: 'fab fa-docker' },
        { name: 'Kubernetes', level: 80, icon: 'fas fa-dharmachakra' },
        { name: 'Git', level: 92, icon: 'fab fa-git-alt' },
        { name: 'Jira', level: 88, icon: 'fab fa-jira' }
      ]
    },
    {
      title: 'Code Quality & Security',
      icon: 'fas fa-shield-alt',
      skills: [
        { name: 'SonarQube', level: 85, icon: 'fas fa-search' },
        { name: 'Black Duck', level: 80, icon: 'fas fa-shield-alt' },
        { name: 'Checkmarx', level: 80, icon: 'fas fa-lock' },
        { name: 'Secure Coding Practices', level: 88, icon: 'fas fa-user-shield' }
      ]
    }
  ];

  const certifications = [
    {
      name: 'Oracle Certified Professional Java SE',
      issuer: 'Oracle',
      year: '2023',
      icon: 'fab fa-java'
    },
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2023',
      icon: 'fab fa-aws'
    },
    {
      name: 'Spring Professional Certification',
      issuer: 'VMware',
      year: '2022',
      icon: 'fas fa-leaf'
    }
  ];

  const tools = [
    { name: 'IntelliJ IDEA', icon: 'fas fa-code' },
    { name: 'VS Code', icon: 'fas fa-code' },
    { name: 'Eclipse', icon: 'fas fa-code' },
    { name: 'Postman', icon: 'fas fa-paper-plane' },
    { name: 'Jenkins', icon: 'fa-brands fa-jenkins' },
    { name: 'Swagger', icon: 'fas fa-file-alt' },
    { name: 'Maven', icon: 'fas fa-box' },
    { name: 'Jira Board', icon: 'fa-brands fa-atlassian' },
    { name: 'Tabnine', icon: 'fa-brands fa-mailchimp' },
    { name: 'ChatGPT', icon: 'fa-brands fa-studiovinari' },
    { name: 'Stack Overflow', icon: 'fa-brands fa-stack-overflow' },
    { name: 'Gitlab', icon: 'fa-brands fa-gitlab' },
    { name: 'Sass', icon: 'fa-brands fa-sass' },
    { name: 'Figma', icon: 'fa-brands fa-figma' },
  ];

  return (
    <section id="skills" className="skills section" ref={skillsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Comprehensive expertise in modern technologies and development practices
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
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h4>Performance Optimization</h4>
                  <p>API performance optimization to execute under 1 second in production environments</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4>Team Leadership</h4>
                  <p>Led frontend teams of 3-4 members, managing Jira tasks and streamlining workflows</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>Security & Compliance</h4>
                  <p>Ensuring code security with clean SonarQube, Black Duck, and Checkmarx reports</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h4>System Integration</h4>
                  <p>Expertise in Java design patterns and integration patterns for scalable systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="skills__stats">
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Technologies Mastered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.3</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">APIs Developed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Major Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;