import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context/App';

const LandingPage = () => {
  const { userType, setUserType } = useContext(AppContext);

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-header">
          <div className="logo">
            <img src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg" alt="ErrandHive" />
            <span>ErrandHive</span>
          </div>
          <div className="auth-links">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/signup/client" className="signup-link">Sign Up</Link>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to ErrandHive</h1>
            <p>Your trusted platform for connecting clients with reliable runners</p>
            
            <div className="user-type-selector">
              <h2>Choose Your Role</h2>
              <div className="role-cards">
                <div className={`role-card ${userType === 'Client' ? 'active' : ''}`} onClick={() => setUserType('Client')}>
                  <div className="role-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h3>Client</h3>
                  <p>Delegate tasks and get things done</p>
                  <Link to="/dashboard" className="role-btn">Access Dashboard</Link>
                </div>

                <div className={`role-card ${userType === 'Runner' ? 'active' : ''}`} onClick={() => setUserType('Runner')}>
                  <div className="role-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <polyline points="17,11 19,13 23,9"/>
                    </svg>
                  </div>
                  <h3>Runner</h3>
                  <p>Earn money by completing tasks</p>
                  <Link to="/dashboard" className="role-btn">Access Dashboard</Link>
                </div>
              </div>
            </div>

            <div className="features-section">
              <h2>Why Choose ErrandHive?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🚀</div>
                  <h3>Fast & Reliable</h3>
                  <p>Get your tasks completed quickly by trusted local runners</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">💰</div>
                  <h3>Fair Pricing</h3>
                  <p>Competitive rates for both clients and runners</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🔒</div>
                  <h3>Secure Platform</h3>
                  <p>Safe transactions and verified users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
