// Utility functions for migrating portfolio data from JSON files to Firebase
import { savePortfolioData } from '../services/firebaseService';

// Import JSON data files
import aboutData from '../components/About/About.json';
import contactData from '../components/Contact/Contact.json';
import experienceData from '../components/Experience/Experience.json';
import headerData from '../components/Header/Header.json';
import heroData from '../components/Hero/Hero.json';
import projectsData from '../components/Projects/Projects.json';
import skillsData from '../components/Skills/Skills.json';

// Function to get all portfolio data from JSON files
export const getPortfolioDataFromJSON = () => {
  return {
    about: aboutData,
    contact: contactData,
    experience: experienceData,
    header: headerData,
    hero: heroData,
    projects: projectsData,
    skills: skillsData
  };
};

// Function to migrate portfolio data to Firebase for a user
export const migratePortfolioDataToFirebase = async (userId) => {
  try {
    const portfolioData = getPortfolioDataFromJSON();
    const result = await savePortfolioData(userId, portfolioData);
    
    if (result.success) {
      console.log('Portfolio data migrated successfully!');
      return { success: true, message: 'Portfolio data migrated successfully!' };
    } else {
      console.error('Migration failed:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Migration error:', error);
    return { success: false, error: error.message };
  }
};

// Function to create a sample user data structure
export const createSampleUserData = (userId, email, userInfo = {}) => {
  const portfolioData = getPortfolioDataFromJSON();
  
  return {
    userId: userId,
    email: email,
    phoneNumber: userInfo.phoneNumber || '',
    displayName: userInfo.displayName || userInfo.name || 'Portfolio User',
    createdAt: new Date(),
    updatedAt: new Date(),
    portfolioData: portfolioData
  };
};

// Function to validate portfolio data structure
export const validatePortfolioData = (portfolioData) => {
  const requiredSections = ['about', 'contact', 'experience', 'header', 'hero', 'projects', 'skills'];
  const missingSections = [];
  
  requiredSections.forEach(section => {
    if (!portfolioData[section]) {
      missingSections.push(section);
    }
  });
  
  if (missingSections.length > 0) {
    return {
      valid: false,
      missingSections: missingSections,
      error: `Missing sections: ${missingSections.join(', ')}`
    };
  }
  
  return { valid: true };
};

// Function to merge existing portfolio data with new data
export const mergePortfolioData = (existingData, newData) => {
  const merged = { ...existingData };
  
  Object.keys(newData).forEach(section => {
    if (newData[section]) {
      merged[section] = {
        ...existingData[section],
        ...newData[section]
      };
    }
  });
  
  return merged;
};

// Function to export portfolio data to JSON format
export const exportPortfolioDataToJSON = (portfolioData) => {
  const sections = ['about', 'contact', 'experience', 'header', 'hero', 'projects', 'skills'];
  const exportedData = {};
  
  sections.forEach(section => {
    if (portfolioData[section]) {
      exportedData[section] = portfolioData[section];
    }
  });
  
  return exportedData;
};

// Function to download portfolio data as JSON file
export const downloadPortfolioDataAsJSON = (portfolioData, filename = 'portfolio-data.json') => {
  const dataStr = JSON.stringify(portfolioData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Function to import portfolio data from JSON file
export const importPortfolioDataFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const validation = validatePortfolioData(data);
        
        if (validation.valid) {
          resolve({ success: true, data: data });
        } else {
          reject({ success: false, error: validation.error });
        }
      } catch (error) {
        reject({ success: false, error: 'Invalid JSON file' });
      }
    };
    
    reader.onerror = () => {
      reject({ success: false, error: 'Error reading file' });
    };
    
    reader.readAsText(file);
  });
};
