import React, { useContext } from 'react';
// import '..//DashboardPage/DashboardPage.css';
import '../DashboardPage/DashboardPage.css'
import { AppContext } from '../../../Context/App';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const DashboardPage = () => {
  const { userType } = useContext(AppContext);
  const userKyc = useSelector((state) => state.user.userKyc)
  const user = useSelector((state) => state.user.userDetails)
  console.log(userKyc)
  const navigate = useNavigate()

  const stats = [
    {
      title: 'Total Request',
      value: '1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      ),
      color: '#8133F1'
    },
    {
      title: 'Completed',
      value: '1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22,4 12,14.01 9,11.01" />
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      title: 'Active',
      value: '1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
      color: '#8133F1'
    },
    {
      title: 'Total Spent',
      value: '3000',
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <g stroke-linecap="round" stroke-linejoin="round">

            <path d="M8 16V8" />
            <path d="M16 16V8" />
            <path d="M8 8l8 8" />
            <path d="M6 10h12" />
            <path d="M6 14h12" />
          </g>
        </svg>
      ),
      color: '#F97316'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, {user.firstName}! 👋
        </h1>
        <p className="welcome-subtitle">
          Manage your errands today.
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
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
              <polygon points="12 3 4 8 12 13 20 8" />
              <polygon points="4 8 4 16 12 21 12 13" />
              <polygon points="20 8 20 16 12 21 12 13" />
              <rect x="9" y="9" width="6" height="6" fill="currentColor" stroke="none" />
            </svg>

          </div>
          <h2 className="no-errands-title">
            No errands yet
          </h2>
          <p className="no-errands-subtitle">
            {userKyc ? "Create your first errand to get started" : " Complete KYC to get started"}
          </p>
          {
            !userKyc ? (
              <button onClick={() => navigate('profile')} className="kyc-button">
                Complete Kyc
              </button>
            ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
