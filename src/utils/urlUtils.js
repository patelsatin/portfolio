// URL utility functions for portfolio links

/**
 * Generate a portfolio URL for a given user ID
 * @param {string} userId - The user ID
 * @param {string} baseUrl - The base URL (defaults to current origin)
 * @returns {string} The complete portfolio URL
 */
export const generatePortfolioUrl = (userId, baseUrl = null) => {
  const origin = baseUrl || window.location.origin;
  return `${origin}/portfolio?userid=${userId}`;
};

/**
 * Extract user ID from various URL patterns
 * @param {string} url - The URL to parse (defaults to current URL)
 * @returns {string|null} The user ID if found, null otherwise
 */
export const extractUserIdFromUrl = (url = null) => {
  const targetUrl = url || window.location.href;
  const urlObj = new URL(targetUrl);
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;
  
  // Check for /portfolio?userid= pattern
  if (pathname === '/portfolio') {
    const userId = searchParams.get('userid') || searchParams.get('userId');
    if (userId) {
      return userId;
    }
  }
  
  // Check for /?userid= pattern (legacy support)
  const userId = searchParams.get('userid') || searchParams.get('userId');
  if (userId) {
    return userId;
  }
  
  // Check for /{userid} pattern (legacy support)
  const pathSegments = pathname.split('/').filter(segment => segment);
  if (pathSegments.length === 1 && pathSegments[0] !== 'portfolio') {
    const potentialUserId = pathSegments[0];
    // Basic validation - Firebase UIDs are typically 28 characters
    if (potentialUserId.length >= 20) {
      return potentialUserId;
    }
  }
  
  return null;
};

/**
 * Check if the current URL is a portfolio URL
 * @param {string} url - The URL to check (defaults to current URL)
 * @returns {boolean} True if it's a portfolio URL
 */
export const isPortfolioUrl = (url = null) => {
  const targetUrl = url || window.location.href;
  const urlObj = new URL(targetUrl);
  const pathname = urlObj.pathname;
  
  // Check for /portfolio path
  if (pathname === '/portfolio') {
    return true;
  }
  
  // Check for /?userid= pattern (legacy)
  const searchParams = urlObj.searchParams;
  const userId = searchParams.get('userid') || searchParams.get('userId');
  if (userId) {
    return true;
  }
  
  // Check for /{userid} pattern (legacy)
  const pathSegments = pathname.split('/').filter(segment => segment);
  if (pathSegments.length === 1 && pathSegments[0] !== 'portfolio') {
    const potentialUserId = pathSegments[0];
    if (potentialUserId.length >= 20) {
      return true;
    }
  }
  
  return false;
};

/**
 * Redirect to the new portfolio URL format
 * @param {string} userId - The user ID
 * @param {boolean} replace - Whether to replace the current history entry
 */
export const redirectToPortfolio = (userId, replace = false) => {
  const newUrl = generatePortfolioUrl(userId);
  if (replace) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.location.href = newUrl;
  }
};

export default {
  generatePortfolioUrl,
  extractUserIdFromUrl,
  isPortfolioUrl,
  redirectToPortfolio
};
