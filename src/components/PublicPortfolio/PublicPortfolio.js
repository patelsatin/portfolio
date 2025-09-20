import React, { useState, useEffect } from 'react';
import { getPublicPortfolioData } from '../../services/firebaseService';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Skills from '../Skills/Skills';
import Projects from '../Projects/Projects';
import Experience from '../Experience/Experience';
import Contact from '../Contact/Contact';
import './PublicPortfolio.scss';

const PublicPortfolio = ({ userId }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await getPublicPortfolioData(userId);
        
        if (result.success) {
          setPortfolioData(result.data.portfolioData);
          setUserInfo({
            displayName: result.data.displayName,
            userId: result.data.userId,
            updatedAt: result.data.updatedAt
          });
        } else {
          setError(result.error || 'Failed to load portfolio');
        }
      } catch (err) {
        console.error('Error fetching public portfolio:', err);
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPublicData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="public-portfolio">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-portfolio">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Portfolio Not Found</h2>
          <p>{error}</p>
          <button 
            className="back-button"
            onClick={() => window.location.href = '/'}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="public-portfolio">
        <div className="error-container">
          <div className="error-icon">📄</div>
          <h2>No Portfolio Data</h2>
          <p>This portfolio appears to be empty.</p>
          <button 
            className="back-button"
            onClick={() => window.location.href = '/'}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="public-portfolio">
      {/* Public Portfolio Header */}
      <div className="public-header">
        <div className="public-header-content">
          <div className="portfolio-info">
            <h1>{userInfo?.displayName || 'Portfolio'}</h1>
            <p className="portfolio-subtitle">Public Portfolio</p>
            {userInfo?.updatedAt && (
              <p className="last-updated">
                Last updated: {new Date(userInfo.updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="public-actions">
            <button 
              className="share-button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Portfolio link copied to clipboard!');
              }}
            >
              <i className="fas fa-share-alt"></i> Share Portfolio
            </button>
            <button 
              className="home-button"
              onClick={() => window.location.href = '/'}
            >
              <i className="fas fa-home"></i> Create Your Own
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Sections */}
      <div className="portfolio-content">
        <Hero 
          portfolioData={portfolioData.hero} 
          isPublic={true}
          userId={userId}
        />
        <About 
          portfolioData={portfolioData.about} 
          isPublic={true}
          userId={userId}
        />
        <Skills 
          portfolioData={portfolioData.skills} 
          isPublic={true}
          userId={userId}
        />
        <Projects 
          portfolioData={portfolioData.projects} 
          isPublic={true}
          userId={userId}
        />
        <Experience 
          portfolioData={portfolioData.experience} 
          isPublic={true}
          userId={userId}
        />
        <Contact 
          portfolioData={portfolioData.contact} 
          isPublic={true}
          userId={userId}
        />
      </div>

      {/* Public Portfolio Footer */}
      <div className="public-footer">
        <div className="footer-content">
          <p>This portfolio was created with Portfolio Builder</p>
          <button 
            className="create-portfolio-button"
            onClick={() => window.location.href = '/'}
          >
            <i className="fas fa-plus"></i> Create Your Own Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;
