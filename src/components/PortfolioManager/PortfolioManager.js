import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { 
  savePortfolioData, 
  getPortfolioData, 
  updatePortfolioSection 
} from '../../services/firebaseService';
import PortfolioSectionEditor from './PortfolioSectionEditor';
import './PortfolioManager.scss';

const PortfolioManager = () => {
  const { user, userData, refreshUserData } = useAuth();
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState('about');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const sections = [
    { key: 'about', name: 'About Me', icon: 'fas fa-user' },
    { key: 'hero', name: 'Hero Section', icon: 'fas fa-star' },
    { key: 'header', name: 'Header/Navigation', icon: 'fas fa-bars' },
    { key: 'skills', name: 'Skills', icon: 'fas fa-code' },
    { key: 'experience', name: 'Experience', icon: 'fas fa-briefcase' },
    { key: 'projects', name: 'Projects', icon: 'fas fa-project-diagram' },
    { key: 'contact', name: 'Contact', icon: 'fas fa-envelope' }
  ];

  useEffect(() => {
    if (userData?.portfolioData) {
      setPortfolioData(userData.portfolioData);
    }
  }, [userData]);

  const handleSectionDataChange = (sectionKey, newData) => {
    console.log('Section data changed:', sectionKey, newData);
    setPortfolioData(prev => ({
      ...prev,
      [sectionKey]: newData
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSection = async (sectionKey) => {
    if (!user || !portfolioData) {
      console.log('Cannot save section - missing user or portfolio data:', { user: !!user, portfolioData: !!portfolioData });
      return;
    }

    console.log('Saving section:', sectionKey, portfolioData[sectionKey]);
    setLoading(true);
    setMessage('');

    try {
      const result = await updatePortfolioSection(user.uid, sectionKey, portfolioData[sectionKey]);
      console.log('Save result:', result);
      if (result.success) {
        await refreshUserData();
        setHasUnsavedChanges(false);
        setMessage(`${sections.find(s => s.key === sectionKey)?.name} saved successfully!`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error saving ${sectionKey}: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving section:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    if (!user || !portfolioData) return;

    setLoading(true);
    setMessage('');

    try {
      const result = await savePortfolioData(user.uid, portfolioData);
      if (result.success) {
        await refreshUserData();
        setHasUnsavedChanges(false);
        setMessage('All portfolio data saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error saving portfolio: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSection = (sectionKey) => {
    if (userData?.portfolioData?.[sectionKey]) {
      setPortfolioData(prev => ({
        ...prev,
        [sectionKey]: userData.portfolioData[sectionKey]
      }));
      setHasUnsavedChanges(false);
    }
  };

  if (!user) {
    return (
      <div className="portfolio-manager">
        <div className="auth-required">
          <h3>Authentication Required</h3>
          <p>Please sign in to manage your portfolio data.</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="portfolio-manager">
        <div className="loading">Loading portfolio data...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-manager">
      <div className="portfolio-header">
        <h2>Portfolio Manager</h2>
        <div className="portfolio-actions">
          {hasUnsavedChanges && (
            <span className="unsaved-indicator">Unsaved changes</span>
          )}
          <button 
            className="btn btn-primary"
            onClick={handleSaveAll}
            disabled={loading || !hasUnsavedChanges}
          >
            {loading ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="portfolio-content">
        <div className="sections-sidebar">
          <h3>Portfolio Sections</h3>
          <ul className="sections-list">
            {sections.map(section => (
              <li key={section.key}>
                <button
                  className={`section-button ${activeSection === section.key ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.key)}
                >
                  <i className={section.icon}></i>
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-editor">
          <div className="section-header-portfolio">
            <h3>
              <i className={sections.find(s => s.key === activeSection)?.icon}></i>
              {sections.find(s => s.key === activeSection)?.name}
            </h3>
            <div className="section-actions">
              <button 
                className="btn btn-outline"
                onClick={() => handleResetSection(activeSection)}
                disabled={loading}
              >
                Reset
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleSaveSection(activeSection)}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Section'}
              </button>
            </div>
          </div>

          <PortfolioSectionEditor
            sectionKey={activeSection}
            sectionData={portfolioData[activeSection] || {}}
            onDataChange={(newData) => handleSectionDataChange(activeSection, newData)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
