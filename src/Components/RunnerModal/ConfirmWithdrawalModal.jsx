import React from 'react';
import './ConfirmWithdrawalModal.css';
import { IoClose } from 'react-icons/io5';
import { BsBuilding } from 'react-icons/bs';
import { TbCurrencyNaira } from 'react-icons/tb';
import { FiLock } from 'react-icons/fi';

const ConfirmWithdrawalModal = ({ toclose, setSuccess }) => {
     console.log("ConfirmWithdrawalModal")
  const withdrawingAmount = '1,000';
  const bankName = 'Access Bank';
  const accountNumberSuffix = '8901';
  const totalDeduction = '1,000';

  return (
    <div className="confirm-modal-container">
      <div className="confirm-modal-wrapper">

        <div className="confirm-modal-header">
          <h2>Confirm Withdrawal</h2>
          <IoClose className="confirm-modal-close" size={20} onClick={() => toclose(false)} />
        </div>
        <p className="confirm-modal-subheader">Review your withdrawal details</p>

        <div className="confirm-details-card">
          <p className="card-label">You're withdrawing</p>
          <p className="card-amount">₦{withdrawingAmount}</p>

          <div className="detail-row">
            <div className="detail-icon-box">
              <BsBuilding size={18} />
            </div>
            <div className="detail-text">
              <p className="detail-title">To Bank Account</p>
              <p className="detail-value">{bankName} •••• {accountNumberSuffix}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon-box">
              <TbCurrencyNaira size={18} />
            </div>
            <div className="detail-text">
              <p className="detail-title">Total Deduction</p>
              <p className="detail-value">₦{totalDeduction}</p>
            </div>
          </div>
        </div>

        <div className="confirm-security-info">
          <FiLock size={16} className="security-info-icon" />
          <span>Your transaction is secured with bank-level encryption</span>
        </div>

        <div className="confirm-action-buttons">
          <button className="confirm-button back-button">Back</button>
          <button className="confirm-button primary-button" onClick={()=> {{
            toclose(false);
            setSuccess(true);
            console.log("cheecking")
           }}}>Confirm Withdrawal</button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmWithdrawalModal;