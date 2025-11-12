import React from "react";
import "./SuccessPage.css";
import { FaCheckCircle } from "react-icons/fa";
import { BsShieldCheck, BsChat, BsReceipt } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const SuccessPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference").split("_")[0];

  console.log("Payment reference:", reference);
  // console.log(refernce)
  const navigate = useNavigate()

  return (
    <div className="success-page-container">
      <div className="success-page-box">
        <div className="success-icon-wrapper">
          <FaCheckCircle className="success-icon" />
        </div>

        <h2 className="success-title">Payment Successful! ✨</h2>
        <p className="success-subtitle">
          Your payment was completed successfully. <br />
          A verified runner will begin your errand soon.
        </p>

        <div className="success-info-card">
          <div className="success-info-row">
            <span>Amount Paid</span>
            <strong>Success</strong>
          </div>

          <div className="success-info-row">
            <span>Errand</span>
            <strong>Confirmed</strong>
          </div>

          <div className="success-escrow">
            <BsShieldCheck className="escrow-icon" />
            <p>Funds held securely in escrow</p>
          </div>
        </div>

        <button className="success-view-btn" onClick={()=> navigate(`/dashboard/my-errands/errandId/errandTrack/${reference}`)}>
          <AiOutlineEye />
          Go to DashBoard
        </button>

      </div>
    </div>
  );
};

export default SuccessPage;
