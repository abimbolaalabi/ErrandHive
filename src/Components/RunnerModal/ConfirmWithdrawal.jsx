import React from "react";
import "./ConfirmWithdrawal.css";
import axios from "axios";

const ConfirmWithdrawal = ({ close, amount, openSuccess }) => {
  const BaseUrl = import.meta.env.VITE_BASE_URL
  const handleConfirm = async () => {
    try {
      const res = await axios.post(`${BaseUrl}/payment/wallet/withdraw`, {amount} 
      //  headers :{}
      );

    } catch (err) {
      console.error(err);
    }

    close(false);    // Close the confirm modal
    openSuccess(true); // Open the success/processing modal
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-container">
        <div className="confirm-header">
          <h3>Confirm Withdrawal</h3>
          <button className="x-end-confirm" onClick={() => close(false)}>x</button>
        </div>

        <p className="confirm-text">
          You are about to withdraw{" "}
          <strong>₦{parseFloat(amount).toLocaleString()}</strong> from your wallet to your bank account.
        </p>

        <div className="confirm-actions">
          <button className="cancel-btn" onClick={() => close(false)}>Cancel</button>
          <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWithdrawal;
