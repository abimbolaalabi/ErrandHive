import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddBankModal.css";

const AddBankModal = ({ close }) => {
  const [bankData, setBankData] = useState({
    bankCode: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("userToken"));

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clean numeric fields
    const cleanValue =
      name === "bankCode" || name === "accountNumber"
        ? value.replace(/\D/g, "")
        : value;

    setBankData((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://errandhive-project.onrender.com/api/v1/payment/banks/details",
        bankData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Bank saved!");
      setTimeout(() => close(false), 600);
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="bank-backdrop"></div>

      <div className="bank-modal-container">
        <div className="bank-modal">
          <button className="bank-close-btn" onClick={() => close(false)}>✕</button>

          <h2 className="bank-title">Add Bank Account</h2>
          <p className="bank-subtitle">
            Add your bank details to receive your earnings securely
          </p>

          <form className="bank-form" onSubmit={handleSubmit}>

            {/* BANK CODE */}
            <div className="bank-group">
              <label>Bank Code*</label>
              <input
                name="bankCode"
                value={bankData.bankCode}
                onChange={handleChange}
                placeholder="033"
                maxLength={3}
              />
            </div>

            {/* BANK NAME (USER TYPES MANUALLY) */}
            <div className="bank-group">
              <label>Bank Name*</label>
              <input
                name="bankName"
                value={bankData.bankName}
                onChange={handleChange}
                placeholder="GTBank, Access Bank, etc."
              />
            </div>

            {/* ACCOUNT NUMBER */}
            <div className="bank-group">
              <label>Account Number*</label>
              <input
                name="accountNumber"
                value={bankData.accountNumber}
                onChange={handleChange}
                placeholder="0123456789"
                maxLength={10}
              />
              <small>{bankData.accountNumber.length}/10 digits</small>
            </div>

            {/* ACCOUNT NAME */}
            <div className="bank-group">
              <label>Account Name*</label>
              <input
                name="accountName"
                value={bankData.accountName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            {/* SECURITY */}
            <div className="bank-security-box">
              <span className="security-icon">🛡️</span>
              <p>Your banking information is encrypted and stored securely.</p>
            </div>

            {/* BUTTONS */}
            <div className="bank-buttons">
              <button type="button" className="cancel-btn" onClick={() => close(false)}>
                Cancel
              </button>
              <button className="save-btn" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Account"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddBankModal;
