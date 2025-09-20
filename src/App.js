import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Experience from './components/Experience/Experience';
import PortfolioManager from './components/PortfolioManager/PortfolioManager';
import PublicPortfolio from './components/PublicPortfolio/PublicPortfolio';
import PortfolioRoute from './components/PortfolioRoute/PortfolioRoute';
import RoutingTest from './components/RoutingTest/RoutingTest';
import UrlRedirect from './components/UrlRedirect/UrlRedirect';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import { extractUserIdFromUrl, isPortfolioUrl } from './utils/urlUtils';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Main App Content Component
const AppContent = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [publicUserId, setPublicUserId] = useState(null);
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Check for public portfolio URL parameter (legacy support)
  useEffect(() => {
    const userId = extractUserIdFromUrl();
    if (userId) {
      setPublicUserId(userId);
    }
  }, [location]);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const handleEditClick = () => {
    setShowDashboard(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Ensure we exit Portfolio Manager when user signs out
  useEffect(() => {
    if (!user && showDashboard) {
      setShowDashboard(false);
    }
  }, [user, showDashboard]);

  // If viewing a public portfolio (legacy URL), show PublicPortfolio component
  if (publicUserId) {
    return (
      <div className="App">
        <PublicPortfolio userId={publicUserId} />
      </div>
    );
  }

  return (
    <div className="App">
      <UrlRedirect />
      <Header 
        showDashboard={showDashboard} 
        onToggleDashboard={toggleDashboard} 
      />
      {showDashboard ? (
        <PortfolioManager />
      ) : (
        <>
          <Hero onEditClick={handleEditClick} />
          <About onEditClick={handleEditClick} />
          <Skills onEditClick={handleEditClick} />
          <Projects onEditClick={handleEditClick} />
          <Experience />
          <Contact />
        </>
      )}
    </div>
  );
};

// Portfolio Route Component
const PortfolioRouteWrapper = () => {
  return (
    <div className="App">
      <UrlRedirect />
      <PortfolioRoute />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/portfolio" element={<PortfolioRouteWrapper />} />
          <Route path="/test-routing" element={<RoutingTest />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;