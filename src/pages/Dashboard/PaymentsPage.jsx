import React from "react";
import "./PaymentsPage.css";
import { HiArrowTrendingUp } from "react-icons/hi2";

const PaymentsPage = () => {

  const paymentsData = [
    {
      id: 1,
      type: "Document Pickup",
      date: "20th Oct 2025",
      amount: "₦4000.00",
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      id: 2,
      type: "Document Pickup",
      date: "20th Oct 2025",
      amount: "₦4000.00",
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: 3,
      type: "Document Pickup",
      date: "20th Oct 2025",
      amount: "₦4000.00",
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: 4,
      type: "Document Pickup",
      date: "20th Oct 2025",
      amount: "₦4000.00",
      status: "Completed",
      method: "Bank Transfer",
    },
  ];

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

        {paymentsData.map((item) => (
          <div key={item.id} className="table-row">
            <p className="col-type type-text">Document<br /> <span> Pickup</span></p>
            <p className="col-date">{item.date}</p>
            <p className="col-amount">{item.amount}</p>
            <p className="col-status">
              <span className={`status-badge ${item.status === "Completed" ? "completed" : "pending"}`}>
                {item.status}
              </span>
            </p>
            <p className="col-method">{item.method}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default PaymentsPage;