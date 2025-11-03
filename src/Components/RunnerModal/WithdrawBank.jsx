import React, { useState } from 'react';
import styled from 'styled-components';

const WithdrawBank = () => {
  const [availableBalance] = useState(12750);
  const [withdrawAmount, setWithdrawAmount] = useState(""); 

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>Withdraw to Bank</HeaderTitle>
          <HeaderSubtitle>
            Transfer funds from your wallet to your bank account
          </HeaderSubtitle>
          <CloseButton>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <BalanceContainer>
            <BalanceText>Available Balance</BalanceText>
            <BalanceDisplay>
              ₦{availableBalance.toLocaleString()}
              <NairaIcon>₦</NairaIcon>
            </BalanceDisplay>
          </BalanceContainer>

          <WithdrawalInputLabel>Withdrawal Amount</WithdrawalInputLabel>
          <WithdrawalInput
            type="text"
            placeholder="0.00"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />

          <WarningNotice>
            <WarningIcon>!</WarningIcon>
            Minimum withdrawal is ₦1,000.00.
          </WarningNotice>

          <ContinueButton>Continue</ContinueButton>
        </ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default WithdrawBank;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 25px 30px 15px;
  position: relative;
  border-bottom: 1px solid #eee;
`;

const HeaderTitle = styled.h3`
  font-size: 1.4em;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.9em;
  color: #666;
  margin: 5px 0 0 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 30px;
  background: none;
  border: none;
  font-size: 1.5em;
  color: #999;
  cursor: pointer;
  padding: 0;
`;

const ModalBody = styled.div`
  padding: 20px 30px 30px;
`;

const BalanceContainer = styled.div`
  background-color: #8A2BE21A; 
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border: 1px solid #8A2BE2; 
`;

const BalanceText = styled.p`
  font-size: 0.9em;
  color: #666;
  margin: 0;
`;

const BalanceDisplay = styled.div`
  font-size: 1.2em;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
`;

const NairaIcon = styled.span`
  background-color: #8A2BE2; 
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  margin-left: 10px;
`;

const WithdrawalInputLabel = styled.p`
  font-size: 0.9em;
  color: #333;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const WithdrawalInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const WarningNotice = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #8A2BE2;
  background-color: #F2EBFE; 
  padding: 10px 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  font-weight: 500;
  min-height: 4rem;
`;

const WarningIcon = styled.span`
  font-size: 1.2em;
  margin-right: 10px;
`;

const ContinueButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #8A2BE2; 
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8A2BE2cc;
  }
`;
