import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.scss';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { loading } = useAuth();

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

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSuccess = () => {
    onSuccess && onSuccess();
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <button 
          className="auth-modal-close" 
          onClick={onClose}
          disabled={loading}
          aria-label="Close modal"
        >
          ×
        </button>
        
        {isLogin ? (
          <LoginForm 
            onToggleForm={handleToggleForm} 
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm 
            onToggleForm={handleToggleForm} 
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
