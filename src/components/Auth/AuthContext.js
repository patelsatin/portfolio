import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  onAuthStateChange,
  getPortfolioData 
} from '../../services/firebaseService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
      setUser(user);
      if (user) {
        // Load user data from Firestore with retry mechanism
        const loadUserDataWithRetry = async (retryCount = 0) => {
          try {
            console.log('Loading portfolio data for user:', user.uid, retryCount > 0 ? `(retry ${retryCount})` : '');
            const result = await getPortfolioData(user.uid);
            if (result.success) {
              console.log('Portfolio data loaded successfully:', result.data);
              setUserData(result.data);
            } else {
              // If user data doesn't exist and this is the first attempt, wait a bit and retry
              if (retryCount === 0) {
                console.log('User data not found on first attempt, retrying in 1000ms...');
                setTimeout(() => loadUserDataWithRetry(1), 1000);
                return;
              }
              
              // If still not found after retry, try one more time with longer delay
              if (retryCount === 1) {
                console.log('User data not found on second attempt, retrying in 2000ms...');
                setTimeout(() => loadUserDataWithRetry(2), 2000);
                return;
              }
              
              // If still not found after multiple retries, create default user data
              console.log('User data not found after multiple retries, creating default data structure');
              const defaultUserData = {
                userId: user.uid,
                email: user.email,
                phoneNumber: '',
                displayName: user.displayName || '',
                createdAt: new Date(),
                updatedAt: new Date(),
                portfolioData: {
                  about: {},
                  contact: {},
                  experience: {},
                  header: {},
                  hero: {},
                  projects: {},
                  skills: {}
                }
              };
              setUserData(defaultUserData);
            }
          } catch (error) {
            console.error('Error loading user data:', error);
            setError('Failed to load user data');
            // Set default user data structure even if there's an error
            const defaultUserData = {
              userId: user.uid,
              email: user.email,
              phoneNumber: '',
              displayName: user.displayName || '',
              createdAt: new Date(),
              updatedAt: new Date(),
              portfolioData: {
                about: {},
                contact: {},
                experience: {},
                header: {},
                hero: {},
                projects: {},
                skills: {}
              }
            };
            setUserData(defaultUserData);
          }
        };
        
        await loadUserDataWithRetry();
      } else {
        console.log('No user, clearing user data');
        setUserData(null);
        setError(null);
      }
      console.log('Setting loading to false');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, userData) => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await registerUser(email, password, userData);
      if (result.success) {
        // Don't set user here - let the onAuthStateChange handle it
        // This ensures proper user data loading from Firestore
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        // Don't set user here - let the onAuthStateChange handle it
        // This ensures proper user data loading
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const result = await logoutUser();
      if (result.success) {
        setUser(null);
        setUserData(null);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      const result = await getPortfolioData(user.uid);
      if (result.success) {
        setUserData(result.data);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    }
    return { success: false, error: 'No user logged in' };
  };

  const value = {
    user,
    userData,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    refreshUserData,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
