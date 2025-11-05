import React, { useState } from "react";
import "./RunnerProfile.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import KycPopupModel from "../../../Components/RunnerModal/KycPopupModel";

const RunnerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [kycModal, setKycModal] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const storedUser = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const fullName = `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();
  const email = storedUser.email || "No email found";

  const getInitials = (name) => {
    if (!name) return "RN";
    const parts = name.split(" ");
    return `${parts[0] ? parts[0][0] : ""}${parts[1] ? parts[1][0] : ""}`.toUpperCase();
  };

  return (
    <div className="runnerProfile-container">
      {/* Header */}
      <div className="runnerProfile-header">
        <h1>{isEditing ? "" : "Runner Profile"}</h1>
        <p>
          {isEditing
            ? ""
            : "Manage your runner details and verification status"}
        </p>
      </div>

  
      {isEditing ? (
        <div className="edit-profile-settings">
          <div className="edit-header">
            <h1 className="edit-h1">Profile & Settings</h1>
            <p>Manage your account and information preference</p>
          </div>
          <form className="input-wrapper-edit">
             <div className="input-wrapper-edit-holde">
              <div>
            <label>Firstname</label>
              <div className="edit-input-text-holder-edit">
                <input type="text" placeholder="firstname" className="input-edit" />
              </div>
                 </div>
                 <div>
                  
                  <label className="">firstname</label>
           <div className="edit-input-text-holder-edit">
       <input type="text" placeholder="firstname" className="input-edit" />
              </div>
         </div>
             </div>
          </form>
           <form className="input-wrapper-edit">

           </form>
          </div>
      ) : (
        
        <>
          {/* Profile Card */}
          <div className="runnerProfile-card">
            <div className="runnerProfile-left">
              <div className="runnerProfile-avatar">
                <div className="runnerProfile-avatarCircle">
                  {image ? (
                    <img src={image} alt="runner" className="runnerProfile-avatarImg" />
                  ) : (
                    getInitials(fullName)
                  )}
                </div>

                <label htmlFor="runnerImage" className="runnerProfile-cameraIcon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-10l1.2-2h3.6l1.2 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z" />
                  </svg>
                </label>

                <input
                  id="runnerImage"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>

              <div className="runnerProfile-info">
                <div className="info-left">
                  <h2>{fullName || "Runner"}</h2>
                  <p className="runnerProfile-email">
                    <FaEnvelope /> {email}
                  </p>
                </div>
                <div className="runnerProfile-right">
                  <button
                    className="runnerProfile-editBtn"
                    onClick={() => setIsEditing(true)}
                  >
                    <MdEdit /> Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="runnerProfile-meta">
              <div className="runnerProfile-memberSince">
                <span>Active since</span>
                <br />
                March 2024
              </div>
              <div className="runnerProfile-bio">
                Reliable and experienced runner dedicated to timely and safe
                delivery of errands.
              </div>
            </div>
          </div>

          {/* KYC Pending Card */}
          <div className="runnerProfile-kycCard">
            <div className="runnerProfile-kycLeft">
              <div className="runnerProfile-kycIcon">
                <IoShieldCheckmarkOutline size={22} />
              </div>

              <div className="runnerProfile-kycInfo">
                <h3>
                  Runner Verification{" "}
                  <span className="runnerProfile-pending">Pending</span>
                </h3>
                <p>Upload ID and verification details to start accepting errands</p>
              </div>
            </div>
            <div className="runnerProfile-kycRight">
              <button
                className="runnerProfile-verifyBtn"
                onClick={() => setKycModal(true)}
              >
                Start Verification
              </button>
            </div>
          </div>
        </>
      )}

  
      {kycModal && <KycPopupModel close={setKycModal} />}
    </div>
  );
};

export default RunnerProfile;