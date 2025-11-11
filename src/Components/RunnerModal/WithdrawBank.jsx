import React, { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import ConfirmWithdrawal from "./ConfirmWithdrawal";
import "react-toastify/dist/ReactToastify.css";

const WithdrawBank = ({ close, availableBalance }) => {
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle input: only numbers and decimal
  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/; // only digits and decimal
    if (regex.test(value)) setAmount(value);
  };

  const handleContinue = () => {
    // Parse amount and available balance as numbers
    const amountValue = parseFloat(amount);
    const balanceValue = parseFloat(
      availableBalance.toString().replace(/,/g, "")
    );

    if (!amount || isNaN(amountValue)) {
      toast.error("Enter a valid amount.");
      return;
    }
//console.log("mr josh")

    if (amountValue < 1000) {
      toast.error("Minimum withdrawal is ₦1,000.00.");
      return;
    }
    if (amountValue > balanceValue) {
      toast.error("Insufficient balance.");
      return;
    }

    setShowConfirm(true); // show confirmation modal
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* Step 1: Enter amount */}
      {!showConfirm && (
        <ModalBackdrop>
          <ModalContent>
            <ModalHeader>
              <HeaderTitle>Withdraw to Bank</HeaderTitle>
              <CloseButton onClick={() => close(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <WithdrawalInputLabel>Withdrawal Amount</WithdrawalInputLabel>
              <WithdrawalInput
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={handleInputChange}
              />
              <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
            </ModalBody>
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* Step 2: Confirm withdrawal */}
      {showConfirm && (
        <ConfirmWithdrawal
          amount={amount}
          onBack={() => setShowConfirm(false)}
          onConfirm={() => {
            toast.success(
              `Withdrawal of ₦${parseFloat(amount).toLocaleString()} confirmed!`
            );
            setAmount("");
            close(false);
          }}
        />
      )}
    </>
  );
};

export default WithdrawBank;

/* ---------------- Styled Components ---------------- */
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const WithdrawalInputLabel = styled.label`
  font-weight: 500;
`;

const WithdrawalInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ContinueButton = styled.button`
  padding: 10px;
  font-size: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;
