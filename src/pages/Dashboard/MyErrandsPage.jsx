import React, { useContext } from 'react';
import { AppContext } from '../../Context/App';
import './DashboardPage.css';

const MyErrandsPage = () => {
  const { userType } = useContext(AppContext);

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">
          {userType === 'Client' ? 'My Errands' : 'Active Jobs'}
        </h1>
        <p className="welcome-subtitle">
          {userType === 'Client' 
            ? 'Manage your posted errands and track their progress.' 
            : 'View and manage your active job assignments.'
          }
        </p>
      </div>

      <div className="no-errands-section">
        <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M9 9h6v6H9z"/>
            </svg>
          </div>
          <h2 className="no-errands-title">
            {userType === 'Client' ? 'No errands posted yet' : 'No active jobs'}
          </h2>
          <p className="no-errands-subtitle">
            {userType === 'Client' 
              ? 'Start by posting your first errand.' 
              : 'Complete KYC to start receiving job assignments.'
            }
          </p>
          <button className="kyc-button">
            {userType === 'Client' ? 'Post Errand' : 'Complete Kyc'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyErrandsPage;
