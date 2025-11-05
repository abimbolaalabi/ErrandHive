import "./Kycpopup.css";
import { useState } from "react";
import axios from "axios";
import { IoIosCloudUpload } from "react-icons/io";
import { FaRegIdCard } from "react-icons/fa";
import { MdHome, MdOutlineCameraAlt } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";

const KycPopupModel = ({ close }) => {
  const [idFile, setIdFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BaseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("userToken");
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed (jpg, png, jpeg).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10MB.");
      return;
    }

    if (type === "id") setIdFile(file);
    if (type === "address") setAddressFile(file);
    if (type === "selfie") setSelfieFile(file);
  };

  const allUploaded = idFile && addressFile && selfieFile;

  const handleSubmit = async () => {
    if (!allUploaded) return;

    const formData = new FormData();
    formData.append("id", idFile);
    formData.append("address", addressFile);
    formData.append("selfie", selfieFile);

    try {
      setLoading(true);

      const res= await axios.post(
       `${BaseURL}/Kyc/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
          },
        }
   
      );
          console.log(formData) 
          

      // close(false); 
    } catch (error) {
      console.error(error);
      console.log("err", error)
      toast.error("res")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kyc-popup-wrapper">
      <div className="kyc-popup">
        <div className="kyc-popup-header">
          <h2>KYC Verification</h2>
          <button className="kyc-popup-close" onClick={() => close(false)}>✕</button>
        </div>

        <p className="kyc-popup-subtitle">
          Upload the required documents to verify your identity
        </p>

        {/* Steps */}
        <div className="kyc-popup-steps">
          <div className={`kyc-popup-step ${idFile ? "active" : ""}`}>
            <div className="icon-circle">ID</div>
            <span>ID</span>
          </div>
          <div className={`kyc-popup-step ${addressFile ? "active" : ""}`}>
            <div className="icon-circle">Address</div>
            <span>Address</span>
          </div>
          <div className={`kyc-popup-step ${selfieFile ? "active" : ""}`}>
            <div className="icon-circle">Selfie</div>
            <span>Selfie</span>
          </div>
        </div>

        {/* Body */}
        <div className="kyc-popup-body">
          {/* ID Upload */}
          <div className="kyc-popup-section">
            <div className="kyc-popup-section-header">
              <FaRegIdCard className="kyc-popup-icon" />
              <div>
                <h4>Government-Issued ID</h4>
                <p>Driver’s license, passport, or national ID card</p>
              </div>
            </div>
            <label className="kyc-popup-upload">
              <IoIosCloudUpload className="upload-icon" />
              <span>{idFile ? idFile.name : "Click to upload"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "id")}
                hidden
              />
            </label>
          </div>

          {/* Address Upload */}
          <div className="kyc-popup-section">
            <div className="kyc-popup-section-header">
              <MdHome className="kyc-popup-icon" />
              <div>
                <h4>Proof of Address</h4>
                <p>Utility bill, bank statement, or lease (max 3 months old)</p>
              </div>
            </div>
            <label className="kyc-popup-upload">
              <IoIosCloudUpload className="upload-icon" />
              <span>{addressFile ? addressFile.name : "Click to upload"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "address")}
                hidden
              />
            </label>
          </div>

          {/* Selfie Upload */}
          <div className="kyc-popup-section">
            <div className="kyc-popup-section-header">
              <MdOutlineCameraAlt className="kyc-popup-icon" />
              <div>
                <h4>Upload selfie with ID</h4>
                <p>Take a photo holding your ID next to your face</p>
              </div>
            </div>
            <label className="kyc-popup-upload">
              <IoIosCloudUpload className="upload-icon" />
              <span>{selfieFile ? selfieFile.name : "Click to upload"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "selfie")}
                hidden
              />
            </label>
          </div>

          {/* Guidelines */}
          <div className="kyc-popup-guidelines">
            <div className="kyc-popup-guidelines-header">
              <IoInformationCircleOutline className="guidelines-icon" />
              <h4>Important Guidelines:</h4>
            </div>
            <ul>
              <li>All documents must be clear and readable</li>
              <li>Ensure your full name and address are visible</li>
              <li>Documents should not be expired</li>
              <li>File size should not exceed 10MB</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="btn-kyc-wrapper-hold">
            <button
              type="button"
              className="upload-btn-pop"
              style={{
                background: allUploaded
                  ? "linear-gradient(135deg, #a78bfa, #8b5cf6)"
                  : "#ccc",
                cursor: allUploaded ? "pointer" : "not-allowed",
              }}
              disabled={!allUploaded || loading}
              onClick={handleSubmit}
            >
              {loading ? "Uploading..." : <><LuDownload style={{ fontSize: "1rem" }} /> Submit for Verification</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycPopupModel;
