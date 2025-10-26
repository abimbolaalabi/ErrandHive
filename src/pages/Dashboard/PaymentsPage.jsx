import React, { useContext } from 'react';
import { AppContext } from '../../Context/App';
import './DashboardPage.css';

const PaymentsPage = () => {
  const { userType } = useContext(AppContext);

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">
          {userType === 'Client' ? 'Payments' : 'My Earnings'}
        </h1>
        <p className="welcome-subtitle">
          {userType === 'Client' 
            ? 'View your payment history and manage payment methods.' 
            : 'Track your earnings and payment history.'
          }
        </p>
      </div>

      <div className="no-errands-section">
        <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          </div>
          <h2 className="no-errands-title">
            {userType === 'Client' ? 'No payments yet' : 'No earnings yet'}
          </h2>
          <p className="no-errands-subtitle">
            {userType === 'Client' 
              ? 'Your payment history will appear here once you start using our services.' 
              : 'Your earnings will appear here once you complete jobs.'
            }
          </p>
          <button className="kyc-button">
            {userType === 'Client' ? 'Add Payment Method' : 'Complete Kyc'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
