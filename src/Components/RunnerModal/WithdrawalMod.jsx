import React from "react";
import "./WithDrawalMod.css";
import ConfirmWithdrawal from "./ConfirmWithdrawal";

const WithdrawalMod = ({close}) => {
    const [amount, setAmount] = useState("");
    const [modal , setModal] = usState(false)
const [success, setSuccess] = useState(false);
  const formattedAmount = amount
    ? Number(amount.replace(/,/g, "")).toLocaleString()
    : "0";

  const minimum = 1000;
  const isBelowMinimum = Number(amount) < minimum;
  return (
     <div className="withdrawal-backdrop">
      <div className="withdrawal-content">
        {/* HEADER */}
        <div className="withdrawal-header">
          <h2>Withdraw to Bank</h2>
          <span className="withdrawal-close" onClick={() => close(false)}>✕</span>
        </div>

        <p className="withdrawal-subtitle">
          Transfer funds from your wallet to your bank account
        </p>

        {/* BALANCE BOX */}
        <div className="balance-box">
          <div>
            <p className="balance-label">Available Balance</p>
            <h3 className="balance-amount">₦12,750</h3>
          </div>

          <div className="balance-icon">
            <span>₦</span>
          </div>
        </div>

        {/* INPUT */}
        <label className="input-label">Withdrawal Amount</label>
        <div className="withdraw-input-wrapper">
          <span className="naira-symbol">₦</span>
          <input
            type="text"
            placeholder="0.00"
            className="withdraw-input"
            value={amount}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setAmount(val);
            }}
          />
        </div>

        {/* BREAKDOWN */}
        <div className="breakdown-box">
          <div className="breakdown-row">
            <span>Withdrawal Amount</span>
            <span>₦{formattedAmount}</span>
          </div>

          <div className="breakdown-row">
            <span>Total Deduction</span>
            <span>₦{formattedAmount}</span>
          </div>
        </div>

        {/* WARNING */}
        <div className="warning-box">
          <span className="warning-icon">ℹ</span>
          <p>Minimum withdrawal is ₦1,000.00.</p>
        </div>

        {/* BUTTON */}
        <button
          className={`withdraw-btn ${isBelowMinimum ? "disabled" : ""}`}
          disabled={isBelowMinimum}
          onClick={()=> setModal(true)}
        >
          Continue
        </button>
      </div>
      {/* {
        modal && ( <ConfirmWithdrawal/>)
      } */}
     
    </div>
  );
};

export default WithdrawalMod;
