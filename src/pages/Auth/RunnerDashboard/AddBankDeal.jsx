import React, { useEffect, useState } from "react";
import "./AddBankDeal.css";
import { FaUniversity } from "react-icons/fa";
import AddBankModal from "../../../Components/RunnerModal/AddBankModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

const AddBankDeal = () => {
  const [showModal, setShowModal] = useState(false);

  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBankDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const res = await axios.get(`${BaseUrl}/payment/banks/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bankArray = res.data?.data?.bankDetails;

      if (Array.isArray(bankArray) && bankArray.length > 0) {
        setBank(bankArray[0]);
      } else {
        setBank(null); 
      }

      setLoading(false);
    } catch (err) {
      console.log("BANK DETAILS ERROR:", err);
      setBank(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  return (
    <div className="bank-account-page">
      <header className="bank-header">
        <h2>Profile & Settings</h2>
        <p>Manage your account information and preferences</p>
      </header>

      {/* 
          SHOW THIS ONLY WHEN bank === null
         */}
      {!bank && !loading && (
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
      )}

      {/* SHOW THIS ONLY WHEN bank !== null*/}
      {bank && (
        <div className="bank-wrapper">
          <div className="bank-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/483/483361.png"
              alt="bank"
              className="bank-icon"
            />
            <h2>Your Bank Account</h2>
          </div>

          <div className="bank-card">
            {bank.isVerified && (
              <span className="verified-badge">✔ Verified</span>
            )}

            <div className="bank-card-actions">
              {/* <button className="edit-btn" onClick={() => setShowModal(true)}>
                <FiEdit size={18} /> Edit
              </button>
              <button className="delete-btn">
                <RiDeleteBin6Line size={18} />
              </button> */}
            </div>

            <div className="bank-info">
              <div>
                <p className="label">Bank Name</p>
                <p className="value">{bank.bankName}</p>
              </div>

              <div>
                <p className="label">Account Number</p>
                <p className="value">
                  ******{bank.accountNumber?.slice(-4)}
                </p>
              </div>

              <div>
                <p className="label">Account Name</p>
                <p className="value">{bank.accountName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <AddBankModal close={setShowModal} onSuccess={fetchBankDetails} />
      )}
    </div>
  );
};

export default AddBankDeal;
