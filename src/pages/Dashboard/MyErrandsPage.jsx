import React, { useState } from 'react';
import './MyErrandPage.css';
import ModalErrand from '../../Components/ModalErrand/ModalErrand';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';

const MyErrandsPage = () => {
  const [errandmod, setErrandMod] = useState(false)
  const errandsData = [
    {
      id: 1,
      title: "Pickup Document",
      pickup: {
        label: "Pickup",
        address: "40 Muyibli street",
      },
      delivery: {
        label: "Delivery",
        address: "50 Kirikiri road",
      },
      date: "20/10/2025",
      price: "₦3,000",
      status: "Pending",
      buttonText: "View Details",
    },
    {
      id: 2,
      title: "Pickup Document",
      pickup: {
        label: "Pickup",
        address: "40 Muyibli street",
      },
      delivery: {
        label: "Delivery",
        address: "50 Kirikiri road",
      },
      date: "20/10/2025",
      price: "₦3,000",
      status: "Pending",
      buttonText: "View errand status",
    },
  ];
  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <div>
          <h1 className="welcome-title">My Errands</h1>
          <p className="welcome-subtitle">
            Manage your errands.
          </p>
        </div>
        <button onClick={() => setErrandMod(true)}>+ <span>New Errand</span></button>
      </div>

     <div className="errands-list">
        {errandsData.map((item) => (
          <div className="errand-card" key={item.id}>
            <div className="errand-left">
              <h3>{item.title}</h3>

              <div className="errand-pickup">
                <FaLocationDot className="icon" />
                <div>
                  <p className="pickup-label">{item.pickup.label}</p>
                  <p className="pickup-address">{item.pickup.address}</p>
                </div>
              </div>

              <div className="errand-date-price">
                <p><FaRegClock className="icon" /> {item.date}</p>
                <p>{item.price}</p>
              </div>
            </div>

            <div className="errand-right">
              <div className="status-badge">{item.status}</div>
              <div className="errand-delivery">
                <FaLocationDot className="icon" />
                <div>
                  <p className="delivery-label">{item.delivery.label}</p>
                  <p className="delivery-address">{item.delivery.address}</p>
                </div>
              </div>
              <button className="view-btn">{item.buttonText}</button>
            </div>
          </div>
        ))}
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