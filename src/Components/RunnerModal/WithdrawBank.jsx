// import React, { useState } from "react";
// import "./WithdrawBank.css";
// import { FaNairaSign } from "react-icons/fa6";
// import { IoInformationCircleOutline } from "react-icons/io5";
// import ConfirmWithdrawal from "./ConfirmWithdrawal";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const WithdrawBank = ({ close, availableBalance }) => {
//   const [amount, setAmount] = useState("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showProcessing, setShowProcessing] = useState(false);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     if (/^\d*\.?\d*$/.test(value)) setAmount(value);
//   };

//   const handleContinue = () => {
//     const numericAmount = parseFloat(amount);

//     if (!numericAmount || numericAmount < 1000) {
//       toast.error("Minimum withdrawal is ₦1,000.00");
//       return;
//     }

//     if (numericAmount > availableBalance) {
//       toast.error("Insufficient funds for this withdrawal");
//       return;
//     }

//     setShowConfirm(true);
//   };

//   const handleConfirm = () => {
//     setShowConfirm(false);
//     setShowProcessing(true);
//   };

//   return (
//     <>
//       <div className="wd-overlay">
//         <div className="wd-box">
          
//           <div className="wd-header">
//             <h3 className="wd-title">Withdraw to Bank</h3>
//             <button className="wd-close-btn" onClick={() => close(false)}>x</button>
//           </div>

//           <p className="wd-subtitle">
//             Transfer funds from your wallet to your bank account
//           </p>

//           <div className="wd-balance-card">
//             <div>
//               <p className="wd-balance-label">Available Balance</p>
//               <h2 className="wd-balance-amount">₦{availableBalance.toLocaleString()}</h2>
//             </div>
//             <div className="wd-balance-icon">
//               <FaNairaSign />
//             </div>
//           </div>

//           <div className="wd-input-section">
//             <label htmlFor="wd-input">Withdrawal Amount</label>
//             <input
//               id="wd-input"
//               type="text"
//               placeholder="₦ 0.00"
//               value={amount}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="wd-info">
//             <IoInformationCircleOutline className="wd-info-icon" />
//             <p>Minimum withdrawal is ₦1,000.00.</p>
//           </div>

//           <button className="wd-continue-btn" onClick={handleContinue}>
//             Continue
//           </button>
//         </div>
//       </div>

//       {showConfirm && (
//         <ConfirmWithdrawal
//           close={setShowConfirm}
//           amount={amount}
//           openSuccess={handleConfirm}
//         />
//       )}

//       <ToastContainer />
//     </>
//   );
// };

// export default WithdrawBank;
