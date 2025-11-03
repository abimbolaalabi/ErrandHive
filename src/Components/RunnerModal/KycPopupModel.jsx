import React from 'react';
import "./Kycpopup.css";

const KycPopupModel = ({close}) => {
  return (
    <div className='kyc-modal-wrapper'>
      <div className='kyc-modal'>
        <div className='kyc-header-wrapper'>
          <div className='kyc-text'>
          <h1>Kyc Verification </h1>
                    <p>Upload the required document to verify your identity </p>
                    </div>
          <button className = "btn-kyc-modal"onClick={()=> close(false)}>X</button>
        </div>
        <div className='body-verify-input'>

        </div>
      </div>
    </div>
  );
};

export default KycPopupModel;