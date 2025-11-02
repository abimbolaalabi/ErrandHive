import React from 'react';
import './RunerEarning.css';

// --- Icons (represented by placeholders) ---
const EyeIcon = () => <span className="icon-placeholder">👁️</span>;
const WalletIcon = () => <span className="icon-placeholder">💳</span>;
const ClockIcon = () => <span className="icon-placeholder">⏳</span>;
const ChartIcon = () => <span className="icon-placeholder">📈</span>;
const BankIcon = () => <span className="icon-placeholder">🏦</span>;
const PackageIcon = () => <span className="icon-placeholder">📦</span>;

// --- Mock Data ---

// Data for the three distinct top cards
const statsCardsData = [
  {
    id: 'available',
    title: 'Available Balance',
    amount: '₦12,750',
    icon: <WalletIcon />,
    class: 'available-balance-card',
    details: 'RH-9472836', // Unique detail for this card
  },
  {
    id: 'pending',
    title: 'Pending Earnings',
    amount: '₦12,750',
    icon: <ClockIcon />,
    class: 'pending-earnings-card',
    statusText: 'Being verified',
  },
  {
    id: 'total',
    title: 'Total Earnings',
    amount: '₦12,750',
    icon: <ChartIcon />,
    class: 'total-earnings-card',
    statusText: 'All time',
  }
];

// Data for the Transaction History (remains mapped)
const transactionsData = [
  { id: 1, name: "Package Pickup", type: "Errand Payment", date: "2025-10-20 at 4:45 PM", amount: "+₦3000.00", status: "Pending", iconType: "PackageIcon" },
  { id: 2, name: "Withdrawal to Access Bank", type: "Withdrawal", date: "2025-10-21 at 10:15 AM", amount: "-₦2000.00", status: "Completed", iconType: "BankIcon" },
  { id: 3, name: "Package Pickup", type: "Errand Payment", date: "2025-10-20 at 4:45 PM", amount: "+₦3000.00", status: "Completed", iconType: "PackageIcon" },
  { id: 4, name: "Package Pickup", type: "Errand Payment", date: "2025-10-20 at 4:45 PM", amount: "+₦3000.00", status: "Completed", iconType: "PackageIcon" }
];


const RunnerEarning= () => {
  return (
    <div className="wallet-dashboard">
      {/* Header */}
      <h1 className="header-title">My Wallet</h1>
      <p className="header-subtitle">Manage your earnings and withdrawals</p>

      {/* --- Stats Cards Section (Dynamically Mapped for Distinction) --- */}
      <div className="stats-cards-container">
        {statsCardsData.map(card => (
          <div key={card.id} className={`stat-card ${card.class}`}>
            
            {/* Conditional structure for the Available Balance Card (Unique Layout) */}
            {card.id === 'available' ? (
              <>
                <div className="card-header">
                  <div className="card-title-group">
                    {card.icon}
                    <p className="card-title">{card.title}</p>
                  </div>
                  <EyeIcon />
                </div>
                <p className="card-amount">{card.amount}</p>
                <div className="wallet-info">
                  <p className="wallet-id-label">Wallet ID</p>
                  <span className="wallet-id-value">{card.details}</span>
                  <WalletIcon />
                </div>
                <button className="withdraw-button">Withdraw</button>
              </>
            ) : (
              // Standard structure for Pending and Total Earnings Cards
              <>
                <div className="card-header">
                  {card.icon}
                  <p className="card-title">{card.title}</p>
                </div>
                <p className="card-amount">{card.amount}</p>
                <p className="card-status">{card.statusText}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* --- Transaction History Section (Mapped) --- */}
      <div className="transaction-history-section">
        <h2>Transaction History</h2>

        <div className="transaction-list">
          {transactionsData.map(transaction => (
            <div 
              key={transaction.id} 
              className={`transaction-item ${transaction.status.toLowerCase()}`}
            >
              
              {/* Icon Container using Conditional Rendering (No Switch) */}
              <div 
                className={`transaction-icon-container ${transaction.iconType === 'PackageIcon' ? 'package-icon' : 'withdrawal-icon'}`}
              >
                {/* Conditional component rendering */}
                {transaction.iconType === 'PackageIcon' ? <PackageIcon /> : <BankIcon />}
              </div>
              
              {/* Transaction Details */}
              <div className="transaction-details">
                <p className="transaction-name">{transaction.name}</p>
                <span className="transaction-type">{transaction.type}</span>
                <p className="transaction-status-date">Errand completed • {transaction.date}</p>
              </div>
              
              {/* Transaction Amount */}
              <div className="transaction-amount-container">
                <p className={`transaction-status ${transaction.status.toLowerCase()}-text`}>
                  {transaction.status}
                </p>
                <p className={`transaction-amount ${transaction.amount.startsWith('+') ? 'positive-amount' : 'negative-amount'}`}>
                  {transaction.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunnerEarning;