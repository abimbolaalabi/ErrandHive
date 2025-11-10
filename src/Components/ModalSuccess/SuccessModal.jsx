import React from "react";
import "./SuccessModal.css";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BsChat, BsReceipt } from "react-icons/bs";

const SuccessModal = ({ toClose, info }) => {
  return (
    <div className="success-modal-overlay">
      <div className="success-modal-container">
        <button className="success-close-btn" onClick={() => toClose(false)}>
          <IoClose size={22} />
        </button>

        <div className="success-icon-wrapper">
          <FaCheckCircle className="success-icon" />
        </div>

        <h2 className="success-title">Payment Successful! ✨</h2>
        <p className="success-subtitle">
          Your errand has been confirmed. A verified Runner will begin shortly.
        </p>

        <div className="success-info-card">
          <div className="success-info-row">
            <span>Amount Paid</span>
            <strong>₦{Number(info?.amount).toLocaleString()}</strong>
          </div>

          <div className="success-info-row">
            <span>Errand</span>
            <strong>{info?.title || "Document pickup"}</strong>
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

export default SuccessModal;
