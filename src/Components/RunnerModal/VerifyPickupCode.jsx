import React from 'react';
import './Verifypickup.css'; 

const VerifyPickupCode = () => {


    return (
        <div className="modal-overlay">
            
            <div className="modal-content">
                
                <div className="modal-header">
                    <h2>Verify Pickup Code</h2>
                    <button className="close-btn">&times;</button>
                </div>

                <div className="modal-body">
                    <p>Enter the code provided by the customer.</p>
                
                    <div className="code-inputs">
                        <input type="text" maxLength="1" className="code-box" />
                        <input type="text" maxLength="1" className="code-box" />
                        <input type="text" maxLength="1" className="code-box" />
                        <input type="text" maxLength="1" className="code-box" />
                    </div>
                </div>

    
                <div className="modal-footer">
                    <button className="verify-btn">Verify code</button>
                </div>
            </div>
        </div>
    );
};

export default VerifyPickupCode;
