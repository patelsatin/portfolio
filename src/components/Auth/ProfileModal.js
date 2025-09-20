import React, { useEffect } from 'react';
import UserProfile from './UserProfile';
import './Auth.scss';

const ProfileModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleBackdropClick}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-label="User Profile">
        <button 
          className="auth-modal-close" 
          onClick={onClose}
          aria-label="Close profile modal"
        >
          ×
        </button>
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfileModal;


