import React, { useState } from "react";
import "./RunnerProfile.css";
import { FaEnvelope } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import KycPopupModel from "../../../Components/RunnerModal/KycPopupModel";

const RunnerProfile = () => {
  const [image, setImage] = useState(null);
  const [kycModal, setKycModal] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

   const storedUser = JSON.parse(localStorage.getItem("userDetails"));
 const fullName = `${storedUser?.firstName || ""} ${storedUser?.lastName || ""}`.trim();
 const email = storedUser?.email || "No email found";
const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    const first = parts[0]?.charAt(0).toUpperCase();
    const last = parts[1]?.charAt(0).toUpperCase();
    return `${first || ""}${last || ""}`;
}
  return (
    <div className="runnerProfile-container">
  
      <div className="runnerProfile-header">
        <h1>Runner Profile</h1>
        <p>Manage your runner details and verification status</p>
      </div>

      <div className="runnerProfile-card">
        <div className="runnerProfile-left">
          <div className="runnerProfile-avatar">
            <div className="runnerProfile-avatarCircle">
              {image ? (
                <img src={image} alt="runner" className="runnerProfile-avatarImg" />
              ) : (
                "RN"
              )}
            </div>

            <label htmlFor="runnerImage" className="runnerProfile-cameraIcon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0-10l1.2-2h3.6l1.2 2H20a2 2 0 0 1 2 2v10a2 
                     2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z"
                />
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
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2>{fullName}</h2>
              <p className="runnerProfile-email">
                <FaEnvelope /> {email}
              </p>
            </div>
            <div className="runnerProfile-right">
              <button className="runnerProfile-editBtn">
                <MdEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ gap: "10px" }}>
            <p className="runnerProfile-memberSince">
              <span>Active since</span>
              <br />
              March 2024
            </p>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <p className="runnerProfile-bio">
              Reliable and experienced runner dedicated to timely and safe delivery of errands.
            </p>
          </div>
        </div>
      </div>

  
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
      {
        kycModal &&  <KycPopupModel close={setKycModal} />
      }
     
    </div>
  );
};

export default RunnerProfile;
