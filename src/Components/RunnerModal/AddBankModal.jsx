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
    bvn: "",
  });

  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userToken"));

  // HANDLE INPUT
  const handleChange = async (e) => {
    const { name, value } = e.target;

    // only digits for bankCode / accountNumber / bvn
    const cleanValue =
      name === "bankCode" || name === "accountNumber" || name === "bvn"
        ? value.replace(/\D/g, "")
        : value;

    setBankData((prev) => ({ ...prev, [name]: cleanValue }));

    // SIMPLE verification — if bankCode exists and accountNumber has 10 digits
    if (
      (name === "accountNumber" && cleanValue.length === 10) ||
      (name === "bankCode" && cleanValue.length >= 3)
    ) {
      const bank = name === "bankCode" ? cleanValue : prev.bankCode;
      const account = name === "accountNumber" ? cleanValue : prev.accountNumber;

      if (bank.length >= 3 && account.length === 10) {
        verifyBank(bank, account);
      }
    }
  };

  // 🔥 SIMPLE BANK VERIFICATION
  const verifyBank = async (bankCode, accountNumber) => {
    try {
      const res = await axios.post(
        "https://errandhive-project.onrender.com/api/v1/payment/bank/details",
        { bank: bankCode, account: accountNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data;

      setBankData((prev) => ({
        ...prev,
        bankName: data.bankName,
        accountName: data.accountName,
      }));

      toast.success("Bank verified!");
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  // SUBMIT (VERY SIMPLE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://errandhive-project.onrender.com/api/v1/payment/banks/details",
        bankData,
        { headers: { Authorization: `Bearer ${token}` } }
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
              <label>Account Name</label>
              <input
                value={bankData.accountName}
                readOnly
                placeholder="Auto-filled after verification"
                className="readonly"
              />
            </div>

            {/* BVN */}
            <div className="bank-group">
              <label>BVN (Optional)</label>
              <input
                name="bvn"
                value={bankData.bvn}
                onChange={handleChange}
                placeholder="01234567890"
                maxLength={11}
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
