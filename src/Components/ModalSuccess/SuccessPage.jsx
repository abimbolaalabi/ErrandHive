import React from "react";
import "./SuccessPage.css";
import { FaCheckCircle } from "react-icons/fa";
import { BsShieldCheck, BsChat, BsReceipt } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const SuccessPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference")?.split("_")[0];

  console.log("Payment reference:", reference);
  const navigate = useNavigate();

  return (
    <div className="success-page-container">
      <div className="success-page-box">
        <div className="success-icon-wrapper">
          <FaCheckCircle className="success-icon" />
        </div>

        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-subtitle">
          Your errand has been confirmed. A verified Runner will begin shortly.
        </p>

        <div className="success-info-card">
          <div className="success-info-row">
            <span>Amount Paid</span>
            <strong>#4,000</strong>
          </div>

          <div className="success-info-row">
            <span>Errand</span>
            <strong>Document pickup</strong>
          </div>

          <div className="success-escrow">
            <BsShieldCheck className="escrow-icon" />
            <span>○ Funds held securely in escrow</span>
          </div>
        </div>

        <div className="success-actions">
         

          <div className="success-footer-actions">
            <button className="success-secondary-btn" onClick={()=>window.location.href = `https://errand-hive.vercel.app/dashboard/messages/${reference}`
}>
              <BsChat className="btn-icon" />
              Chat
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessPage;