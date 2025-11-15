import React, { useState } from "react";
import "./AddBankDeal.css";
import { FaUniversity } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AddBankModal from "../../../Components/RunnerModal/AddBankModal";
// import AddBankAccountModal from "./AdddBankModal"; 

const AddBankDeal = () => {
  const { bankId } = useParams();
    {bankId}
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bank-account-page">
      <header className="bank-header">
        <h2>Profile & Settings</h2>
        <p>Manage your account information and preferences</p>
      </header>

      <div className="bank-card">
        <div className="bank-card-header">
          <FaUniversity className="bank-icon" />
          <h3>Your Bank Account</h3>
        </div>

        <div className="bank-card-body">
          <div className="bank-empty-icon">
            <FaUniversity />
          </div>
          <p className="bank-empty-title">No account linked yet</p>
          <p className="bank-empty-subtitle">
            Add one to receive your earnings securely
          </p>

          <button
            className="bank-add-btn"
            onClick={() => setShowModal(true)}
          >
            Add Bank Account
          </button>
        </div>
      </div>

      {showModal && (
        <AddBankModal
          close={setShowModal}
          
        />
      )}
    </div>
  );
};

export default AddBankDeal;
