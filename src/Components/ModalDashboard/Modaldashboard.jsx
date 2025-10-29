import React, { useState } from 'react';
import { X, CheckCircle, Home, CreditCard, Camera } from 'lucide-react';

const Modaldashboard = ({ close }) => {
  const [files, setFiles] = useState({
    id: null,
    address: null,
    selfie: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const completedSteps = [
    !!files.id,
    !!files.address,
    !!files.selfie,
  ];

  const isSubmitEnabled = completedSteps.every(Boolean);

  return (
    <div className="modaldash-container">
      
      <style>{`
        .modaldash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modaldash-child {
          background-color: #fff;
          width: 40%;
          height: 90%;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #f0f0f0;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 22px;
          right: 22px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .modal-subtitle {
          font-size: 14px;
          color: #666;
        }

     
        .progress-steps {
          display: flex;
          justify-content: space-between;
          padding: 24px;
          gap: 8px;
        }

        .step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          gap: 6px;
        }

        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }

        .step-inactive {
          background: #E4E6EB;
          color: #999;
        }

        .step-completed {
          background: #10b981;
          color: white;
        }

        .step::after {
          content: '';
          position: absolute;
          top: 16px;
          left: 50%;
          width: 100%;
          height: 3px;
          background: #e0e0e0;
          z-index: -1;
        }

        .step:last-child::after {
          display: none;
        }

        .step-completed + .step::after {
          background: #10b981 !important;
        }

        .step-label {
          font-size: 12px;
          font-weight: 500;
          color: #666;
        }

    
        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .upload-section {
          margin-bottom: 24px;
        }

        .section-header {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .section-icon {
          background: #f5f3ff;
          padding: 10px;
          border-radius: 8px;
        }

        .section-icon svg {
          color: #8b5cf6;
        }

        .file-input-label {
          width: 100%;
          padding: 14px;
          border: 1.5px dashed #d0d0d0;
          border-radius: 8px;
          background: #fafafa;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          margin-top: 12px;
          display: flex;
          justify-content: center;
        }

        .file-input-label:hover {
          border-color: #8b5cf6;
          background: #f5f3ff;
          color: #8b5cf6;
        }

        .file-input { display: none; }

      
        .guidelines-box {
          background: #f5f3ff;
          border-radius: 8px;
          padding: 16px;
          margin-top: 24px;
        }

        .guidelines-title {
          font-size: 14px;
          font-weight: 700;
          color: #6d28d9;
          margin-bottom: 10px;
        }

        .guidelines-list li {
          font-size: 13px;
          color: #6d28d9;
          margin-bottom: 6px;
        }

   
        .modal-footer {
          padding: 20px;
          border-top: 1px solid #f0f0f0;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          padding: 14px;
          cursor: pointer;
          transition: 0.3s;
        }

        .submit-button:disabled {
          background: #d3d3d3 !important;
          cursor: not-allowed !important;
          opacity: 0.7;
        }
      `}</style>

      <div className="modaldash-child">
        
    
        <div className="modal-header">
          <button className="close-button" onClick={() => close(false)}>
            <X size={22} />
          </button>
          <h2 className="modal-title">KYC Verification</h2>
          <p className="modal-subtitle">Upload the required documents to verify your identity</p>
        </div>

       
        <div className="progress-steps">
          {["ID", "Address", "Selfie"].map((label, index) => (
            <div className="step" key={index}>
              <div className={`step-icon ${completedSteps[index] ? "step-completed" : "step-inactive"}`}>
                <CheckCircle size={16} />
              </div>
              <span className="step-label">{label}</span>
            </div>
          ))}
        </div>

      
        <div className="modal-content">

          {/* ID Upload */}
          <div className="upload-section">
            <div className="section-header">
              <div className="section-icon"><CreditCard size={20} /></div>
              <div>
                <h3 className="section-title">Government-issued ID</h3>
                <p className="section-description">Driver's License, Passport, or National ID</p>
              </div>
            </div>
            <label className="file-input-label">
              <input type="file" accept="image/*,application/pdf" className="file-input"
                onChange={(e) => handleFileChange(e, "id")}
              />
              {files.id ? files.id.name : "Click to upload"}
            </label>
          </div>

      
          <div className="upload-section">
            <div className="section-header">
              <div className="section-icon"><Home size={20} /></div>
              <div>
                <h3 className="section-title">Proof of Address</h3>
                <p className="section-description">Utility Bill, Bank Statement, or Lease Agreement</p>
              </div>
            </div>
            <label className="file-input-label">
              <input type="file" accept="image/*,application/pdf" className="file-input"
                onChange={(e) => handleFileChange(e, "address")}
              />
              {files.address ? files.address.name : "Click to upload"}
            </label>
          </div>

       
          <div className="upload-section">
            <div className="section-header">
              <div className="section-icon"><Camera size={20} /></div>
              <div>
                <h3 className="section-title">Selfie with ID</h3>
                <p className="section-description">Take a selfie holding your ID</p>
              </div>
            </div>
            <label className="file-input-label">
              <input type="file" accept="image/*" className="file-input"
                onChange={(e) => handleFileChange(e, "selfie")}
              />
              {files.selfie ? files.selfie.name : "Click to upload"}
            </label>
          </div>

      
          <div className="guidelines-box">
            <div className="guidelines-title"> ℹ️ Important Guidelines:</div>
            <ul className="guidelines-list">
              <li>All documents must be clear and readable</li>
              <li>Ensure your full name and address are visible</li>
              <li>Documents should not be expired</li>
              <li>File size should not exceed 10MB</li>
            </ul>
          </div>

        </div>

      
        <div className="modal-footer">
          <button className="submit-button" disabled={!isSubmitEnabled}>
            {isSubmitEnabled ? "Submit for Verification" : "Upload All Required Documents"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modaldashboard;
