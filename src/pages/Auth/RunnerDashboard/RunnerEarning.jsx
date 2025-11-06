import React, { useState } from "react";
import "./RunerEarning.css";
import { ArrowDownLeft } from "lucide-react";
import { FaWallet } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import WithdrawBank from "../../../Components/RunnerModal/WithdrawBank";

const RunnerEarning = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const copyWalletId = () => {
    const walletId = "RH-9472836"; 
    navigator.clipboard.writeText(walletId);

   
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); 
  };

  return (
    <div className="wallet-page-container">
      <header className="wallet-page-header">
        <h2>My Wallet</h2>
        <p>Manage your earnings and withdrawals</p>
      </header>

      <section className="summary-cards-container">
        {/* Available Balance / Withdraw Card */}
        <div className="summary-card available-balance-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder">
              <FaWallet style={{ fontSize: "1.5rem" }} />
            </div>
            <h4>Available Balance</h4>
            <div
              className="eye-icon-placeholder"
              onClick={toggleVisibility}
              style={{ cursor: "pointer" }}
            >
              {isVisible ? (
                <RxEyeOpen style={{ fontSize: "1.5rem" }} />
              ) : (
                <RxEyeClosed style={{ fontSize: "1.5rem" }} />
              )}
            </div>
          </div>
          <p className="card-main-value">{isVisible ? "₦12,750" : "•••••"}</p>
          <div className="wallet-id-row">
            <p className="wallet-id-text">Wallet ID:</p>
            <p className="wallet-id-number">RH-9472836 </p>
            <div
              className="copy-icon-placeholder"
              onClick={copyWalletId}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <IoCopyOutline style={{ fontSize: "1rem" }} />
              {copied && (
                <span
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "0",
                    background: "#333",
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                  }}
                >
                  Copied!
                </span>
              )}
            </div>
          </div>
          <button className="withdraw-button">
            <ArrowDownLeft style={{ fontSize: "1.5rem" }} />
            Withdraw
          </button>
        </div>

        {/* Pending Earnings Card */}
        <div className="summary-card pending-earnings-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder"> <svg style ={{color : "#F59E0B"}}width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
   <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
   <polyline points="22,4 12,14.01 9,11.01" />
 </svg></div>
            <h4>Pending Earnings</h4>
          </div>
          <p className="card-main-value">₦12,750</p>
          <p className="card-sub-text">Being verified</p>
        </div>

        {/* Total Earnings Card */}
        <div className="summary-card total-earnings-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder"></div>
            <h4>Total Earnings</h4>
          </div>
          <p className="card-main-value">₦12,750</p>
          <p className="card-sub-text">All time</p>
        </div>
      </section>

      {/* Transaction History */}
      <section className="transaction-history-section">
        <h3>Transaction History</h3>

        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">
              Errand completed • 2025-10-20 at 4:45 PM
            </p>
          </div>
          <div className="transaction-amount pending-amount">
            <p>Pending</p>
            <p className="amount-value">+₦3000.00</p>
          </div>
        </div>

        <div className="transaction-item">
          <div className="transaction-icon-placeholder blue-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Withdrawal to Access Bank</p>
            <span className="transaction-type">Bank transfer</span>
            <p className="transaction-info">2025-10-21 at 10:35 AM</p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value negative-value">-₦2000.00</p>
          </div>
        </div>

        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">
              Errand completed • 2025-10-20 at 4:45 PM
            </p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value positive-value">+₦3000.00</p>
          </div>
        </div>

        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">
              Errand completed • 2025-10-20 at 4:45 PM
            </p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value positive-value">+₦3000.00</p>
          </div>
        </div>

        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">
              Errand completed • 2025-10-20 at 4:45 PM
            </p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value positive-value">+₦3000.00</p>
          </div>
        </div>
        {/* {withdrawModal && <WithdrawBank/> close ()} */}
      </section>
    </div>
  );
};

export default RunnerEarning;
