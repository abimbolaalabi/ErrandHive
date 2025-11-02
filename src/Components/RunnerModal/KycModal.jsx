import React from 'react';
import styled from 'styled-components';

const KycModal = () => {
//   if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <KycMessage>
          <BoldText>Your KYC is under review.</BoldText>
          <br />
          <NormalText>you'll be notified as soon as it's verified.</NormalText>
        </KycMessage>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default KycModal;


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
    background-color: #f7f7ff; 
    width: 90%;
    max-width: 400px; 
    padding: 40px 30px;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid #e0e0e0;
`;

const KycMessage = styled.p`
    text-align: center;
    line-height: 1.4;
    font-size: 1.3em;
    color: #333;
    margin: 0; 
    font-weight:500;
    font-family: Poppins;
    font-style: Medium;
`;

const BoldText = styled.span`
    font-weight:500;
font-family: Poppins;
font-style: Medium;
font-size: 31px;
`;

const NormalText = styled.span`
    font-weight: 400;
    font-weight:500;
font-family: Poppins;
font-style: Medium;
font-size: 31px;
`;