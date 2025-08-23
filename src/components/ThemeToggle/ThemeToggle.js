import React from 'react';
import { useTheme } from '../ThemeContext';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;