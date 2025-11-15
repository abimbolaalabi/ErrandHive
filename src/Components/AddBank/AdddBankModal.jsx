import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddBankModal.css";

const AddBankModal = ({ close }) => {
  const [bankData, setBankData] = useState({
    bankCode: "",
    accountNumber: "",
    nepaBillUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const token =  JSON.parse(localStorage.getItem("userToken"));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bankCode" || name === "accountNumber") {
      const numericValue = value.replace(/\D/g, "");
      setBankData({ ...bankData, [name]: numericValue });
    } else {
      setBankData({ ...bankData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://errandhive-project.onrender.com/api/v1/payment/banks/details",
        bankData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Bank details response:", res.data);
      toast.success(res.data.message);
    } catch (err) {
      console.error("❌ Error saving bank details:", err);
      toast.error(err.response?.data?.message || "Failed to save bank details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Backdrop */}
      <div className="add-bank-modal-backdrop"></div>

      {/* Modal */}
      <div className="add-bank-modal-overlay">
        <div className="add-bank-modal">
          {/* Close Button */}
          <button className="add-bank-close-btn" onClick={() => close(false)}>×</button>

          {/* Header */}
          <h2 className="add-bank-title">Add Bank Account</h2>
          <p className="add-bank-subtitle">
            Provide your bank and NEPA details to verify your account.
          </p>

          {/* Form */}
          <form className="add-bank-form" onSubmit={handleSubmit}>
            {/* Bank Code */}
            <div className="add-bank-form-group">
              <label className="add-bank-label">
                Bank Code <span className="add-bank-required">*</span>
              </label>
              <input
                type="text"
                name="bankCode"
                value={bankData.bankCode}
                onChange={handleChange}
                placeholder="Enter bank code (e.g. 033)"
                className="add-bank-input"
                required
              />
            </div>

            {/* Account Number */}
            <div className="add-bank-form-group">
              <label className="add-bank-label">
                Account Number <span className="add-bank-required">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                value={bankData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="add-bank-input"
                required
              />
            </div>

            {/* NEPA Bill URL */}
            <div className="add-bank-form-group">
              <label className="add-bank-label">
                NEPA Bill URL <span className="add-bank-required">*</span>
              </label>
              <input
                type="url"
                name="nepaBillUrl"
                value={bankData.nepaBillUrl}
                onChange={handleChange}
                placeholder="https://example.com/nepa-bill.pdf"
                className="add-bank-input"
                required
              />
            </div>

            {/* Security Notice */}
            <div className="add-bank-security-note">
              <svg className="add-bank-shield-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <p className="add-bank-security-text">
                Your details are encrypted and stored securely. We never share them with third parties.
              </p>
            </div>

            {/* Buttons */}
            <div className="add-bank-buttons">
              <button
                type="button"
                className="add-bank-cancel-btn"
                onClick={() => close(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="add-bank-save-btn"
                disabled={loading}
              >
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
