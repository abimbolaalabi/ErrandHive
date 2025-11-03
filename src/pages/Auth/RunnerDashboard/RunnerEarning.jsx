import React from 'react';
import './RunerEarning.css'; 
import {ArrowDownLeft} from "lucide-react"
import { FaWallet } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
const RunnerEarning = () => {
  return (
    <div className="wallet-page-container">
     
      <header className="wallet-page-header">
        <h2>My Wallet</h2>
        <p>Manage your earnings and withdrawals</p>
      </header>

      
      <section className="summary-cards-container">
        
   
        <div className="summary-card available-balance-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder"><FaWallet style={{fontSize:"1.5rem"}}/></div> 
            <h4>Available Balance</h4>
            <div className="eye-icon-placeholder"><RxEyeOpen style={{fontSize:"1.5rem", cursor:"pointer"}} /></div> 
          </div>
          <p className="card-main-value">₦12,750</p>
          <div className="wallet-id-row">
            <p className="wallet-id-text">Wallet ID:</p>
            <p className="wallet-id-number">RH-9472836 </p>
            <div className="copy-icon-placeholder"><IoCopyOutline style={{fontSize:"1rem",cursor:"pointer"}}/></div>
          </div>
          <button className="withdraw-button"><ArrowDownLeft style={{fontSize:"1.5rem"}}/>
      Withdraw</button>
        </div>


        <div className="summary-card pending-earnings-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder"></div> 
            <h4>Pending Earnings</h4>
          </div>
          <p className="card-main-value">₦12,750</p>
          <p className="card-sub-text">Being verified</p>
        </div>

        
        <div className="summary-card total-earnings-card">
          <div className="card-icon-title-row">
            <div className="card-icon-placeholder"></div> {/* Icon Placeholder */}
            <h4>Total Earnings</h4>
          </div>
          <p className="card-main-value">₦12,750</p>
          <p className="card-sub-text">All time</p>
        </div>
      </section>

      
      <section className="transaction-history-section">
        <h3>Transaction History</h3>

       
        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">Errand completed • 2025-10-20 at 4:45 PM</p>
          </div>
          <div className="transaction-amount pending-amount">
            <p>Pending</p>
            <p className="amount-value">+₦3000.00</p>
          </div>
        </div>
        
        
        <div className="transaction-item">
          <div className="transaction-icon-placeholder blue-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Withdrawal to Access Bank</p>
            <span className="transaction-type">Bank transfer</span>
            <p className="transaction-info">2025-10-21 at 10:35 AM</p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value negative-value">-₦2000.00</p>
          </div>
        </div>


        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">Errand completed • 2025-10-20 at 4:45 PM</p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value positive-value">+₦3000.00</p>
          </div>
        </div>
        
        {/* Transaction 4: Completed Package Pickup (Green) */}
        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">Errand completed • 2025-10-20 at 4:45 PM</p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value positive-value">+₦3000.00</p>
          </div>
        </div>

        {/* Transaction 5: Completed Package Pickup (Green) */}
        <div className="transaction-item">
          <div className="transaction-icon-placeholder green-icon"></div>
          <div className="transaction-details">
            <p className="transaction-title">Package Pickup</p>
            <span className="transaction-type">Errand Payment</span>
            <p className="transaction-info">Errand completed • 2025-10-20 at 4:45 PM</p>
          </div>
          <div className="transaction-amount completed-amount">
            <p>Completed</p>
            <p className="amount-value positive-value">+₦3000.00</p>
          </div>
        </div>
        
      </section>

       
    
      

    </div>
  );
};

export default RunnerEarning;