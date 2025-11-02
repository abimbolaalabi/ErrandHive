import React, { useState } from 'react';
import './MyErrandPage.css';
import ModalErrand from '../../Components/ModalErrand/ModalErrand';
import { CiLocationOn, CiClock1 } from "react-icons/ci";
import { BsClock } from 'react-icons/bs';


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
        <button onClick={() => setErrandMod(true)}> <span>+ New Errand</span></button>
      </div>



      <h3 className="recent-title">Recent Errands</h3>

      <div className="recent-card">
  <div className="recent-header">
    <h4>Pickup Document</h4>
    <span className="status-badge">Pending</span>
  </div>

  <div className="pickup-delivery-row">
    {/* Pickup Section */}
    <div className="pickup-section">
      <p className="icon-text">
        <CiLocationOn size={18} /> <span className="label">Pickup</span>
      </p>
      <p className="address">40 Muyibi street</p>
    </div>

    {/* Delivery Section */}
    <div className="delivery-section">
      <p className="icon-text">
        <CiLocationOn size={18} /> <span className="label">Delivery</span>
      </p>
      <p className="address">50 Kirikiri road</p>
    </div>
  </div>

  <div className="recent-footer">
    <p className="date">
      <BsClock size={17} /> 20/10/2025
    </p>
    <p className="price">₦3,000</p>

    <button className="details-btn">View Details</button>
  </div>
</div>



      {errandmod && (<ModalErrand toclose={setErrandMod} />)}
    </div>
  );
};

export default MyErrandsPage;
{/* <div className="no-errands-section">
  
      </div> */}

{/* <div className="no-errands-content">
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
        </div> */}