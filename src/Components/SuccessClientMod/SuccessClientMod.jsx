import React from "react";
import "./SuccessClientMod.css";

const SuccessClientMod = ({ onClose, runnerName = "John Doe", amount = "₦4,000" }) => {
  // Generate initials from runner name
  const getInitials = (name) => {
    if (!name) return "AN";
    const parts = name.trim().split(" ");
    return parts.map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  };

  return (
    <div className="successful-modal-overlay">
      <div className="successful-modal-content">

        {/* CLOSE BUTTON */}
        <button className="successful-close-button" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="successful-modal-body">

          {/* HEADER */}
          <div className="successful-header">
            <div className="successful-title-section">
              <div className="successful-checkmark-circle">
                <svg width="24" height="24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h1 className="successful-title">Errand Completed!</h1>
            </div>

            <p className="successful-subtitle">
              Your runner <strong>{runnerName}</strong> has delivered your item
            </p>
          </div>

          {/* RUNNER INFO */}
          <div className="successful-runner-section">
            <div className="successful-runner-info">
              <div className="successful-avatar">
                <span>{getInitials(runnerName)}</span>
              </div>

              <div className="successful-runner-details">
                <h2 className="successful-runner-name">{runnerName}</h2>
                <div className="successful-status-badge">
                  <span className="successful-status-dot"></span>
                  Delivered
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="successful-payment-section">
            <div className="successful-payment-header">
              <svg width="20" height="20" fill="none">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 9 12 12V15Z"
                  fill="currentColor"
                />
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <span>Payment Released securely</span>
            </div>

            <div className="successful-payment-details">
              <span className="successful-amount">{amount}</span>
              <span className="successful-payment-text">
                has been transferred from escrow to {runnerName}
              </span>
            </div>
          </div>

          {/* FOOTER */}
          <div className="successful-footer">
            <div className="succesful-fotter-div">
              <p className="payment-shit-text-successful">
                Payment secured safely
              </p>
              <p className="payment-shit-text-successful-p">
                {amount} has been transferred from escrow to {runnerName}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuccessClientMod;
