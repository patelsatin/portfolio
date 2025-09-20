import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import './PortfolioDataMissing.scss';

const PortfolioDataMissing = ({ sectionName, onEditClick }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="portfolio-data-missing">
        <div className="missing-content">
          <div className="missing-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <h3>Sign In to Customize</h3>
          <p>This section is showing default content. Sign in to customize your portfolio with your own data.</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              // This will be handled by the parent component
              if (onEditClick) onEditClick();
            }}
          >
            <i className="fas fa-sign-in-alt"></i>
            Sign In to Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-data-missing">
      <div className="missing-content">
        <div className="missing-icon">
          <i className="fas fa-edit"></i>
        </div>
        <h3>No {sectionName} Data Found</h3>
        <p>You haven't added any data for the {sectionName.toLowerCase()} section yet. Click below to start customizing your portfolio.</p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            if (onEditClick) onEditClick();
          }}
        >
          <i className="fas fa-edit"></i>
          Add {sectionName} Data
        </button>
      </div>
    </div>
  );
};

export default PortfolioDataMissing;
