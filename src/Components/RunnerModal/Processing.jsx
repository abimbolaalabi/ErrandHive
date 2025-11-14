import React from "react";
import "./Processing.css";

const Processing = ({close}) => {
  return (
    <div className="processing-backdrop"> 
      <div className="processing-content">
        <div className="processing-header">
          <h3 className="processing-header-title">Processing...</h3>
          <p className="processing-header-subtitle">
            Please wait while we process your request
          </p>
          <button className="processing-close-btn" onClick={()=>  close(false)}>&times;</button>
        </div>

        <div className="processing-content-body">
          <div className="processing-icon-circle">
            <span className="processing-currency-symbol">₦</span>
          </div>

          <h4 className="processing-message-title">Processing Withdrawal</h4>
          <p className="processing-message-subtitle">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Processing;
