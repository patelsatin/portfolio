import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { savePortfolioData, getPortfolioData } from '../../services/firebaseService';
import FileUploader from '../FileUploader/FileUploader';
import './PortfolioManager.scss';

const PortfolioSectionEditor = ({ sectionKey, sectionData, onDataChange, loading }) => {
  const [localData, setLocalData] = useState(sectionData);
  const [expandedFields, setExpandedFields] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    setLocalData(sectionData);
  }, [sectionData]);

  const handleFieldChange = (path, value) => {
    console.log('Field change:', path, value);
    const newData = { ...localData };
    const keys = path.split('.');
    let current = newData;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Set the final value
    current[keys[keys.length - 1]] = value;
    
    // Validate the field
    const errors = getFieldValidation(sectionKey, keys[keys.length - 1], value);
    setValidationErrors(prev => ({
      ...prev,
      [path]: errors
    }));
    
    console.log('Updated data:', newData);
    setLocalData(newData);
    onDataChange(newData);
  };

  const handleArrayItemChange = (path, index, value) => {
    const newData = { ...localData };
    const keys = path.split('.');
    let current = newData;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Update the array item
    if (!current[keys[keys.length - 1]]) {
      current[keys[keys.length - 1]] = [];
    }
    current[keys[keys.length - 1]][index] = value;
    
    // Validate the field if it's a simple value
    if (typeof value === 'string') {
      const errors = getFieldValidation(sectionKey, keys[keys.length - 1], value);
      setValidationErrors(prev => ({
        ...prev,
        [`${path}.${index}`]: errors
      }));
    }
    
    setLocalData(newData);
    onDataChange(newData);
  };

  const addArrayItem = (path, defaultItem = {}) => {
    const newData = { ...localData };
    const keys = path.split('.');
    let current = newData;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Add new item to array
    if (!current[keys[keys.length - 1]]) {
      current[keys[keys.length - 1]] = [];
    }
    current[keys[keys.length - 1]].push(defaultItem);
    
    setLocalData(newData);
    onDataChange(newData);
  };

  const removeArrayItem = (path, index) => {
    const newData = { ...localData };
    const keys = path.split('.');
    let current = newData;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    // Remove item from array
    current[keys[keys.length - 1]].splice(index, 1);
    
    setLocalData(newData);
    onDataChange(newData);
  };

  const toggleFieldExpansion = (fieldPath) => {
    setExpandedFields(prev => ({
      ...prev,
      [fieldPath]: !prev[fieldPath]
    }));
  };

  // File handling functions
  const handleFileUpdate = (fileType, fileData) => {
    const updatedData = {
      ...localData,
      files: {
        ...localData.files,
        [fileType]: fileData
      }
    };
    setLocalData(updatedData);
    onDataChange(updatedData);
  };

  // Custom Hero Editor
  const renderHeroEditor = () => {
    const heroData = localData || {};
    const { personalInfo = {}, skills = [], socialLinks = {} } = heroData;

    return (
      <div className="hero-editor">
        <div className="hero-basic-info">
          <h3>Basic Information</h3>
          
          <div className="field-group">
            <label>Title (Your Name) <span className="required">*</span></label>
            <input
              type="text"
              value={personalInfo.name || ''}
              onChange={(e) => handleFieldChange('personalInfo.name', e.target.value)}
              disabled={loading}
              placeholder="Enter your full name"
              className={validationErrors['personalInfo.name']?.length > 0 ? 'error' : ''}
              required
            />
            {validationErrors['personalInfo.name']?.length > 0 && (
              <div className="field-errors">
                {validationErrors['personalInfo.name'].map((error, index) => (
                  <span key={index} className="error-message">{error}</span>
                ))}
              </div>
            )}
          </div>

          <div className="field-group">
            <label>Subtitle (Professional Title) <span className="required">*</span></label>
            <input
              type="text"
              value={personalInfo.title || ''}
              onChange={(e) => handleFieldChange('personalInfo.title', e.target.value)}
              disabled={loading}
              placeholder="e.g., Full Stack Developer"
              className={validationErrors['personalInfo.title']?.length > 0 ? 'error' : ''}
              required
            />
            {validationErrors['personalInfo.title']?.length > 0 && (
              <div className="field-errors">
                {validationErrors['personalInfo.title'].map((error, index) => (
                  <span key={index} className="error-message">{error}</span>
                ))}
              </div>
            )}
          </div>

          <div className="field-group">
            <label>Description <span className="required">*</span></label>
            <textarea
              value={personalInfo.description || ''}
              onChange={(e) => handleFieldChange('personalInfo.description', e.target.value)}
              disabled={loading}
              placeholder="Brief introduction about yourself and what you do"
              rows={4}
              className={validationErrors['personalInfo.description']?.length > 0 ? 'error' : ''}
              required
            />
            {validationErrors['personalInfo.description']?.length > 0 && (
              <div className="field-errors">
                {validationErrors['personalInfo.description'].map((error, index) => (
                  <span key={index} className="error-message">{error}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hero-skills">
          <h3>Skills (Typing Animation)</h3>
          <div className="skills-chips">
            {skills.map((skill, index) => (
              <div key={index} className="skill-chip">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleArrayItemChange('skills', index, e.target.value)}
                  disabled={loading}
                  placeholder="Enter a skill"
                />
                <button
                  type="button"
                  className="remove-skill"
                  onClick={() => removeArrayItem('skills', index)}
                  disabled={loading}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-skill"
              onClick={() => addArrayItem('skills', '')}
              disabled={loading}
            >
              + Add Skill
            </button>
          </div>
        </div>

        <div className="hero-social-links">
          <h3>Social Links</h3>
          <div className="social-links-grid">
            <div className="field-group">
              <label>
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </label>
              <input
                type="url"
                value={socialLinks.linkedin || ''}
                onChange={(e) => handleFieldChange('socialLinks.linkedin', e.target.value)}
                disabled={loading}
                placeholder="https://linkedin.com/in/yourprofile"
                className={validationErrors['socialLinks.linkedin']?.length > 0 ? 'error' : ''}
              />
              {validationErrors['socialLinks.linkedin']?.length > 0 && (
                <div className="field-errors">
                  {validationErrors['socialLinks.linkedin'].map((error, index) => (
                    <span key={index} className="error-message">{error}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="field-group">
              <label>
                <i className="fab fa-github"></i> GitHub
              </label>
              <input
                type="url"
                value={socialLinks.github || ''}
                onChange={(e) => handleFieldChange('socialLinks.github', e.target.value)}
                disabled={loading}
                placeholder="https://github.com/yourusername"
                className={validationErrors['socialLinks.github']?.length > 0 ? 'error' : ''}
              />
              {validationErrors['socialLinks.github']?.length > 0 && (
                <div className="field-errors">
                  {validationErrors['socialLinks.github'].map((error, index) => (
                    <span key={index} className="error-message">{error}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="field-group">
              <label>
                <i className="fab fa-twitter"></i> Twitter
              </label>
              <input
                type="url"
                value={socialLinks.twitter || ''}
                onChange={(e) => handleFieldChange('socialLinks.twitter', e.target.value)}
                disabled={loading}
                placeholder="https://twitter.com/yourusername"
                className={validationErrors['socialLinks.twitter']?.length > 0 ? 'error' : ''}
              />
              {validationErrors['socialLinks.twitter']?.length > 0 && (
                <div className="field-errors">
                  {validationErrors['socialLinks.twitter'].map((error, index) => (
                    <span key={index} className="error-message">{error}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="field-group">
              <label>
                <i className="fab fa-medium"></i> Medium/Blog
              </label>
              <input
                type="url"
                value={socialLinks.medium || ''}
                onChange={(e) => handleFieldChange('socialLinks.medium', e.target.value)}
                disabled={loading}
                placeholder="https://medium.com/@yourusername"
                className={validationErrors['socialLinks.medium']?.length > 0 ? 'error' : ''}
              />
              {validationErrors['socialLinks.medium']?.length > 0 && (
                <div className="field-errors">
                  {validationErrors['socialLinks.medium'].map((error, index) => (
                    <span key={index} className="error-message">{error}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hero-files">
          <h3>Files</h3>
          
          <FileUploader
            fileType="profileImage"
            currentFile={heroData.files?.profileImage}
            onFileUpdate={(fileData) => handleFileUpdate('profileImage', fileData)}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            maxSize={5 * 1024 * 1024} // 5MB
            label="Profile Image"
            description="Upload a professional profile photo (JPG, PNG, GIF, WebP - Max 5MB)"
          />
          
          <FileUploader
            fileType="resume"
            currentFile={heroData.files?.resume}
            onFileUpdate={(fileData) => handleFileUpdate('resume', fileData)}
            accept=".pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024} // 10MB
            label="Resume/CV"
            description="Upload your resume or CV (PDF, DOC, DOCX - Max 10MB)"
          />
        </div>
      </div>
    );
  };

  const renderField = (path, value, label, type = 'text') => {
    const isExpanded = expandedFields[path];
    
    if (Array.isArray(value)) {
      return (
        <div key={path} className="field-group">
          <div className="field-header">
            <label>{label}</label>
            <button
              type="button"
              className="expand-button"
              onClick={() => toggleFieldExpansion(path)}
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="array-field">
              {value.map((item, index) => (
                <div key={index} className="array-item">
                  <div className="array-item-header">
                    <span>Item {index + 1}</span>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeArrayItem(path, index)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                  
                  {typeof item === 'object' ? (
                    <div className="object-fields">
                      {Object.entries(item).map(([key, val]) => (
                        <div key={key} className="nested-field">
                          <label>{key}</label>
                          <input
                            type="text"
                            value={val || ''}
                            onChange={(e) => handleArrayItemChange(path, index, {
                              ...item,
                              [key]: e.target.value
                            })}
                            disabled={loading}
                            placeholder={getFieldPlaceholder(sectionKey, key)}
                            className={validationErrors[`${path}.${index}.${key}`]?.length > 0 ? 'error' : ''}
                          />
                          {validationErrors[`${path}.${index}.${key}`]?.length > 0 && (
                            <div className="field-errors">
                              {validationErrors[`${path}.${index}.${key}`].map((error, errorIndex) => (
                                <span key={errorIndex} className="error-message">{error}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={item || ''}
                        onChange={(e) => handleArrayItemChange(path, index, e.target.value)}
                        disabled={loading}
                        placeholder={getFieldPlaceholder(sectionKey, path)}
                        className={validationErrors[`${path}.${index}`]?.length > 0 ? 'error' : ''}
                      />
                      {validationErrors[`${path}.${index}`]?.length > 0 && (
                        <div className="field-errors">
                          {validationErrors[`${path}.${index}`].map((error, errorIndex) => (
                            <span key={errorIndex} className="error-message">{error}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                className="add-button"
                onClick={() => addArrayItem(path, typeof value[0] === 'object' ? {} : '')}
                disabled={loading}
              >
                Add Item
              </button>
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={path} className="field-group">
          <div className="field-header">
            <label>{label}</label>
            <button
              type="button"
              className="expand-button"
              onClick={() => toggleFieldExpansion(path)}
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="object-fields">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="nested-field">
                  <label>{key}</label>
                  {typeof val === 'object' && val !== null ? (
                    <div className="nested-object">
                      {Object.entries(val).map(([nestedKey, nestedVal]) => (
                        <div key={nestedKey} className="deep-nested-field">
                          <label>{nestedKey}</label>
                          <input
                            type="text"
                            value={nestedVal || ''}
                            onChange={(e) => handleFieldChange(`${path}.${key}.${nestedKey}`, e.target.value)}
                            disabled={loading}
                            placeholder={getFieldPlaceholder(sectionKey, nestedKey)}
                            className={validationErrors[`${path}.${key}.${nestedKey}`]?.length > 0 ? 'error' : ''}
                          />
                          {validationErrors[`${path}.${key}.${nestedKey}`]?.length > 0 && (
                            <div className="field-errors">
                              {validationErrors[`${path}.${key}.${nestedKey}`].map((error, index) => (
                                <span key={index} className="error-message">{error}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <input
                        type={type}
                        value={val || ''}
                        onChange={(e) => handleFieldChange(`${path}.${key}`, e.target.value)}
                        disabled={loading}
                        placeholder={getFieldPlaceholder(sectionKey, key)}
                        className={validationErrors[`${path}.${key}`]?.length > 0 ? 'error' : ''}
                      />
                      {validationErrors[`${path}.${key}`]?.length > 0 && (
                        <div className="field-errors">
                          {validationErrors[`${path}.${key}`].map((error, index) => (
                            <span key={index} className="error-message">{error}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Determine input type and placeholder
    let inputType = type;
    let placeholder = getFieldPlaceholder(sectionKey, path);
    
    if (path.toLowerCase().includes('email')) inputType = 'email';
    if (path.toLowerCase().includes('phone')) inputType = 'tel';
    if (path.toLowerCase().includes('url') || path.toLowerCase().includes('link')) inputType = 'url';
    if (path.toLowerCase().includes('description') || path.toLowerCase().includes('bio')) inputType = 'textarea';

    const fieldErrors = validationErrors[path] || [];

    if (inputType === 'textarea') {
      return (
        <div key={path} className="field-group">
          <label>{label}</label>
          <textarea
            value={value || ''}
            onChange={(e) => handleFieldChange(path, e.target.value)}
            disabled={loading}
            placeholder={placeholder}
            rows={4}
            className={fieldErrors.length > 0 ? 'error' : ''}
          />
          {fieldErrors.length > 0 && (
            <div className="field-errors">
              {fieldErrors.map((error, index) => (
                <span key={index} className="error-message">{error}</span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={path} className="field-group">
        <label>{label}</label>
        <input
          type={inputType}
          value={value || ''}
          onChange={(e) => handleFieldChange(path, e.target.value)}
          disabled={loading}
          placeholder={placeholder}
          className={fieldErrors.length > 0 ? 'error' : ''}
        />
        {fieldErrors.length > 0 && (
          <div className="field-errors">
            {fieldErrors.map((error, index) => (
              <span key={index} className="error-message">{error}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getFieldPlaceholder = (sectionKey, fieldPath) => {
    const placeholders = {
      about: {
        title: "Enter your name or section title",
        description: "Tell us about yourself, your background, and what makes you unique",
        image: "Enter image URL or path",
        skills: "Add your key skills",
        experience: "Describe your professional experience"
      },
      hero: {
        name: "Enter your full name",
        title: "Your professional title (e.g., Full Stack Developer)",
        description: "Brief introduction about yourself and what you do",
        linkedin: "LinkedIn profile URL",
        github: "GitHub profile URL",
        twitter: "Twitter profile URL",
        medium: "Medium/Blog URL"
      },
      header: {
        logo: "Enter your logo text or image URL",
        name: "Navigation item name",
        link: "Navigation link (e.g., #about, /contact)"
      },
      skills: {
        title: "Section title (e.g., My Skills, Technical Expertise)",
        description: "Brief description of your skills",
        name: "Category name (e.g., Frontend, Backend, Tools)",
        skills: "Add a skill"
      },
      experience: {
        title: "Section title (e.g., Work Experience, Professional Journey)",
        description: "Brief description of your experience",
        jobTitle: "Job title",
        company: "Company name",
        duration: "Duration (e.g., 2020 - Present, Jan 2019 - Dec 2020)",
        jobDescription: "Job description and responsibilities",
        achievements: "Add an achievement"
      },
      projects: {
        title: "Section title (e.g., My Projects, Portfolio)",
        description: "Brief description of your projects",
        projectTitle: "Project name",
        projectDescription: "Project description and features",
        technologies: "Add a technology used",
        image: "Project image URL",
        liveLink: "Live demo URL",
        githubLink: "GitHub repository URL"
      },
      contact: {
        title: "Section title (e.g., Get In Touch, Contact Me)",
        description: "Brief contact message",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        address: "Your address or location",
        linkedin: "LinkedIn profile URL",
        github: "GitHub profile URL",
        twitter: "Twitter profile URL"
      }
    };
    
    return placeholders[sectionKey]?.[fieldPath] || `Enter ${fieldPath}`;
  };

  const getFieldValidation = (sectionKey, fieldPath, value) => {
    const errors = [];
    
    // Email validation
    if (fieldPath.toLowerCase().includes('email') && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push('Please enter a valid email address');
      }
    }
    
    // URL validation
    if ((fieldPath.toLowerCase().includes('url') || fieldPath.toLowerCase().includes('link')) && value) {
      try {
        new URL(value);
      } catch {
        if (!value.startsWith('#')) { // Allow anchor links
          errors.push('Please enter a valid URL');
        }
      }
    }
    
    // Phone validation
    if (fieldPath.toLowerCase().includes('phone') && value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-()]/g, ''))) {
        errors.push('Please enter a valid phone number');
      }
    }
    
    // Required field validation
    const requiredFields = {
      about: ['title'],
      hero: ['personalInfo.name', 'personalInfo.title', 'personalInfo.description'],
      header: ['logo'],
      skills: ['title'],
      experience: ['title'],
      projects: ['title'],
      contact: ['title']
    };
    
    if (requiredFields[sectionKey]?.includes(fieldPath) && (!value || !value.trim())) {
      errors.push('This field is required');
    }
    
    // Length validation
    if (value && value.length > 500) {
      errors.push('Text is too long (max 500 characters)');
    }
    
    return errors;
  };

  const getDefaultSectionData = (sectionKey) => {
    const defaults = {
      about: {
        title: "",
        description: "",
        image: "",
        skills: [],
        experience: ""
      },
      hero: {
        personalInfo: {
          name: "",
          title: "",
          description: ""
        },
        skills: [],
        socialLinks: {
          linkedin: "",
          github: "",
          twitter: "",
          medium: ""
        }
      },
      header: {
        logo: "",
        navigation: [
          { name: "Home", link: "#home" },
          { name: "About", link: "#about" },
          { name: "Skills", link: "#skills" },
          { name: "Projects", link: "#projects" },
          { name: "Contact", link: "#contact" }
        ]
      },
      skills: {
        title: "",
        description: "",
        categories: [
          {
            name: "",
            skills: []
          }
        ]
      },
      experience: {
        title: "",
        description: "",
        jobs: [
          {
            title: "",
            company: "",
            duration: "",
            description: "",
            achievements: []
          }
        ]
      },
      projects: {
        title: "",
        description: "",
        projects: [
          {
            title: "",
            description: "",
            technologies: [],
            image: "",
            liveLink: "",
            githubLink: ""
          }
        ]
      },
      contact: {
        title: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        socialLinks: {
          linkedin: "",
          github: "",
          twitter: ""
        }
      }
    };
    
    return defaults[sectionKey] || {};
  };

  const renderSectionEditor = () => {
    if (!localData || Object.keys(localData).length === 0) {
      return (
        <div className="empty-section">
          <p>No data available for this section.</p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Section: {sectionKey}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              const defaultData = getDefaultSectionData(sectionKey);
              console.log('Initializing section with data:', sectionKey, defaultData);
              onDataChange(defaultData);
            }}
            disabled={loading}
          >
            Initialize Section
          </button>
        </div>
      );
    }

    // Use custom Hero editor for hero section
    if (sectionKey === 'hero') {
      return renderHeroEditor();
    }

    // Use generic editor for other sections
    return (
      <div className="section-editor-content">
        {Object.entries(localData).map(([key, value]) => {
          const fieldPath = key;
          const fieldLabel = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          
          return renderField(fieldPath, value, fieldLabel);
        })}
      </div>
    );
  };

  return (
    <div className="portfolio-section-editor">
      {renderSectionEditor()}
    </div>
  );
};

export default PortfolioSectionEditor;
