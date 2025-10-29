import React, { useState } from 'react';
import './MyErrandPage.css';
import ModalErrand from '../../Components/ModalErrand/ModalErrand';

const MyErrandsPage = () => {
  const [errandmod, setErrandMod] = useState(false)
  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <div>
          <h1 className="welcome-title">My Errands</h1>
          <p className="welcome-subtitle">
            Manage your errands.
          </p>
        </div>
         <button onClick={()=> setErrandMod(true)}>+ <span>New Errand</span></button>
      </div>

      <div className="no-errands-section">
        <div className="no-errands-content">
          <div className="no-errands-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </div>

          <h2 className="no-errands-title">No errands posted yet</h2>
          <p className="no-errands-subtitle">
            Start by posting your first errand.
          </p>
          <button className="kyc-button">Post Errand</button>
        </div>
      </div>
     {errandmod && (<ModalErrand toclose={setErrandMod}/>)} 
    </div>
  );
};

export default MyErrandsPage;
