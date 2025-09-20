import React, { useEffect } from 'react';
import { extractUserIdFromUrl, generatePortfolioUrl } from '../../utils/urlUtils';

const UrlRedirect = () => {
  useEffect(() => {
    const userId = extractUserIdFromUrl();
    if (userId) {
      // Check if we're already on the correct URL format
      const currentUrl = window.location.href;
      const correctUrl = generatePortfolioUrl(userId);
      
      if (currentUrl !== correctUrl) {
        // Redirect to the correct URL format
        window.history.replaceState({}, '', correctUrl);
      }
    }
  }, []);

  return null; // This component doesn't render anything
};

export default UrlRedirect;
