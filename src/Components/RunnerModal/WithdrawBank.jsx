import React, { useState } from "react";
import "./WithdrawBank.css";
import { FaNairaSign } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import ConfirmWithdrawal from "./ConfirmWithdrawal";
import Processing from "./Processing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WITHDRAWAL_FEE = 1000;

const WithdrawBank = ({ close, availableBalance }) => {
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  const totalDeduction = WITHDRAWAL_FEE;
  const amountToReceive = parseFloat(amount) > 0 ? parseFloat(amount) - totalDeduction : 0;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setAmount(value);
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || isNaN(numericAmount)) {
      toast.error("Enter a valid amount", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }

    // ✅ Removed minimum 1000 check, user can proceed with any positive number
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowProcessing(true);
  };

  return (
    <>
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
            <p>Enter any amount to proceed</p>
          </div>

          {parseFloat(amount) > 0 && (
            <div className="withdrawal-summary-card">
              <div className="summary-row">
                <p>Withdrawal Amount</p>
                <p>₦{parseFloat(amount).toLocaleString()}</p>
              </div>
              <div className="summary-row">
                <p>Total Deduction</p>
                <p className="deduction-amount">₦{totalDeduction.toLocaleString()}</p>
              </div>
            </div>
          )}

          <button 
            className="continue-btn" 
            onClick={handleContinue} 
            disabled={!parseFloat(amount)}
          >
            Continue
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmWithdrawal
          close={setShowConfirm}
          amount={amount}
          deduction={totalDeduction}
          amountReceived={amountToReceive}
          openSuccess={handleConfirm}
        />
      )}




{showProcessing && (
  <Processing close={() => setShowProcessing(false)} />
)}
      <ToastContainer />
    </>
  );
};

export default WithdrawBank;
