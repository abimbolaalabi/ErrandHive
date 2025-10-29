import React, { useState } from "react";
import "./ProfilePage.css";
import { FaEnvelope } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Modaldashboard from "../../Components/ModalDashboard/Modaldashboard";

const ProfilePage = () => {
  const [modaldash, setModalDash] = useState(false)
  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1>Profile & Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-avatar">
            <div className="avatar-circle">JD</div>
            <div className="camera-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0-10l1.2-2h3.6l1.2 2H20a2 2 0 0 1 2 2v10a2 
                     2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z"
                />
              </svg>
            </div>
          </div>

          <div className="profile-info">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2>John Doe</h2>
              <p className="email">
                <FaEnvelope /> Johndoe@gmail.com
              </p>
            </div>
            <div className="profile-right">
              <button className="edit-btn">
                <MdEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ gap: "10px" }}>
            <p className="member-since">
              <span>Member since</span>
              <br />
              January 2024
            </p>
          </div>
          <div style={{paddingTop: "10px"}}>
            <p className="bio">
              Busy professional who values reliable service. Looking for trusted
              runners for regular errands.
            </p>
          </div>
        </div>
      </div>

      {/* KYC Section */}
      <div className="kyc-card">
        <div className="kyc-left">
          <div className="kyc-icon">
            <IoShieldCheckmarkOutline size={22} />
          </div>
          <div className="kyc-info">
            <h3>
              KYC Verification{" "}
              <span className="pending">Pending Upload</span>
            </h3>
            <p>Complete verification to be able to post errand</p>
          </div>
        </div>
        <div className="kyc-right">
          <button className="verify-btn" onClick={()=>setModalDash(true)}>Start Verification</button>
        </div>
      </div>
      { modaldash && ( <Modaldashboard close={setModalDash}/>)}
    </div>
  );
};

export default ProfilePage;
