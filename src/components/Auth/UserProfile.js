import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { savePortfolioData, updateUserProfile } from '../../services/firebaseService';
import './Auth.scss';

const UserProfile = () => {
  const { user, userData, signOut, refreshUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState({
    displayName: userData?.displayName || '',
    phoneNumber: userData?.phoneNumber || '',
    email: userData?.email || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');

    try {
      const result = await updateUserProfile(user.uid, profileData);
      if (result.success) {
        await refreshUserData();
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="user-profile">
        <div className="loading">No user authenticated</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="user-profile">
        <div className="loading">Loading user data...</div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          User ID: {user.uid}
        </div>
        <button 
          className="btn btn-outline"
          onClick={refreshUserData}
          style={{ marginTop: '15px' }}
        >
          <i className="fas fa-sync-alt"></i> Refresh Data
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h3>User Profile</h3>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-info">
          <div className="info-item">
            <label>User ID:</label>
            <span className="user-id">{user.uid}</span>
          </div>

          <div className="info-item">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={true} // Email cannot be changed
                className="form-input"
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>

          <div className="info-item">
            <label>Display Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="displayName"
                value={profileData.displayName}
                onChange={handleInputChange}
                className="form-input"
                disabled={loading}
              />
            ) : (
              <span>{userData.displayName || 'Not set'}</span>
            )}
          </div>

          <div className="info-item">
            <label>Phone Number:</label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
                disabled={loading}
              />
            ) : (
              <span>{userData.phoneNumber || 'Not set'}</span>
            )}
          </div>

          <div className="info-item">
            <label>Member Since:</label>
            <span>{userData.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}</span>
          </div>

          <div className="info-item">
            <label>Last Updated:</label>
            <span>{userData.updatedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}</span>
          </div>
        </div>

        <div className="profile-actions-bottom">
          <button 
            className="btn btn-danger"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
