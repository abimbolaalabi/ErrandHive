import React, { useContext } from 'react';
// import '..//DashboardPage/DashboardPage.css';
import '../DashboardPage/DashboardPage.css'
import { AppContext } from '../../../Context/App';
const DashboardPage = () => {
  const { userType } = useContext(AppContext);

  const stats = [
    {
      title: 'Total Request',
      value: '0',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <path d="M9 9h6v6H9z"/>
        </svg>
      ),
      color: '#8133F1'
    },
    {
      title: 'Completed',
      value: '0',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      title: 'Active',
      value: '0',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      color: '#8133F1'
    },
    {
      title: userType === 'Client' ? 'Total Spent' : 'Total Earned',
      value: '0',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      color: '#F97316'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, John! 👋
        </h1>
        <p className="welcome-subtitle">
          {userType === 'Client' ? 'Manage your errands today.' : 'Complete tasks and earn money.'}
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
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
            {userType === 'Client' ? 'No errands yet' : 'You have no active job yet'}
          </h2>
          <p className="no-errands-subtitle">
            Complete KYC to get started
          </p>
          <button className="kyc-button">
            Complete Kyc
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
