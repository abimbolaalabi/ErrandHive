import React, { useState } from 'react';
import { X, Upload, CheckCircle, Home, CreditCard, Camera } from 'lucide-react';

const Modaldashboard = ({ close }) => {
  const [files, setFiles] = useState({
    id: null,
    address: null,
    selfie: null
  });

  const handleFileUpload = (type) => {
    // Simulate file upload
    setFiles(prev => ({ ...prev, [type]: true }));
  };

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
          gap: 0;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          z-index: 1001;
          overflow: hidden;
        }

        .modal-header {
          padding: 24px 24px 16px 24px;
          border-bottom: 1px solid #f0f0f0;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .close-button:hover {
          color: #000;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .modal-subtitle {
          font-size: 14px;
          color: #666;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          padding: 24px 24px 0 24px;
          gap: 8px;
        }

        .step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .step::after {
          content: '';
          position: absolute;
          top: 16px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #e0e0e0;
          z-index: -1;
        }

        .step:last-child::after {
          display: none;
        }

        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
        }

        .step-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
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
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }

        .section-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f5f3ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-icon svg {
          color: #8b5cf6;
        }

        .section-text {
          flex: 1;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .section-description {
          font-size: 13px;
          color: #666;
          line-height: 1.5;
        }

        .upload-button {
          width: 100%;
          padding: 14px;
          border: 1.5px dashed #d0d0d0;
          border-radius: 8px;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .upload-button:hover {
          border-color: #8b5cf6;
          background: #f5f3ff;
          color: #8b5cf6;
        }

        .upload-button svg {
          width: 18px;
          height: 18px;
        }

        .guidelines-box {
          background: #f5f3ff;
          border-radius: 8px;
          padding: 16px;
          margin-top: 24px;
        }

        .guidelines-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #6d28d9;
          margin-bottom: 12px;
        }

        .guidelines-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guidelines-list li {
          font-size: 13px;
          color: #6d28d9;
          margin-bottom: 6px;
          padding-left: 16px;
          position: relative;
        }

        .guidelines-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .guidelines-list li:last-child {
          margin-bottom: 0;
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid #f0f0f0;
        }

        .submit-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }

        @media (max-width: 640px) {
          .modaldash-child {
            width: 95%;
            height: 95vh;
          }

          .progress-steps {
            padding: 16px 16px 0 16px;
          }

          .step-label {
            font-size: 10px;
          }

          .step-icon {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="modaldash-child">
        <div className="modal-header">
          <button className="close-button" onClick={() => close(false)}>
            <X size={24} />
          </button>
          <h2 className="modal-title">KYC Verification</h2>
          <p className="modal-subtitle">Upload the required documents to verify your identity</p>
        </div>

        <div className="progress-steps">
          <div className="step">
            <div className="step-icon">
              <CheckCircle size={16} />
            </div>
            <span className="step-label">ID</span>
          </div>
          <div className="step">
            <div className="step-icon">
              <CheckCircle size={16} />
            </div>
            <span className="step-label">Address</span>
          </div>
          <div className="step">
            <div className="step-icon">
              <CheckCircle size={16} />
            </div>
            <span className="step-label">Selfie</span>
          </div>
        </div>

        <div className="modal-content">
          <div className="upload-section">
            <div className="section-header">
              <div className="section-icon">
                <CreditCard size={20} />
              </div>
              <div className="section-text">
                <h3 className="section-title">Government-issued ID</h3>
                <p className="section-description">Driver's license, passport, or national ID card</p>
              </div>
            </div>
            <button className="upload-button" onClick={() => handleFileUpload('id')}>
              <Upload size={18} />
              Click to upload
            </button>
          </div>

          <div className="upload-section">
            <div className="section-header">
              <div className="section-icon">
                <Home size={20} />
              </div>
              <div className="section-text">
                <h3 className="section-title">Proof of Address</h3>
                <p className="section-description">Utility bill, bank statement, or lease agreement (max 3 months old)</p>
              </div>
            </div>
            <button className="upload-button" onClick={() => handleFileUpload('address')}>
              <Upload size={18} />
              Click to upload
            </button>
          </div>

          <div className="upload-section">
            <div className="section-header">
              <div className="section-icon">
                <Camera size={20} />
              </div>
              <div className="section-text">
                <h3 className="section-title">Selfie with ID</h3>
                <p className="section-description">Take a photo of yourself holding your ID next to your face</p>
              </div>
            </div>
            <button className="upload-button" onClick={() => handleFileUpload('selfie')}>
              <Upload size={18} />
              Click to upload
            </button>
          </div>

          <div className="guidelines-box">
            <div className="guidelines-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              Important Guidelines:
            </div>
            <ul className="guidelines-list">
              <li>All documents must be clear and readable</li>
              <li>Ensure your full name and address are visible</li>
              <li>Documents should not be expired</li>
              <li>File size should not exceed 10MB</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="submit-button">
            <Upload size={18} />
            Submit for Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modaldashboard;