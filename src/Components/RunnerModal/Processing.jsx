import React from 'react';
import styled from 'styled-components';


const PrimaryPurple = '#8A2BE2'; 

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
    max-width: 450px; 
    padding: 25px 30px; 
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    position: relative;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    font-size: 1.5em;
    color: #999;
    cursor: pointer;
    padding: 0;
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

const ContentBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0;
`;

const IconCircle = styled.div`
    background-color: ${PrimaryPurple};
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    box-shadow: 0 0 0 10px ${PrimaryPurple}1A;
`;

const CurrencySymbol = styled.span`
    color: white;
    font-size: 3em;
    line-height: 1;
`;


const MessageTitle = styled.h4`
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
    margin: 0 0 5px 0;
`;

const MessageSubtitle = styled.p`
    font-size: 0.9em;
    color: #999;
    margin: 0;
`;


const Processing = () => {

  return (
    <ModalBackdrop> 
      <ModalContent>
        <Header>
          <HeaderTitle>Processing...</HeaderTitle>
          <HeaderSubtitle>Please wait while we process your request</HeaderSubtitle>
          <CloseButton>&times;</CloseButton>
        </Header>

        <ContentBody>
          <IconCircle>
            <CurrencySymbol>₦</CurrencySymbol>
          </IconCircle>

          <MessageTitle>Processing Withdrawal</MessageTitle>
          <MessageSubtitle>Please wait...</MessageSubtitle>
        </ContentBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Processing;