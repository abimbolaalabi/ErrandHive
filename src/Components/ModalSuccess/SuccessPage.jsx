import React, { useEffect, useState } from "react"; 
import "./SuccessPage.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsShieldCheck, BsChat } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ModalSpinner from "../ModalSpinner/ModalSpinner";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const [payRef, setPayRef] = useState({});

  const [loading, setLoading] = useState(false);   

  const paymentRef = async () => {
    try {
      setLoading(true);    

      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/payment/verify/${reference}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPayRef(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);    // END LOADING
    }
  };

  useEffect(() => {
    if (reference) paymentRef();
  }, [reference]);

  const isSuccess = payRef?.paymentStatus === "Paid";

  return (
    <div className="success-page-container">
      <div className="success-page-box">

     

        <>
          {/* TOP ICON */}
          <div className="success-icon-wrapper">
            {isSuccess ? (
              <FaCheckCircle className="success-icon" />
            ) : (
              <FaTimesCircle className="failure-icon" />
            )}
          </div>

          {/* TITLE */}
          <h2 className="success-title">
            {payRef?.paymentStatus === "Paid" ? "Payment Successful" : "Payment Failed"}
          </h2>

          {/* SUBTEXT */}
          <p className="success-subtitle">
            {payRef?.paymentStatus === "Paid"
              ? "Your errand has been confirmed. A verified Runner will begin shortly."
              : "Payment could not be completed. Please try again."}
          </p>

          {/* INFO CARD */}
          <div className="success-info-card">
            <div className="success-info-row">
              <span>Amount</span>
              <strong>₦{payRef?.amount}</strong>
            </div>

            <div className="success-info-row">
              <span>Errand</span>
              <strong>{payRef?.description}</strong>
            </div>

            {isSuccess && (
              <div className="success-escrow">
                <BsShieldCheck className="escrow-icon" />
                <span>○ Funds held securely in escrow</span>
              </div>
            )}
          </div>

          {/* BUTTON AREA */}
          <div className="success-actions">
            <div className="success-footer-actions">

              {payRef?.paymentStatus === "Paid" ? (
                <button
                  className="success-secondary-btn"
                  onClick={() =>
                    window.location.href = `https://errand-hive.vercel.app/dashboard/messages/${reference}`
                  }
                >
                  <BsChat className="btn-icon" />
                  Chat
                </button>
              ) : (
                <button
                  className="failure-secondary-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  Try Again
                </button>
              )}

            </div>
          </div>
        </>

      </div>

      {loading && <ModalSpinner />}

    </div>
  );
};

export default SuccessPage;
