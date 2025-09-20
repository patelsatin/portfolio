import React, { useState, useEffect } from 'react';
import './Header.scss';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useAuth } from '../Auth/AuthContext';
import AuthModal from '../Auth/AuthModal';
import ProfileModal from '../Auth/ProfileModal';
import { generatePortfolioUrl } from '../../utils/urlUtils';

const Header = ({ showDashboard, onToggleDashboard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: headerData, loading, error } = usePortfolioData('header');
  const { user, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Use a cartoon avatar seeded by email; fall back to guest when logged out
  const avatarSrc = user?.email
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`
    : 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (loading) {
    return (
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header__content">
            <div className="header__logo">
              <span className="logo-text">Loading...</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (error || !headerData) {
    return (
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header__content">
            <div className="header__logo">
              <span className="logo-text">Portfolio</span>
            </div>
            <div className="header-controls">
              <div className="theme-toggle-container">
                <ThemeToggle />
              </div>
              <div className="auth-controls">
                {!user ? (
                  <button 
                    className="btn btn-primary auth-btn"
                    onClick={() => setIsAuthOpen(true)}
                    aria-label="Sign in"
                  >
                    <i className="fas fa-user-circle"></i>
                    <span>Sign In</span>
                  </button>
                ) : (
                  <div className="auth-user">
                    <button 
                      className="avatar-btn"
                      title={user.email || 'Profile'}
                      aria-label="Profile"
                    >
                      <img 
                        src={avatarSrc} 
                        alt="Profile"
                        className="avatar-img"
                      />
                    </button>
                    <button 
                      className="btn btn-secondary auth-btn"
                      onClick={async () => { try { await signOut(); } catch (e) { console.error(e); } }}
                      aria-label="Sign out"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
              {user && (
                <>
                  <button 
                    className="share-portfolio-btn"
                    onClick={() => {
                      const portfolioUrl = generatePortfolioUrl(user.uid);
                      navigator.clipboard.writeText(portfolioUrl);
                      alert('Portfolio link copied to clipboard!');
                    }}
                    title="Share Portfolio"
                    aria-label="Share Portfolio"
                  >
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button 
                    className="dashboard-toggle-btn"
                    onClick={onToggleDashboard}
                    title={showDashboard ? "View Portfolio" : "Manage Portfolio"}
                    aria-label={showDashboard ? "View Portfolio" : "Manage Portfolio"}
                  >
                    <i className={`fas ${showDashboard ? 'fa-eye' : 'fa-cog'}`}></i>
                  </button>
                </>
              )}
            </div>
            <AuthModal 
              isOpen={isAuthOpen} 
              onClose={() => setIsAuthOpen(false)}
              onSuccess={() => setIsAuthOpen(false)}
            />
          </div>
        </div>
      </header>
    );
  }

  const { logo, navItems } = headerData;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <span className="logo-text">{logo.text}</span>
          </div>

          {!showDashboard && (
            <nav className={`header__nav ${isMobileMenuOpen ? 'open' : ''}`}>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="header-controls">
            {!showDashboard && (
              <div className="theme-toggle-container">
                <ThemeToggle />
              </div>
            )}
            <div className="auth-controls">
              {!user ? (
                <button 
                  className="btn btn-primary auth-btn"
                  onClick={() => setIsAuthOpen(true)}
                  aria-label="Sign in"
                >
                  <i className="fas fa-user-circle"></i>
                  <span>Sign In</span>
                </button>
              ) : (
                <div className="auth-user">
                  <button 
                    className="avatar-btn"
                    title={user.email || 'Profile'}
                    aria-label="Profile"
                    onClick={() => setIsProfileOpen(true)}
                  >
                    <img 
                      src={avatarSrc} 
                      alt="Profile"
                      className="avatar-img"
                    />
                  </button>
                  <button 
                    className="btn btn-secondary auth-btn"
                    onClick={async () => { try { await signOut(); } catch (e) { console.error(e); } }}
                    aria-label="Sign out"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
            {user && (
              <button 
                className="dashboard-toggle-btn"
                onClick={onToggleDashboard}
                title={showDashboard ? "View Portfolio" : "Manage Portfolio"}
                aria-label={showDashboard ? "View Portfolio" : "Manage Portfolio"}
              >
                <i className={`fas ${showDashboard ? 'fa-eye' : 'fa-cog'}`}></i>
              </button>
            )}
          </div>

          {!showDashboard && (
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)}
            onSuccess={() => setIsAuthOpen(false)}
          />
          <ProfileModal 
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;