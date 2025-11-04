import React, { useState } from 'react';
import './MyErrandPage.css';
import ModalErrand from '../../Components/ModalErrand/ModalErrand';
import { CiLocationOn, CiClock1 } from "react-icons/ci";
import { BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const MyErrandsPage = () => {
  const [errandmod, setErrandMod] = useState(false)


  return (
    <div className="dashboard-page">
      <div className="welcome-seection">
        <div>
          <h1 className="welcome-title">My Errands</h1>
          <p className="welcome-subtitle">
            Manage your errands.
          </p>
        </div>
        <button onClick={() => setErrandMod(true)}> <span>+  New Errand</span></button>
      </div>


      <div className="recent-card">
        <div className="recent-header">
          <h4>Pickup Document</h4>
          <span className="status-badge">Pending</span>
        </div>

        <div className="pickup-delivery-row">
          {/* Pickup Section */}
          <div className="pickup-section">
            <p className="icon-text">
              <CiLocationOn size={18} /> <span className="label">Pickup</span>
            </p>
            <p className="address">40 Muyibi street</p>
          </div>

          {/* Delivery Section */}
          <div className="delivery-section">
            <p className="icon-text">
              <CiLocationOn size={18} /> <span className="label">Delivery</span>
            </p>
            <p className="address">50 Kirikiri road</p>
          </div>
        </div>

        <div className="recent-footer">
          <p className="date">
            <BsClock size={17} /> 20/10/2025
          </p>
          <p className="price">₦3,000</p>

          <button className="details-btn"><Link className='link' to={`/dashboard/my-errands/Id`}>View Details</Link></button>
        </div>
      </div>



      {errandmod && (<ModalErrand toclose={setErrandMod} />)}
    </div>
  );
};

export default MyErrandsPage;
{/* <div className="no-errands-section">
  
      </div> */}

{/* <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </div>

          <h2 className="no-errands-title">No errands posted yet</h2>
          <p className="no-errands-subtitle">
            Start by posting your first errand.
          </p>
          <button className="kyc-button">Post Errand</button>
        </div> */}

// import React, { useState } from "react";
// import axios from "axios";
// import { X, CheckCircle, Home, CreditCard, Camera } from "lucide-react";
// import { LuDownload } from "react-icons/lu";
// import { toast } from "react-toastify";
// import "./Modaldashboard.css";

// const Modaldashboard = ({ close }) => {
//   const [files, setFiles] = useState({
//     id: null,
//     address: null,
//     selfie: null,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFiles((prev) => ({ ...prev, [type]: file }));
//     }
//   };

//   const completedSteps = [!!files.id, !!files.address, !!files.selfie];
//   const isSubmitEnabled = completedSteps.every(Boolean);

//   const handleSubmit = async () => {
//     if (!isSubmitEnabled) return;

//     try {
//       setLoading(true);

//       const user = JSON.parse(localStorage.getItem("userDetails"));
//       const token = localStorage.getItem("userToken");

//       if (!user || !token) {
//         toast.error("User not logged in");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("governmentIdCard", files.id);
//       formData.append("proofOfAddressImage", files.address);
//       formData.append("selfieWithIdCard", files.selfie);

//       const res = await axios.post(
//         "https://errandhive-project.onrender.com/api/v1/kyc/submit",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(res?.data?.message || "KYC submitted successfully!");
//       localStorage.setItem("userKyc", "true");
//       setTimeout(() => close(false), 800);
//     } catch (err) {
//       console.log("KYC Submit Error:", err.response?.data || err.message);
//       toast.error(err?.response?.data?.message || "Failed to submit KYC");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="kyc-overlay">
//       <div className="kyc-modal">
//         <div className="kyc-header">
//           <h2>KYC Verification</h2>
//           <p>Upload the required documents to verify your identity</p>
//           <button className="kyc-close" onClick={() => close(false)}>
//             <X size={22} />
//           </button>
//         </div>

//         <div className="kyc-steps">
//           {["ID", "Address", "Selfie"].map((label, index) => (
//             <div className="kyc-step" key={index}>
//               <div className={`kyc-step-icon ${completedSteps[index] ? "done" : ""}`}>
//                 <CheckCircle size={16} />
//               </div>
//               <span>{label}</span>
//               {index < 2 && (
//                 <div className={`kyc-step-line ${completedSteps[index] ? "active" : ""}`} />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="kyc-body">

//           {/* Government ID */}
//           <div className="kyc-upload-card">
//             <div className="kyc-card-top">
//               <div className="kyc-card-icon"><CreditCard size={22} /></div>
//               <div className="kyc-card-text">
//                 <h3>Government-Issued ID</h3>
//                 <p>Driver's license, passport, or national ID card</p>
//               </div>
//             </div>

//             <label className="kyc-upload-btn">
//               <input
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(e) => handleFileChange(e, "id")}
//               />
//               <span className="kyc-upload-icon"><LuDownload/></span>
//               {files.id ? files.id.name : "Click to upload"}
//             </label>
//           </div>

//           {/* Proof of Address */}
//           <div className="kyc-upload-card">
//             <div className="kyc-card-top">
//               <div className="kyc-card-icon"><Home size={22} /></div>
//               <div className="kyc-card-text">
//                 <h3>Proof of Address</h3>
//                 <p>Utility bill, bank statement, or lease agreement (max 3 months old)</p>
//               </div>
//             </div>

//             <label className="kyc-upload-btn">
//               <input
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(e) => handleFileChange(e, "address")}
//               />
//               <span className="kyc-upload-icon"><LuDownload/></span>
//               {files.address ? files.address.name : "Click to upload"}
//             </label>
//           </div>

//           {/* Selfie */}
//           <div className="kyc-upload-card">
//             <div className="kyc-card-top">
//               <div className="kyc-card-icon"><Camera size={22} /></div>
//               <div className="kyc-card-text">
//                 <h3>Selfie with ID</h3>
//                 <p>Take a photo of yourself holding your ID next to your face</p>
//               </div>
//             </div>

//             <label className="kyc-upload-btn">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, "selfie")}
//               />
//               <span className="kyc-upload-icon"><LuDownload/></span>
//               {files.selfie ? files.selfie.name : "Click to upload"}
//             </label>
//           </div>

//           {/* Guidelines */}
//           <div className="kyc-guidelines">
//             <h4>ℹ️ Important Guidelines:</h4>
//             <ul>
//               <li>All documents must be clear and readable</li>
//               <li>Ensure your full name and address are visible</li>
//               <li>Documents should not be expired</li>
//               <li>File size should not exceed 10MB</li>
//             </ul>
//           </div>
//         </div>

//         <div className="kyc-footer">
//           <button
//             className="kyc-submit-btn"
//             disabled={!isSubmitEnabled || loading}
//             onClick={handleSubmit}
//           >
//             {!loading && <span className="kyc-upload-icon"><LuDownload/></span>}
//             {loading ? "Submitting..." : "Submit for Verification"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modaldashboard;
