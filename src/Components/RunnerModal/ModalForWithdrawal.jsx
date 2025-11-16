import React, { useState, useEffect } from "react";
import "./ModalForWithdrawal.css";
import { IoClose } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiLock } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const ModalForWithdrawal = ({ toclose, setSuccess, amount , onSuccess }) => {

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [wallet, setWalletData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bank, setBank] = useState(null);


  // Fetch wallet balance
  const fetchWalletData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      if (!token) {
        toast.error("No token found! Please login again.");
        return;
      }

      const walletResponse = await axios.get(
        `${API_BASE_URL}/payment/wallet/balance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = walletResponse.data.data;

      setWalletData({
        availableBalance: data.balance || 0,
        pendingEarnings: data.pendingEarnings || 0,
        totalEarnings: data.totalEarnings || 0,
        walletId: data.walletId || "N/A",
      });
    } catch (err) {
      toast.error("Failed to load wallet data");
    }
  };

  // Fetch bank details
  const fetchBankDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/payment/banks/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const banks = res.data.data.bankDetails || [];
      const verifiedBank = banks.find((b) => b.isVerified && b.isActive);

      if (!verifiedBank) {
        setError("No verified bank account found. Please add and verify a bank first.");
      } else {
        setBank(verifiedBank);
      }
    } catch (err) {
      console.error("Bank details fetch error:", err);
      setError("Failed to fetch bank details.");
    }
  };

  useEffect(() => {
    fetchWalletData();
    fetchBankDetails();
  }, []);

  const handleConfirmWithdrawal = async () => {
    if (!bank) {
      toast.error("Cannot withdraw without a verified bank.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      await axios.post(
        `${API_BASE_URL}/payment/wallet/withdraw`,
        { amount: Number(amount), bankId: bank.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
       toast.success("Withdrawal successful!");
      toclose(false);
      if (onSuccess) onSuccess();
      
      toclose(false);
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Withdrawal failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mddcontainer">
      <div className="mddwrapper">
        <div className="mddheader">
          <h2>Confirm Withdrawal</h2>
          <IoClose className="mddclose" size={20} onClick={() => toclose(false)} />
        </div>

        <p className="mddsub">Review your withdrawal details</p>

        <div className="mddbalancebox">
          <div>
            <p className="mddbalance-label">You're withdrawing</p>
            <p className="mddbalance-amount">
              ₦{Number(amount).toLocaleString()}
            </p>
          </div>

          <div className="mddbalanceicon">
            <TbCurrencyNaira size={20} />
          </div>
        </div>

{bank && (
  <div className="confirm-details-card" style={{ padding: "16px", marginBottom: "24px" }}>
    <div className="detail-row">
      <div className="detail-icon-box">
        <BsBuilding size={18} />
      </div>
      <div className="detail-text">
        <p className="detail-title">To Bank Account</p>
        <p className="detail-value">
          {bank.bankName || "Bank Name Missing"} •••• {bank.accountNumber ? bank.accountNumber.slice(-4) : "XXXX"}
        </p>
        <p className="detail-subtext">
          Account Holder: {bank.accountName || "Name Missing"}
        </p>
      </div>
    </div>

    <div className="detail-row">
      <div className="detail-icon-box">
        <TbCurrencyNaira size={18} />
      </div>
      <div className="detail-text">
        <p className="detail-title">Total Deduction</p>
        <p className="detail-value">₦{Number(amount).toLocaleString()}</p>
      </div>
    </div>
  </div>
)}


        {error && <div className="mddwarning" style={{ color: "red" }}>{error}</div>}

        <div className="confirm-security-info" style={{ marginBottom: "16px" }}>
          <FiLock size={16} className="security-info-icon" />
          <span>Your transaction is secured with bank-level encryption</span>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="mddbutton"
            style={{ flex: 1, backgroundColor: "transparent", color: "#8a2be2", border: "1px solid #8a2be2" }}
            onClick={() => toclose(false)}
          >
            Back
          </button>
          <button
            className="mddbutton"
            style={{ flex: 1 }}
            onClick={handleConfirmWithdrawal}
            disabled={loading || !bank}
          >
            {loading ? "Processing..." : "Confirm Withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForWithdrawal;
