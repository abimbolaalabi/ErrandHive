import React from 'react';
import '../Dashboard/DashboardPage/DashboardPage.css';

const ProfilePage = () => {
  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">Profile</h1>
        <p className="welcome-subtitle">
          Manage your account settings and personal information.
        </p>
      </div>

      <div className="no-errands-section">
        <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 className="no-errands-title">Profile Settings</h2>
          <p className="no-errands-subtitle">
            Update your personal information, preferences, and account settings.
          </p>
          <button className="kyc-button">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
