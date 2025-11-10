import React, { useEffect, useState } from "react";
import "./PaymentsPage.css";
import { HiArrowTrendingUp } from "react-icons/hi2";
import axios from "axios";

const PaymentsPage = () => {

  const [paymentsData, setPaymentsData] = useState([]);
  const token = localStorage.getItem("userToken");
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const getPayments = async () => {
    try {
      const res = await axios.get(
        `${BaseUrl}/payment/history`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const payments = res?.data?.data;
      console.log(res?.data?.data)
      setPaymentsData(payments);

    } catch (error) {
      console.log("Payment history error:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="payments-wrapper">
      <h2 className="payments-title">Payment & History</h2>
      <p className="payments-subtitle">Track your transaction and spending</p>

      {/* Top Cards */}
      <div className="payment-cards">
        <div className="payment-card first">
          <div>
            <h4>Total Spent</h4>
            <h2>₦4,000.00</h2>
            <p>This month: ₦4000.00</p>
          </div>
          <span className="card-icon"> <HiArrowTrendingUp /></span>
        </div>

        <div className="payment-card second">
          <div>
            <h4>Avg. Per Errand</h4>
            <h2>₦4,000.00</h2>
            <p>This month: ₦4000.00</p>
          </div>
          <span className="card-icon"><HiArrowTrendingUp /></span>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">

        <div className="table-header">
          <p className="col-type">Errand Type</p>
          <p className="col-date">Date</p>
          <p className="col-amount">Amount</p>
          <p className="col-status">Status</p>
          <p className="col-method">Payment Method</p>
        </div>

        {(paymentsData.length > 0 ? paymentsData : []).map((item) => (
          <div key={item.id} className="table-row">
            <p className="col-type type-text">
              {item.description }
            </p>
            <p className="col-date">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <p className="col-amount">₦{item.amount?.toLocaleString()}</p>
            <p className="col-status">
              <span className={`status-badge ${item.status === "paid" ? "completed" : "pending"}`}>
                {item.status}
              </span>
            </p>
            <p className="col-method">Wallet / Transfer</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default PaymentsPage;
