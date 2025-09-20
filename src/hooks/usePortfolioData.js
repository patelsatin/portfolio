import { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
// import { getPortfolioData } from '../services/firebaseService';

// Import JSON data as fallback
import aboutData from '../components/About/About.json';
import contactData from '../components/Contact/Contact.json';
import experienceData from '../components/Experience/Experience.json';
import headerData from '../components/Header/Header.json';
import heroData from '../components/Hero/Hero.json';
import projectsData from '../components/Projects/Projects.json';
import skillsData from '../components/Skills/Skills.json';

const jsonFallbackData = {
  about: aboutData,
  contact: contactData,
  experience: experienceData,
  header: headerData,
  hero: heroData,
  projects: projectsData,
  skills: skillsData
};

export const usePortfolioData = (sectionKey) => {
  const { user, userData } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasUserData, setHasUserData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('usePortfolioData debug:', { 
          sectionKey, 
          user: !!user, 
          userData: !!userData, 
          hasPortfolioData: !!userData?.portfolioData,
          fallbackData: !!jsonFallbackData[sectionKey],
          fallbackKeys: jsonFallbackData[sectionKey] ? Object.keys(jsonFallbackData[sectionKey]) : 'no keys'
        });
        
        if (user && userData?.portfolioData) {
          // User is logged in and has portfolio data
          const sectionData = userData.portfolioData[sectionKey];
          
          if (sectionData && Object.keys(sectionData).length > 0) {
            // User has data for this section
            console.log('Using user data for', sectionKey);
            setData(sectionData);
            setHasUserData(true);
          } else {
            // User doesn't have data for this section, use fallback
            console.log('Using fallback data for', sectionKey, jsonFallbackData[sectionKey]);
            setData(jsonFallbackData[sectionKey]);
            setHasUserData(false);
          }
        } else {
          // No user or no user data, use fallback
          console.log('No user/userData, using fallback for', sectionKey, jsonFallbackData[sectionKey]);
          setData(jsonFallbackData[sectionKey]);
          setHasUserData(false);
        }
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load portfolio data');
        setData(jsonFallbackData[sectionKey]);
        setHasUserData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, userData, sectionKey]);

  return {
    data,
    loading,
    error,
    hasUserData,
    isLoggedIn: !!user
  };
};
