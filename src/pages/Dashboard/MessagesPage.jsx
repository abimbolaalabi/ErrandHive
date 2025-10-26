import React from 'react';
import './DashboardPage.css';

const MessagesPage = () => {
  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">Messages</h1>
        <p className="welcome-subtitle">
          Communicate with runners and clients about your errands.
        </p>
      </div>

      <div className="no-errands-section">
        <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h2 className="no-errands-title">No messages yet</h2>
          <p className="no-errands-subtitle">
            Your conversations will appear here once you start communicating with other users.
          </p>
          <button className="kyc-button">
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
