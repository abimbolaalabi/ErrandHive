import React from "react";
import "./PaymentSuccess.css";
import { FaCheckCircle } from "react-icons/fa";
import { BsShieldCheck, BsChat, BsReceipt } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

const PaymentSuccess = () => {
  return (
    <div className="success-page-container">
      <div className="success-page-box">
        <div className="success-icon-wrapper">
          <FaCheckCircle className="success-icon" />
        </div>

        <h2 className="success-title">Payment Successful! ✨</h2>
        <p className="success-subtitle">
          Your payment was completed successfully.
          <br /> A verified runner will begin your errand soon.
        </p>

        <div className="success-info-card">
          <div className="success-info-row">
            <span>Amount Paid</span>
            <strong>₦5,000</strong>
          </div>

          <div className="success-info-row">
            <span>Errand</span>
            <strong>Package Delivery to Ikeja</strong>
          </div>

          <div className="success-escrow">
            <BsShieldCheck className="escrow-icon" />
            <p>Funds held securely in escrow</p>
          </div>
        </div>

        <button className="success-view-btn">
          <AiOutlineEye />
          View Errand Status
        </button>

        <div className="success-footer-actions">
          <button className="success-chat-btn">
            <BsChat /> Chat
          </button>
          <button className="success-receipt-btn">
            <BsReceipt /> Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
