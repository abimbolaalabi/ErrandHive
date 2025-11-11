import React, { useState, useEffect } from "react";
import "./RunerEarning.css";
import { ArrowDownLeft } from "lucide-react";
import { FaWallet } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import WithdrawBank from "../../../Components/RunnerModal/WithdrawBank";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const RunnerEarning = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [walletData, setWalletData] = useState({
    availableBalance: 0,
    pendingEarnings: 0,
    totalEarnings: 0,
    walletId: "",
  });
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const copyWalletId = () => {
    navigator.clipboard.writeText(walletData.walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ✅ Fetch wallet and payment history data
  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userToken"));

      if (!token) {
        toast.error("No token found! Please login again.");
        return;
      }

      // ✅ Fetch wallet balance
      const walletResponse = await axios.get(
        `${API_BASE_URL}/payment/wallet/balance`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const wallet = walletResponse.data.data;

      setWalletData({
        availableBalance: wallet.balance || 0,
        pendingEarnings: wallet.pendingEarnings || 0,
        totalEarnings: wallet.totalEarnings || 0,
        walletId: wallet.walletId || "N/A",
      });

   
      const txResponse = await axios.get(
        `${API_BASE_URL}/payment/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const txData = Array.isArray(txResponse.data.data)
        ? txResponse.data.data
        : [];

      setTransactions(txData);

      toast.success("Wallet data loaded successfully!");
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      toast.error("Failed to load wallet data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  if (loading) {
    return (
      <div className="wallet-page-container">
        <p>Loading wallet data...</p>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    );
  }

  return (
    <div className="wallet-page-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <header className="wallet-page-header">
        <h2>My Wallet</h2>
        <p>Manage your earnings and withdrawals</p>
      </header>

      {/* ✅ Summary Cards Section */}
      <section className="summary-cards-container">
        {/* Available Balance */}
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
          <p className="card-main-value">
            {isVisible ? `₦${walletData.availableBalance}` : "•••••"}
          </p>
          <div className="wallet-id-row">
            <p className="wallet-id-text">Wallet ID:</p>
            <p className="wallet-id-number">{walletData.walletId}</p>
            <div
              className="copy-icon-placeholder"
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
          <button
            className="withdraw-button"
            onClick={() => setWithdrawModal(true)}
          >
            <ArrowDownLeft style={{ fontSize: "1.5rem" }} />
            Withdraw
          </button>
        </div>

        {/* Pending Earnings */}
        <div className="summary-card pending-earnings-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder">
              <svg
                style={{ color: "#F59E0B" }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            </div>
            <h4>Pending Earnings</h4>
          </div>
          <p className="card-main-value">₦{walletData.pendingEarnings}</p>
          <p className="card-sub-text">Being verified</p>
        </div>

        {/* Total Earnings */}
        <div className="summary-card total-earnings-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder"></div>
            <h4>Total Earnings</h4>
          </div>
          <p className="card-main-value">₦{walletData.totalEarnings}</p>
          <p className="card-sub-text">All time</p>
        </div>
      </section>

      {/* ✅ Transaction History */}
      <section className="transaction-history-section">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((tx, index) => (
              <li key={index} className="transaction-item">
                <span className="tx-date">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </span>
                <span className="tx-type">{tx.type || "N/A"}</span>
                <span className="tx-amount">₦{tx.amount || 0}</span>
                <span
                  className={`tx-status ${
                    tx.status?.toLowerCase() === "completed"
                      ? "completed"
                      : tx.status?.toLowerCase() === "pending"
                      ? "pending"
                      : "failed"
                  }`}
                >
                  {tx.status || "Unknown"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ✅ Withdraw Modal */}
      {withdrawModal && (
        <WithdrawBank
          availableBalance={walletData.availableBalance}
          close={() => setWithdrawModal(false)}
        />
      )}
    </div>
  );
};

export default RunnerEarning;
