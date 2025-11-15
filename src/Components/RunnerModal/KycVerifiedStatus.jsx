// src/components/KycVerifiedStatus.jsx
import React from "react";
import "./KycVerifiedStatus.css";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const KycVerifiedStatus = () => {
  return (
    <div className="kyc-verified-container">
      <div className="kyc-main-status">
        <div className="kyc-icon">
          <IoShieldCheckmarkOutline size={20} />
        </div>
        <div className="kyc-text">
          <h3>
            KYC Verification{" "}
            <span className="verified-badge">Verified</span>
          </h3>
          <p>Your identity has been verified</p>
        </div>
      </div>


      <div className="kyc-sub-statuses">
        <div className="kyc-sub-item">
          <div className="kyc-check-icon">Check</div>
          <div className="kyc-sub-text">
            <strong>Identity Verified</strong>
            <p>Government ID</p>
          </div>
        </div>

        <div className="kyc-sub-item">
          <div className="kyc-check-icon">Check</div>
          <div className="kyc-sub-text">
            <strong>Address Verified</strong>
            <p>Proof of Address</p>
          </div>
        </div>

        <div className="kyc-sub-item">
          <div className="kyc-check-icon">Check</div>
          <div className="kyc-sub-text">
            <strong>Selfie Verified</strong>
            <p>Photo ID Match</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycVerifiedStatus;