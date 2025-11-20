import React, { useEffect, useState } from "react";
import "./PaymentsPage.css";
import { HiArrowTrendingUp } from "react-icons/hi2";
import axios from "axios";

const PaymentsPage = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [amount, setAmount] = useState("");
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const getPayments = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/payment/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const payments = res?.data?.data?.payments || [];
      console.log("Payments fetched:", payments);

      // ⭐ FILTER: If Paid exists, remove Pending duplicates
      const filtered = payments.filter((tx, index, self) => {
        const sameGroup = self.filter(
          (t) => t.transactionId === tx.transactionId
        );

        const hasPaid = sameGroup.some((t) => t.status === "Paid");

        if (hasPaid) {
          return tx.status === "Paid"; // keep only the Paid one
        }

        return true; // no paid exists → keep pending normally
      });

      setAmount(res?.data?.data.summary.totalAmount);
      setPaymentsData(filtered);
    } catch (error) {
      console.log("Payment history error:", error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  // 🔥 Formatter to always show ₦4,000.00
  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="payments-wrapper">
      <h2 className="payments-title">Payment & History</h2>
      <p className="payments-subtitle">Track your transactions and spending</p>

      {/* Top Cards */}
      <div className="payment-cards">
        <div className="payment-card first">
          <div>
            <h4>Total Spent</h4>
            <h2>₦{formatCurrency(amount)}</h2>
          </div>
          <span className="card-icon">
            <HiArrowTrendingUp />
          </span>
        </div>

        <div className="payment-card second">
          <div>
            <h4>Avg. Per Errand</h4>
            <h2>₦{formatCurrency(amount)}</h2>
          </div>
          <span className="card-icon">
            <HiArrowTrendingUp />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-header">
          <p className="col-type">Errand Type</p>
          <p className="col-date">Date</p>
          <p className="col-amount">Amount</p>
          <p className="col-status">Status</p>
        </div>

        {paymentsData.length === 0 ? (
          <p className="no-payments">No payment history available</p>
        ) : (
          paymentsData.map((item) => (
            <div className="table-row" key={item.id}>
              <p className="col-type type-text">{item.description}</p>

              <p className="col-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <p className="col-amount">₦{formatCurrency(item.amount)}</p>

              <p className="col-status">
                <span
                  className={`status-badge ${
                    item.status.toLowerCase() === "paid"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
