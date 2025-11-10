// import React, { useState } from "react";
// import styled from "styled-components";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const WithdrawBank = ({ close, availableBalance }) => {
//   const [withdrawAmount, setWithdrawAmount] = useState({
//     amount: "",
//     bankDetailsId: "",
//     narration: "",
//   });
//   const token = JSON.parse(localStorage.getItem("userToken"));
//   const BaseUrl = import.meta.env.VITE_BASE_URL;
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     const regex = /^\d*\.?\d*$/;

//     if (regex.test(value)) {
//       setWithdrawAmount(value);
//     }
//   };

//   const handleContinue = async (e) => {
//     e.preventDefault();
//     const amount = parseFloat(withdrawAmount);

//     if (!withdrawAmount || !bankDetails || !narration) {
//       toast.error("Please fill in all fields.");
//     } else if (isNaN(amount)) {
//       toast.error("Invalid amount.");
//     } else if (amount < 1000) {
//       toast.error("Minimum withdrawal is ₦1,000.00.");
//     } else if (amount > availableBalance) {
//       toast.error("Insufficient balance.");
//     } else {
//       try {
//         const res = await axios.post(
//           `${BaseUrl}/payment/wallet/withdraw`,
//           withdrawAmount,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(res);
//       } catch (err) {
//         toast.error("Something went wrong, please try again.");
//       }
//       toast.success(
//         `You have successfully withdrawn ₦${amount.toLocaleString()}`
//       );
//       setWithdrawAmount("");
//       setBankDetails("");
//       setNarration("");
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//       <ModalBackdrop>
//         <ModalContent>
//           <ModalHeader>
//             <HeaderTitle>Withdraw to Bank</HeaderTitle>
//             <HeaderSubtitle>
//               Transfer funds from your wallet to your bank account
//             </HeaderSubtitle>
//             <CloseButton onClick={() => close(false)}>&times;</CloseButton>
//           </ModalHeader>

//           <ModalBody>
//             <BalanceContainer>
//               <BalanceText>Available Balance</BalanceText>
//               <BalanceDisplay>
//                 ₦{availableBalance.toLocaleString()}
//                 <NairaIcon>₦</NairaIcon>
//               </BalanceDisplay>
//             </BalanceContainer>

//             <WithdrawalInputLabel>Withdrawal Amount</WithdrawalInputLabel>
//             <WithdrawalInput
//               type="text"
//               placeholder="0.00"
//               value={withdrawAmount}
//               onChange={handleInputChange}
//             />

//             <WithdrawalInputLabel>Bank Details</WithdrawalInputLabel>
//             <WithdrawalInput
//               type="text"
//               placeholder="Enter bank name and account number"
//               value={bankDetails}
//               onChange={(e) => setBankDetails(e.target.value)}
//             />

//             <WithdrawalInputLabel>Narration</WithdrawalInputLabel>
//             <WithdrawalInput
//               type="text"
//               placeholder="Enter narration"
//               value={narration}
//               onChange={(e) => setNarration(e.target.value)}
//             />

//             <WarningNotice>
//               <WarningIcon>!</WarningIcon>
//               Minimum withdrawal is ₦1,000.00.
//             </WarningNotice>

//             <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
//           </ModalBody>
//         </ModalContent>
//       </ModalBackdrop>
//     </>
//   );
// };

// export default WithdrawBank;

// /* --- Styled Components --- */

// const ModalBackdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 9999;
// `;

// const ModalContent = styled.div`
//   background-color: #fff;
//   width: 90%;
//   max-width: 700px;
//   max-height: 85vh;
//   border-radius: 12px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
// `;

// const ModalHeader = styled.div`
//   padding: 25px 30px 15px;
//   position: sticky;
//   top: 0;
//   background-color: #fff;
//   border-bottom: 1px solid #eee;
//   z-index: 10;
// `;

// const HeaderTitle = styled.h3`
//   font-size: 1.4em;
//   font-weight: 700;
//   color: #333;
//   margin: 0;
// `;

// const HeaderSubtitle = styled.p`
//   font-size: 0.9em;
//   color: #666;
//   margin: 5px 0 0 0;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 25px;
//   right: 30px;
//   background: none;
//   border: none;
//   font-size: 1.5em;
//   color: #999;
//   cursor: pointer;
// `;

// const ModalBody = styled.div`
//   padding: 20px 30px 30px;
// `;

// const BalanceContainer = styled.div`
//   background-color: #8a2be21a;
//   padding: 15px 20px;
//   border-radius: 8px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 25px;
//   border: 1px solid #8a2be2;
// `;

// const BalanceText = styled.p`
//   font-size: 0.9em;
//   color: #666;
// `;

// const BalanceDisplay = styled.div`
//   font-size: 1.2em;
//   font-weight: 700;
//   color: #333;
//   display: flex;
//   align-items: center;
// `;

// const NairaIcon = styled.span`
//   background-color: #8a2be2;
//   color: white;
//   width: 25px;
//   height: 25px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 0.8em;
//   margin-left: 10px;
// `;

// const WithdrawalInputLabel = styled.p`
//   font-size: 0.9em;
//   color: #333;
//   font-weight: 600;
//   margin: 0 0 8px 0;
// `;

// const WithdrawalInput = styled.input`
//   width: 100%;
//   padding: 12px 15px;
//   font-size: 1.1em;
//   color: #333;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin-bottom: 20px;

//   &:focus {
//     border-color: #8a2be2;
//     outline: none;
//   }
// `;

// const WarningNotice = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 0.9em;
//   color: #8a2be2;
//   background-color: #f2ebfe;
//   padding: 10px 25px;
//   border-radius: 8px;
//   margin-bottom: 30px;
//   font-weight: 500;
//   min-height: 4rem;
// `;

// const WarningIcon = styled.span`
//   font-size: 1.2em;
//   margin-right: 10px;
// `;

// const ContinueButton = styled.button`
//   width: 100%;
//   padding: 15px;
//   background-color: #8a2be2;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 1.1em;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #6e1ac8;
//   }
// `;
