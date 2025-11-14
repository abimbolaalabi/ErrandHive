import React, { useState } from "react";
import "./WithdrawBank.css";
import { FaNairaSign } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import ConfirmWithdrawal from "./ConfirmWithdrawal";
import Processing from "./Processing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawBank = ({ close, availableBalance }) => {
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setAmount(value);
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount < 1000) {
      toast.error("Minimum withdrawal is ₦1,000.00", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }

    if (numericAmount < availableBalance) {
      toast.error("Insufficient funds for this withdrawal", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }


    setShowConfirm(true);
  };

  const handleConfirm = () => {

    setShowConfirm(false);

 
    setShowProcessing(true);

  };

  return (
    <>
      {/* Main WithdrawBank modal */}
      <div className="withdraw-overlay">
        <div className="withdraw-container">
          <div className="withdraw-header">
            <h3>Withdraw to Bank</h3>
            <button className="x-end-withdraw" onClick={() => close(false)}>x</button>
          </div>

          <p className="withdraw-subtitle">
            Transfer funds from your wallet to your bank account
          </p>

          <div className="balance-card">
            <div>
              <p className="balance-label">Available Balance</p>
              <h2 className="balance-amount">₦{availableBalance.toLocaleString()}</h2>
            </div>
            <div className="balance-icon">
              <FaNairaSign />
            </div>
          </div>

          <div className="input-section">
            <label htmlFor="withdrawAmount">Withdrawal Amount</label>
            <input
              id="withdrawAmount"
              type="text"
              placeholder="₦ 0.00"
              value={amount}
              onChange={handleInputChange}
            />
          </div>

          <div className="info-text">
            <IoInformationCircleOutline className="info-icon" />
            <p>Minimum withdrawal is ₦1,000.00.</p>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>

      {/* ✅ Confirm Withdrawal modal */}
      {showConfirm && (
        <ConfirmWithdrawal
          close={setShowConfirm}
          amount={amount}
          openSuccess={handleConfirm} // ✅ your comment stays
        />
      )}

      {/* ✅ Processing modal */}
      {showProcessing && <Processing />}

      <ToastContainer />
    </>
  );
};

export default WithdrawBank;
