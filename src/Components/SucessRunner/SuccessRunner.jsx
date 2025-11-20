
import React from 'react';
import './SuccessRunner.css';

const SuccessRunner = () => {
 

  return (
    <div className="runnersuccessful-modal-overlay" >
      <div className="runnersuccessful-modal-content" >
        <button className="runnersuccessful-close-button" >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="runnersuccessful-modal-body">
          <div className="runnersuccessful-header">
            <div className="runnersuccessful-title-section">
              <div className="runnersuccessful-checkmark-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="runnersuccessful-title">Delivery Successful</h1>
                <p className="runnersuccessful-subtitle">You've successfully completed this errand.</p>
              </div>
            </div>
          </div>

          <div className="runnersuccessful-payment-section">
            <div className="runnersuccessful-payment-header">
              <span>Payment Received</span>
            </div>
            
            <div className="runnersuccessful-payment-details">
              <div className="runnersuccessful-payment-row">
                <span className="runnersuccessful-payment-label">ErrandHive Commission (10%)</span>
                <span className="runnersuccessful-payment-amount">- ¥300</span>
              </div>
              
              <div className="runnersuccessful-divider"></div>
              
              <div className="runnersuccessful-payment-breakdown">
                <div className="runnersuccessful-breakdown-row">
                  <span className="runnersuccessful-breakdown-label">WILL DIN OPERATION FX</span>
                </div>
                <div className="runnersuccessful-breakdown-row">
                  <span className="runnersuccessful-breakdown-amount">¥3,000</span>
                </div>
                <div className="runnersuccessful-breakdown-row">
                  <span className="runnersuccessful-breakdown-commission">- ¥300</span>
                </div>
                <div className="runnersuccessful-breakdown-row runnersuccessful-breakdown-total">
                  <span className="runnersuccessful-breakdown-total-amount">¥2,700</span>
                </div>
              </div>
            </div>
          </div>

          <div className="runnersuccessful-wallet-section">
            <div className="runnersuccessful-wallet-header">
              <span>Amount Credited to Wallet</span>
            </div>
            
            <div className="runnersuccessful-balance-section">
              <div className="runnersuccessful-balance-header">
                <span>Updated Wallet Balance</span>
              </div>
              <div className="runnersuccessful-balance-amount">
                ¥18,480
              </div>
            </div>
          </div>

          <div className="runnersuccessful-footer">
            <button className="runnersuccessful-action-button" >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessRunner;


