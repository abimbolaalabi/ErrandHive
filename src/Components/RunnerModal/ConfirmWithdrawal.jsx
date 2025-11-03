import React from 'react';
import styled from 'styled-components';
import { IoShieldOutline } from "react-icons/io5";

const ConfirmWithdrawal = () => {

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>Confirm Withdrawal</HeaderTitle>
          <HeaderSubtitle>Review your withdrawal details</HeaderSubtitle>
          <CloseButton>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <YoureWithdrawing>You're withdrawing</YoureWithdrawing>
          <WithdrawalAmount>₦1,000</WithdrawalAmount> 
          <Divider />

        
          <DetailsRow>
            <DetailItem>
              <IconWrapper> 🏦 </IconWrapper> 
              <TextContent>
                <DetailLabel>To Bank Account</DetailLabel>
                <DetailValue>Access Bank •••• 8901</DetailValue>
              </TextContent>
            </DetailItem>
          </DetailsRow>

          <DetailsRow>
            <DetailItem>
              <IconWrapper> ₦ </IconWrapper> 
              <TextContent>
                <DetailLabel>Total Deduction</DetailLabel>
                <DetailValue>₦1,000</DetailValue> 
              </TextContent>
            </DetailItem>
          </DetailsRow>
        </ModalBody>

        <SecurityNotice>
          <LockIcon /> < IoShieldOutline style={{fontSize:"1.5rem"}}/>
          Your transaction is secured with bank-level encryption
        </SecurityNotice>

        <ModalFooter>
          <BackButton>Back</BackButton>
          <ConfirmButton>Confirm Withdrawal</ConfirmButton>
        </ModalFooter>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ConfirmWithdrawal;


const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4); 
    z-index: 9999; 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    width: 90%;
    max-width: 700px; 
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
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
    padding: 20px 30px 0;
    text-align: center;
`;

const YoureWithdrawing = styled.p`
    font-size: 20px;
    color: #4A5565;
    margin: 0 0 5px 0;
`;

const WithdrawalAmount = styled.h1`
    font-size: 2em;
    font-weight: 400;
    font-style: Regualar;
    color: #212121;
    margin: 0 0 20px 0;
`;

const Divider = styled.div`
    border-top: 1px solid #eee;
    margin: 0 0 20px 0;
`;

const DetailsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
`;

const IconWrapper = styled.span`
    font-size: 1.5em;
    margin-right: 15px;
    color: #666;
    background: #f0f0f0;
    padding: 8px;
    border-radius: 8px;
`;

const TextContent = styled.div`
    text-align: left;
`;

const DetailLabel = styled.p`
    font-size: 0.85em;
    color: #666;
    margin: 0;
`;

const DetailValue = styled.p`
    font-size: 1em;
    font-weight: 600;
    color: #333;
    margin: 2px 0 0 0;
`;

const SecurityNotice = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9em;
    gap:1rem;
    color: #8A2BE2;
    background-color:#8A2BE21A; 
    padding: 15px 30px;
    margin: 20px 30px 0;
    border-radius: 8px;
    font-weight: 500;
`;

const LockIcon = styled.span`
    font-size: 1.2em;
    margin-right: 10px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px;
    gap: 15px;
`;

const BaseButton = styled.button`
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    flex: 1;
    transition: background-color 0.2s;
`;

const BackButton = styled(BaseButton)`
    background-color: transparent;
    color: #666;
    border: 1px solid #ccc;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ConfirmButton = styled(BaseButton)`
    background-color: #8133F1;
    color: white;
    border: none;
    border-radius: 9px;

    /* &:hover { */
        /* background-color: #8A2BE2cc; */
    /* } */
`;