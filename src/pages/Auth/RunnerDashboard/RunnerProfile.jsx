import React, { useState, useEffect } from "react";
import "./RunnerProfile.css";
import { FaEnvelope, FaStar, FaUniversity, FaCog } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import KycPopupModel from "../../../Components/RunnerModal/KycPopupModel";
import axios from "axios";
import Bank from "../../../assets/Bank.png"

const RunnerProfile = () => {
  const [user, setUser] = useState(null);
  const [kycStatus, setKycStatus] = useState(localStorage.getItem("userKyc")|| null);
  const [kycReason, setKycReason] = useState("");
  const [kycLoading, setKycLoading] = useState(true);
  const [kycModel, setKycModel] = useState(false);
  const [image, setImage] = useState(null);
  const [hasBankAccount, setHasBankAccount] = useState(false);

  const navigate= useNavigate()
 
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const token = JSON.parse(localStorage.getItem("userToken"));
  console.log(token)
  const storedUser = JSON.parse(localStorage.getItem("userDetails"));
  const id = storedUser?.id;

  const memberSince = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });
  const userRating = user?.rating || 4.5;

  const getUserById = async () => {
    setKycLoading(true);
    try {
      const res = await axios.get(`${BaseUrl}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = res?.data?.data;
      setUser(userData);
      setImage(userData?.profileImage || null);
      setHasBankAccount(!!userData?.bankAccount);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setKycLoading(false);
    }
  };

  const getKyc = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/kyc/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const kyc = res?.data?.data;

      console.log("kyc", kyc)
      if (kyc && kyc.status) {
        const status = kyc.status.toLowerCase();
        setKycStatus(status);
        setKycReason(kyc.reason || "");
        localStorage.setItem("userKyc", (status === "verified" || status === "approved").toString());
      } else {
        setKycStatus(null);
        localStorage.setItem("userKyc", "false");
      }
    } catch (error) {
      console.error("KYC fetch error:", error);
      setKycStatus(null);
      localStorage.setItem("userKyc", "false");
    }
  };

  useEffect(() => {
    getUserById();
    getKyc();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  if (kycLoading) {
    return (
      <div className="runnerProfile-container" style={{ padding: "50px", textAlign: "center" }}>
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="runnerProfile-container" style={{ padding: "50px", textAlign: "center" }}>
        <p>User not found</p>
      </div>
    );
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const email = user.email || "No email found";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return `${parts[0]?.charAt(0).toUpperCase() || ""}${parts[1]?.charAt(0).toUpperCase() || ""}`;
  };

  return (
    <div className="runnerProfile-container">
      <div className="runnerProfile-header">
        <h1>Profile & Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="runnerProfile-card">
        <div className="runnerProfile-left">
          <div className="runnerProfile-avatar">
            <div className="runnerProfile-avatarCircle">
              {image ? <img src={image} alt="profile" className="runnerProfile-avatarImg" /> : getInitials(fullName)}
            </div>
            <label htmlFor="profileImage" className="runnerProfile-cameraIcon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0-10l1.2-2h3.6l1.2 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z"
                />
              </svg>
            </label>
            <input id="profileImage" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          </div>

          <div className="runnerProfile-info">
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h2>{fullName}</h2>
              <p className="runnerProfile-email"><FaEnvelope /> {email}</p>
            </div>

            <div className="runnerProfile-right">
              <Link className="link" to={`/runnerlayout/runnerprofile/runnerprofile/${id}`}>
                <button className="runnerProfile-editBtn"><MdEdit /> Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="runnerProfile-bottom" style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
          <div className="runnerProfile-leftBottom" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p className="runnerProfile-memberSince"><span>Member since</span><br />{memberSince}</p>
            <div className="runnerProfile-ratingContainer">
              <FaStar className="runnerProfile-ratingStar" />
              <span className="runnerProfile-ratingValue">{userRating}</span>
            </div>
          </div>

          <div className="runnerProfile-bioContainer" style={{ flex: 1 }}>
            <p className="runnerProfile-bio">{user.bio || "No bio available."}</p>
          </div>
        </div>
      </div>

      {kycStatus === null && (
        <div className="runnerProfile-kycCard">
          <div className="runnerProfile-kycLeft">
            <div className="runnerProfile-kycIcon"><IoShieldCheckmarkOutline size={22} /></div>
            <div className="runnerProfile-kycInfo">
              <h3>KYC Verification <span className="runnerProfile-pending">Not Completed</span></h3>
              <p>Complete verification to be able to post errand</p>
            </div>
          </div>
          <div className="runnerProfile-kycRight">
            <button className="runnerProfile-verifyBtn" onClick={() => setKycModel(true)}>Start Verification</button>
          </div>
        </div>
      )}

      {kycStatus === "pending" && (
        <div className="runnerProfile-reviewCard">
          <div className="runnerProfile-reviewDetails">
            <div className="runnerProfile-reviewIconbox"><IoShieldCheckmarkOutline size={22} /></div>
            <div className="runnerProfile-reviewTexts">
              <h3>KYC Verification <span className="runnerProfile-statusLabel">In Progress</span></h3>
              <p>Your submission is currently being reviewed.</p>
            </div>
          </div>
        </div>
      )}

      {(kycStatus === "verified" || kycStatus === "approved") && (
        <div className="runnerProfile-kycVerifiedContainer">
          <div className="runnerProfile-kycVerifiedHeader">
            <div className="runnerProfile-kycVerifiedHeaderLeft">
              <div className="runnerProfile-kycVerifiedIconWrapper"><IoShieldCheckmarkOutline size={26} /></div>
              <div>
                <h3 className="runnerProfile-kycVerifiedTitle">
                  KYC Verification <span className="runnerProfile-kycVerifiedStatusLabel">Verified</span>
                </h3>
                <p className="runnerProfile-kycVerifiedSubtext">Your identity has been verified</p>
              </div>
            </div>
          </div>
          <div className="runnerProfile-kycVerifiedStepsWrapper">
            <div className="runnerProfile-kycVerifiedStepCard">
              <IoCheckmarkCircleOutline className="runnerProfile-kycVerifiedStepIcon" size={22} />
              <h4 className="runnerProfile-kycVerifiedStepTitle">Identity Verified</h4>
              <p className="runnerProfile-kycVerifiedStepDesc">Government ID</p>
            </div>
            <div className="runnerProfile-kycVerifiedStepCard">
              <IoCheckmarkCircleOutline className="runnerProfile-kycVerifiedStepIcon" size={22} />
              <h4 className="runnerProfile-kycVerifiedStepTitle">Address Verified</h4>
              <p className="runnerProfile-kycVerifiedStepDesc">Proof of Address</p>
            </div>
            <div className="runnerProfile-kycVerifiedStepCard">
              <IoCheckmarkCircleOutline className="runnerProfile-kycVerifiedStepIcon" size={22} />
              <h4 className="runnerProfile-kycVerifiedStepTitle">Selfie Verified</h4>
              <p className="runnerProfile-kycVerifiedStepDesc">Photo ID Match</p>
            </div>
          </div>
        </div>
      )}

      {kycStatus === "rejected" && (
        <div className="runnerProfile-rejectedWrapper">
          <div className="runnerProfile-rejectedHeader">
            <div className="runnerProfile-rejectedHeaderLeft">
              <div className="runnerProfile-rejectedIconBox"><IoCloseCircleOutline size={28} /></div>
              <div>
                <h3 className="runnerProfile-rejectedTitle">Verification Failed <span className="runnerProfile-rejectedStatusTag">Rejected</span></h3>
                <p className="runnerProfile-rejectedSubtext">Some documents were rejected. Please review and reupload.</p>
              </div>
            </div>
            <button className="runnerProfile-rejectedActionBtn" onClick={() => setKycModel(true)}>Resubmit document</button>
          </div>
          <div className="runnerProfile-rejectedReasonBox">
            <div className="runnerProfile-rejectedReasonHeader">
              <IoWarningOutline size={18} /><span>Rejection Reason</span>
            </div>
            <p className="runnerProfile-rejectedReasonText">{kycReason || "No reason provided."}</p>
          </div>
        </div>
      )}

      {!hasBankAccount && (
        <div className="runnerProfile-bankCard">
          <div className="runnerProfile-featureLeft">
            <div className="runnerProfile-kycIcon"><img src={Bank} alt="" /></div>
            <div className="runnerProfile-featureInfo">
              <h3>Add Your Bank Account</h3>
              <p>Link your bank account to receive withdrawals securely and quickly.</p>
            </div>
          </div>
          <button className="runnerProfile-actionBtn runnerProfile-bankBtn" onClick={()=> navigate("/runnerlayout/runnerprofile/bank")}>Add Bank Account Now</button>
        </div>
      )}

      <div className="runnerProfile-withdrawalCard">
        <div className="runnerProfile-featureLeft">
          <div className="runnerProfile-kycIcon"><img src={Bank} alt="" /></div>
          <div className="runnerProfile-featureInfo">
            <h3>Withdrawal Preference</h3>
            <p>Customize how and when you want to receive your earnings</p>
          </div>
        </div>  
        <button className="runnerProfile-actionBtn runnerProfile-withdrawalBtn">Edit Settings</button>
      </div>

      {kycModel && <KycPopupModel close={setKycModel} />}
    </div>
  );
};

export default RunnerProfile;