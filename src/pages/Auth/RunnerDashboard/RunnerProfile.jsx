import React, { useState, useEffect } from "react";
import "./RunnerProfile.css";
import { FaEnvelope } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import KycPopupModel from "../../../Components/RunnerModal/KycPopupModel";
import axios from "axios";

const RunnerProfile = () => {
  const [kycModel, setKycModel] = useState(false);
  const [image, setImage] = useState(null);
  // kycStatus is set to null initially, which corresponds to the "not completed" state in your JSX
  const [kycStatus, setKycStatus] = useState(null);
  const [kycReason, setKycReason] = useState("");
  // Added state for loading the KYC data
  const [kycLoading, setKycLoading] = useState(true);

  // Use optional chaining for environment variable access, though standard `import.meta.env` is generally safe.
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("userToken");
  const storedUser = JSON.parse(localStorage.getItem("userDetails"));

  const fullName = `${storedUser?.firstName || ""} ${
    storedUser?.lastName || ""
  }`.trim();
  const email = storedUser?.email || "No email found";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return `${parts[0]?.charAt(0).toUpperCase() || ""}${
      parts[1]?.charAt(0).toUpperCase() || ""
    }`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  /**
   * Function to fetch the user's KYC status from the API.
   */
  const getKyc = async () => {
    setKycLoading(true);
    try {
      // Check for token presence before making the call
      if (!token) {
        console.warn("User token not found. Cannot fetch KYC.");
        setKycStatus(null); // Keep as 'not completed'
        setKycLoading(false);
        return;
      }

      const res = await axios.get(`${BaseUrl}/kyc/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Assuming the KYC data is nested under res.data.data
      const kyc = res?.data?.data;

      if (kyc && kyc.status) {
        const status = kyc.status.toLowerCase();
        setKycStatus(status);
        setKycReason(kyc.reason || "");

        // Update local storage for general access to KYC verification status
        const isVerified = status === "verified" || status === "approved";
        localStorage.setItem("userKyc", isVerified.toString());
      } else {
        // Handle case where API returns success but no KYC record is found (i.e., "not completed")
        setKycStatus(null);
        localStorage.setItem("userKyc", "false");
      }
    } catch (error) {
      console.error("KYC fetch error:", error);
      // If the API throws an error (e.g., 404/403), it often implies no KYC record exists yet.
      // We'll treat this as "not completed" (null) for a cleaner UX flow.
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setKycStatus(null);
      } else {
        // You might want a specific error state here for network/server issues
        // For now, we'll log the error and default to "not completed"
        setKycStatus(null);
      }
      localStorage.setItem("userKyc", "false");
    } finally {
      setKycLoading(false);
    }
  };

  // Run the KYC fetch once when the component mounts
  useEffect(() => {
    getKyc();
  }, []);

  // --- Loading State Renderer ---
  if (kycLoading) {
    return (
      <div
        className="runnerProfile-container"
        style={{ padding: "50px", textAlign: "center" }}
      >
        <p>Loading profile and KYC status...</p>
      </div>
    );
  }

  // --- Helper function to determine the KYC status badge ---
  const getKycStatusDisplay = () => {
    if (kycStatus === "verified" || kycStatus === "approved") {
      return (
        <span className="runnerProfile-kycVerifiedStatusLabel">Verified</span>
      );
    } else if (kycStatus === "pending") {
      return <span className="runnerProfile-pending">In Review</span>;
    } else if (kycStatus === "rejected") {
      return <span className="runnerProfile-rejectedStatusTag">Rejected</span>;
    } else {
      return <span className="runnerProfile-pending">Not Completed</span>;
    }
  };

  return (
    <div className="runnerProfile-container">
      <div className="runnerProfile-header">
        <h1>Profile & Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="runnerProfile-card">
        {/* ... (Your existing profile card content remains the same) ... */}
        <div className="runnerProfile-left">
          <div className="runnerProfile-avatar">
            <div className="runnerProfile-avatarCircle">
              {image ? (
                <img
                  src={image}
                  alt="profile"
                  className="runnerProfile-avatarImg"
                />
              ) : (
                getInitials(fullName)
              )}
            </div>

            <label htmlFor="profileImage" className="runnerProfile-cameraIcon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0-10l1.2-2h3.6l1.2 2H20a2 2 0 0 1 2 2v10a2 
                    2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z"
                />
              </svg>
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>

          <div className="runnerProfile-info">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <h2>{fullName}</h2>
              <p className="runnerProfile-email">
                <FaEnvelope /> {email}
              </p>
            </div>
            <div className="runnerProfile-right">
              <Link className = "link"to={"/runnerlayout/runnerprofile/runnerprofile/id"}>
              <button className="runnerProfile-editBtn" >
                <MdEdit /> Edit Profile
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ gap: "10px" }}>
            <p className="runnerProfile-memberSince">
              <span>Member since</span>
              <br />
              January 2024
            </p>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <p className="runnerProfile-bio">
              Busy professional who values reliable service. Looking for trusted
              runners for regular errands.
            </p>
          </div>
        </div>
      </div>

      {/* --- KYC STATUS RENDERING CONDITIONS --- */}

      {/* 1. KYC NOT COMPLETED (kycStatus is null) */}
      {kycStatus === null && (
        <div className="runnerProfile-kycCard">
          <div className="runnerProfile-kycLeft">
            <div className="runnerProfile-kycIcon">
              <IoShieldCheckmarkOutline size={22} />
            </div>
            <div className="runnerProfile-kycInfo">
              {/* Updated status label for clarity */}
              <h3>
                KYC Verification{" "}
                <span className="runnerProfile-pending">Not Completed</span>
              </h3>
              <p>Complete verification to be able to post errand</p>
            </div>
          </div>
          <div className="runnerProfile-kycRight">
            <button
              className="runnerProfile-verifyBtn"
              onClick={() => setKycModel(true)}
            >
              Start Verification
            </button>
          </div>
        </div>
      )}

      {/* 2. KYC PENDING (kycStatus is "pending") */}
      {kycStatus === "pending" && (
        <div className="runnerProfile-reviewCard">
          <div className="runnerProfile-reviewDetails">
            <div className="runnerProfile-reviewIconbox">
              <IoShieldCheckmarkOutline size={22} />
            </div>
            <div className="runnerProfile-reviewTexts">
              <h3>
                KYC Verification{" "}
                <span className="runnerProfile-statusLabel">In Progress</span>
              </h3>
              <p>Your submission is currently being reviewed.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. KYC VERIFIED / APPROVED (kycStatus is "verified" or "approved") */}
      {(kycStatus === "verified" || kycStatus === "approved") && (
        <div className="runnerProfile-kycVerifiedContainer">
          <div className="runnerProfile-kycVerifiedHeader">
            <div className="runnerProfile-kycVerifiedHeaderLeft">
              <div className="runnerProfile-kycVerifiedIconWrapper">
                <IoShieldCheckmarkOutline size={26} />
              </div>

              <div>
                <h3 className="runnerProfile-kycVerifiedTitle">
                  KYC Verification{" "}
                  <span className="runnerProfile-kycVerifiedStatusLabel">
                    Verified
                  </span>
                </h3>
                <p className="runnerProfile-kycVerifiedSubtext">
                  Your identity has been verified
                </p>
              </div>
            </div>
          </div>

          <div className="runnerProfile-kycVerifiedStepsWrapper">
            <div className="runnerProfile-kycVerifiedStepCard">
              <IoCheckmarkCircleOutline
                className="runnerProfile-kycVerifiedStepIcon"
                size={22}
              />
              <h4 className="runnerProfile-kycVerifiedStepTitle">
                Identity Verified
              </h4>
              <p className="runnerProfile-kycVerifiedStepDesc">Government ID</p>
            </div>

            <div className="runnerProfile-kycVerifiedStepCard">
              <IoCheckmarkCircleOutline
                className="runnerProfile-kycVerifiedStepIcon"
                size={22}
              />
              <h4 className="runnerProfile-kycVerifiedStepTitle">
                Address Verified
              </h4>
              <p className="runnerProfile-kycVerifiedStepDesc">
                Proof of Address
              </p>
            </div>

            <div className="runnerProfile-kycVerifiedStepCard">
              <IoCheckmarkCircleOutline
                className="runnerProfile-kycVerifiedStepIcon"
                size={22}
              />
              <h4 className="runnerProfile-kycVerifiedStepTitle">
                Selfie Verified
              </h4>
              <p className="runnerProfile-kycVerifiedStepDesc">
                Photo ID Match
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. KYC REJECTED (kycStatus is "rejected") */}
      {kycStatus === "rejected" && (
        <div className="runnerProfile-rejectedWrapper">
          <div className="runnerProfile-rejectedHeader">
            <div className="runnerProfile-rejectedHeaderLeft">
              <div className="runnerProfile-rejectedIconBox">
                <IoCloseCircleOutline size={28} />
              </div>

              <div>
                <h3 className="runnerProfile-rejectedTitle">
                  Verification Failed
                  <span className="runnerProfile-rejectedStatusTag">
                    Rejected
                  </span>
                </h3>
                <p className="runnerProfile-rejectedSubtext">
                  Some documents were rejected. Please review and reupload.
                </p>
              </div>
            </div>

            <button
              className="runnerProfile-rejectedActionBtn"
              onClick={() => setKycModel(true)}
            >
              Resubmit document
            </button>
          </div>

          <div className="runnerProfile-rejectedReasonBox">
            <div className="runnerProfile-rejectedReasonHeader">
              <IoWarningOutline size={18} />
              <span>Rejection Reason</span>
            </div>

            <p className="runnerProfile-rejectedReasonText">
              {kycReason || "No reason provided."}
            </p>
          </div>
        </div>
      )}

      {kycModel && <KycPopupModel close={setKycModel} />}
    </div>
  );
};

export default RunnerProfile;
