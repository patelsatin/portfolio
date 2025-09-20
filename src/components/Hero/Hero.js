import React, { useState, useEffect } from 'react';
import './Hero.scss';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import PortfolioDataMissing from '../PortfolioDataMissing/PortfolioDataMissing';

const Hero = ({ onEditClick, portfolioData, isPublic = false, userId }) => {
  // Use provided portfolioData if in public mode, otherwise use hook
  const { data: hookData, loading, error } = usePortfolioData('hero');
  const heroData = isPublic ? portfolioData : hookData;
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [forceRender, setForceRender] = useState(0);

  // Debug when heroData changes
  useEffect(() => {
    if (heroData) {
      setForceRender(prev => prev + 1); // Force re-render
    }
  }, [heroData]);

  useEffect(() => {
    if (!heroData) return;
    const skillsArray = heroData.skills || [];
    const settings = heroData.animationSettings || { typeSpeed: 100, deleteSpeed: 50, pauseTime: 1000 };
    if (skillsArray.length === 0) return;

    const currentSkill = skillsArray[currentSkillIndex] || '';
    const typeSpeed = isDeleting ? settings.deleteSpeed ?? 50 : settings.typeSpeed ?? 100;
    const pauseTime = isDeleting ? 500 : settings.pauseTime ?? 1000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentSkill) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentSkillIndex((prev) => (prev + 1) % skillsArray.length);
      } else if (isDeleting) {
        setDisplayText(currentSkill.substring(0, Math.max(0, displayText.length - 1)));
      } else {
        setDisplayText(currentSkill.substring(0, displayText.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSkillIndex, heroData]);

  if (!isPublic && loading) {
    return (
      <section className="hero animate" id='home'>
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading hero section...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isPublic && error) {
    return (
      <section className="hero animate" id='home'>
        <div className="container">
          <div className="error-container">
            <p>Error loading hero section: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isPublic && !heroData) {
    return (
      <section className="hero animate" id='home'>
        <div className="container">
          <PortfolioDataMissing 
            sectionName="Hero" 
            onEditClick={onEditClick}
          />
        </div>
      </section>
    );
  }

  console.log('Hero: heroData exists, proceeding to render with data:', heroData);

  // Extract data from new structure
  const { personalInfo = {}, skills = [], socialLinks = {}, files = {} } = heroData;
  
  // Debug logging
  console.log('Hero.js debug:', {
    heroData,
    personalInfo,
    name: personalInfo?.name,
    title: personalInfo?.title,
    description: personalInfo?.description,
    'personalInfo keys': Object.keys(personalInfo || {}),
    'heroData keys': Object.keys(heroData || {}),
    forceRender
  });
  
  // Hardcoded values
  const HARD_GREETING = "Hello, I'm";
  const HARD_EXPERTISE_LABEL = "Expert in:";
  const HARD_PROFILE_IMAGE = files.profileImage?.url || './pp.jpg';
  const HARD_PROFILE_ALT = 'Profile image';
  
  // Dynamic values from data
  const name = personalInfo?.name || 'Your Name';
  const title = personalInfo?.title || 'Your Title';
  const description = personalInfo?.description || 'Your description';
  
  // Hardcoded actions
  const HARD_ACTIONS = [
    {
      text: "Download Resume",
      href: "./resume.pdf",
      className: "btn btn-primary",
      download: true
    },
    {
      text: "Get In Touch",
      href: "#contact",
      className: "btn btn-secondary"
    }
  ];
  
  // Social links from data
  const socialLinksArray = Object.entries(socialLinks)
    .filter(([key, value]) => value && value.trim() !== '')
    .map(([platform, href]) => {
      const platformConfig = {
        linkedin: {
          platform: "LinkedIn",
          icon: "fab fa-linkedin-in",
          className: "social-link linkedin",
          ariaLabel: "Visit LinkedIn Profile"
        },
        github: {
          platform: "GitHub",
          icon: "fab fa-github",
          className: "social-link github",
          ariaLabel: "Visit GitHub Profile"
        },
        twitter: {
          platform: "Twitter",
          icon: "fab fa-twitter",
          className: "social-link twitter",
          ariaLabel: "Visit Twitter Profile"
        },
        medium: {
          platform: "Medium",
          icon: "fab fa-medium",
          className: "social-link dribbble",
          ariaLabel: "Visit Medium Profile"
        }
      };
      
      return {
        ...platformConfig[platform],
        href
      };
    });

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
            <p className="hero__greeting">{HARD_GREETING}</p>
            <h1 className="hero__name">{name}</h1>
            <h2 className="hero__title">{title}</h2>
            <p className="hero__description">{description}</p>

            {skills.length > 0 && (
              <div className="hero__expertise" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <p className="expertise-label">{HARD_EXPERTISE_LABEL}</p>
                <div className="typing-container">
                  <span className={`typing-text ${isTyping ? 'typing' : ''}`}>
                    {displayText}
                  </span>
                </div>
              </div>
            )}

            <div className="hero__actions">
              {HARD_ACTIONS.map((action, index) => (
                <a 
                  key={index}
                  href={action.href} 
                  className={action.className}
                  {...(action.download && { download: true })}
                >
                  {action.text}
                </a>
              ))}
            </div>

            {socialLinksArray.length > 0 && (
              <div className="hero__social">
                {socialLinksArray.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={link.className}
                    aria-label={link.ariaLabel}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            )}

            {files.resume?.url && (
              <div className="hero__resume">
                <a 
                  href={files.resume.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="resume-download-btn"
                  aria-label="Download Resume"
                >
                  <i className="fas fa-download"></i>
                  <span>Download Resume</span>
                </a>
              </div>
            )}
          </div>

          <div className="hero__image">
            <div className="image-container">
              <div className="image-placeholder">
                <img src={HARD_PROFILE_IMAGE} alt={HARD_PROFILE_ALT} className="profile-image" />
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