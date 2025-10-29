import React from "react";
import "../Dashboard/DashboardPage/DashboardPage.css";

const PaymentsPage = () => {
  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">Payments</h1>
        <p className="welcome-subtitle">
          View your payment history and manage payment methods.
        </p>
      </div>

      {/* Empty State */}
      <div className="no-errands-section">
        <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>

          <h2 className="no-errands-title">No payments yet</h2>
          <p className="no-errands-subtitle">
            Your payment history will appear here once you start using our
            services.
          </p>

          <button className="kyc-button">Add Payment Method</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
