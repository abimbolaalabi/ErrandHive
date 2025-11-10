import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { FaEnvelope } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AppContext } from "../../Context/App";
import { useContext } from "react";
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoWarningOutline
} from "react-icons/io5";
import Modaldashboard from "../../Components/ModalDashboard/Modaldashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [modaldash, setModalDash] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [kycReason, setKycReason] = useState("");
  const navigate = useNavigate();
  const { user, setUser, getAUser } = useContext(AppContext);

  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("userToken");
  const storedUser = JSON.parse(localStorage.getItem("userDetails"));

  const fullName = `${storedUser?.firstName || ""} ${storedUser?.lastName || ""}`.trim();
  const email = storedUser?.email || "No email found";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return `${parts[0]?.charAt(0).toUpperCase() || ""}${parts[1]?.charAt(0).toUpperCase() || ""}`;
  };

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // instant preview
  const previewURL = URL.createObjectURL(file);
  setImage(previewURL);

  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await axios.put(
      `${BaseUrl}/update/${storedUser.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Profile image updated");
    const updatedUser = res?.data?.data;
    console.log(res.data.data)
    setUser(updatedUser);
    localStorage.setItem("userDetails", JSON.stringify(updatedUser));
  } catch (err) {
    console.log("Image upload error:", err?.response?.data);
    toast.error(err?.response?.data?.message || "Upload failed");
    setImage(null);
  }
};

  const getKyc = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/kyc/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const kyc = res?.data?.data;
      setKycStatus(kyc?.status?.toLowerCase());
      setKycReason(kyc?.reason || "");
      const verified = kyc?.status === "verified" || kyc?.status === "approved";
      localStorage.setItem("userKyc", verified);
    } catch (error) {
      console.log("KYC fetch error:", error);
    }
  };

  useEffect(() => {
    getAUser();
    getKyc();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile & Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {image ? (
                <img src={image} alt="profile" className="avatar-img" />
              ) : (
                getInitials(user?.fullName)
              )}
            </div>

            <label htmlFor="profileImage" className="camera-icon">
              {uploading ? (
                <span style={{ fontSize: "12px" }}>...</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0-10l1.2-2h3.6l1.2 2H20a2 2 0 0 1 2 2v10a2 
                       2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z"
                  />
                </svg>
              )}
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
                    <div className="profile-info">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2>{fullName}</h2>
              <p className="email">
                <FaEnvelope /> {user?.email}
              </p>
            </div>
            <div onClick={() => navigate(`/dashboard/profile/${storedUser.id}`)} className="profile-right">
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
          <div style={{ paddingTop: "10px" }}>
            <p className="bio">
             {user?.bio}
            </p>
          </div>
        </div>
      </div>

      {!kycStatus && (
        <div className="kyc-card">
          <div className="kyc-left">
            <div className="kyc-icon">
              <IoShieldCheckmarkOutline size={22} />
            </div>
            <div className="kyc-info">
              <h3>KYC Verification <span className="pending">Pending Upload</span></h3>
              <p>Complete verification to be able to post errand</p>
            </div>
          </div>
          <div className="kyc-right">
            <button className="verify-btn" onClick={() => setModalDash(true)}>
              Start Verification
            </button>
          </div>
        </div>
      )}

      {kycStatus === "pending" && (
        <div className="review-card">
          <div className="review-details">
            <div className="review-iconbox">
              <IoShieldCheckmarkOutline size={22} />
            </div>
            <div className="review-texts">
              <h3>KYC Verification <span className="status-label">In Progress</span></h3>
              <p>Your submission is currently being reviewed.</p>
            </div>
          </div>
        </div>
      )}

      {(kycStatus === "verified" || kycStatus === "approved") && (
        <div className="kyc-verified-containerr">
          <div className="kyc-verified-header">
            <div className="kyc-verified-header-left">
              <div className="kyc-verified-icon-wrapper">
                <IoShieldCheckmarkOutline size={26} />
              </div>

              <div>
                <h3 className="kyc-verified-title">
                  KYC Verification <span className="kyc-verified-status-label">Verified</span>
                </h3>
                <p className="kyc-verified-subtext">Your identity has been verified</p>
              </div>
            </div>
          </div>

          <div className="kyc-verified-steps-wrapper">
            <div className="kyc-verified-step-card">
              <IoCheckmarkCircleOutline className="kyc-verified-step-icon" size={22} />
              <h4 className="kyc-verified-step-title">Identity Verified</h4>
              <p className="kyc-verified-step-desc">Government ID</p>
            </div>

            <div className="kyc-verified-step-card">
              <IoCheckmarkCircleOutline className="kyc-verified-step-icon" size={22} />
              <h4 className="kyc-verified-step-title">Address Verified</h4>
              <p className="kyc-verified-step-desc">Proof of Address</p>
            </div>

            <div className="kyc-verified-step-card">
              <IoCheckmarkCircleOutline className="kyc-verified-step-icon" size={22} />
              <h4 className="kyc-verified-step-title">Selfie Verified</h4>
              <p className="kyc-verified-step-desc">Photo ID Match</p>
            </div>
          </div>
        </div>
      )}

      {kycStatus === "rejected" && (
        <div className="rejected-wrapper">
          <div className="rejected-header">
            <div className="rejected-header-left">
              <div className="rejected-icon-box">
                <IoCloseCircleOutline size={28} />
              </div>

              <div>
                <h3 className="rejected-title">
                  Verification Failed
                  <span className="rejected-status-tag">Rejected</span>
                </h3>
                <p className="rejected-subtext">
                  Some documents were rejected. Please review and reupload.
                </p>
              </div>
            </div>

            <button className="rejected-action-btn" onClick={() => setModalDash(true)}>
              Resubmit document
            </button>
          </div>

          <div className="rejected-reason-box">
            <div className="rejected-reason-header">
              <IoWarningOutline size={18} />
              <span>Rejection Reason</span>
            </div>

            <p className="rejected-reason-text">{kycReason || "No reason provided."}</p>
          </div>
        </div>
      )}

      {modaldash && <Modaldashboard close={setModalDash} />}
    </div>
  );
};

export default ProfilePage;
