import React from "react";
import "./SuccessModal.css";

const IoClose = ({ size, className, ...props }) => (
  <span
    {...props} // <-- This ensures onClick works
    className={className}
    style={{ fontSize: size, cursor: "pointer" }}
  >
    &times;
  </span>
);

const WithdrawalSuccessModal = ({ toclose }) => {
  return (
    <div className="success-modal-backdrop">
      <div className="success-modal-container">
        {/* HEADER */}
        <div className="success-modal-header">
          <h3 className="success-header-title">Withdrawal Initiated</h3>

          {/* CLOSE BUTTON */}
          <IoClose
            size={22}
            className="success-close-button"
            onClick={() => toclose(false)}
          />
        </div>

        <p className="success-header-subtitle">
          Your withdrawal has been successfully initiated
        </p>

        {/* CHECK ICON */}
        <div className="success-icon-circle">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* MAIN MESSAGE */}
        <h4 className="success-main-message">Withdrawal Initiated!</h4>
        <p className="success-sub-message">
          Your withdrawal of ₦1,000 is being processed
        </p>

        {/* DETAILS SUMMARY */}
        <div className="success-details-summary">
          <div className="summary-row">
            <span className="summary-label">Amount</span>
            <span className="summary-value">₦1,000</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">To</span>
            <span className="summary-value">Access Bank •••• 8901</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Estimated Arrival</span>
            <span className="summary-value">15 Minutes</span>
          </div>
        </div>

        {/* DONE BUTTON */}
        <button className="success-done-button" onClick={() => toclose(false)}>
          Done
        </button>
      </div>
    </div>
  );
};

export default WithdrawalSuccessModal;
