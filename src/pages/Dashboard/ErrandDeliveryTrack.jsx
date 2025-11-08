import React from 'react';
import './ErrandDeliveryTrack.css'; // We'll include CSS inline below

const ErrandDeliveryTrack = () => {
  return (
<div className="errand-delivery-containerr">
      {/* Runner Card */}
      <div className="rrunner-card">
        <div className="rrunner-info">
          <div className="rrunner-avatar">
            <span className="avatar-initials">JD</span>
          </div>
          <div className="rrunner-details">
            <h2 className="rrunner-name">John Doe</h2>
            <div className="rrunner-badge">Verified Runner</div>
            <div className="rrunner-stats">
              <span className="rrating">★ 4.8</span>
              <span className="deliverries">156 Deliveries</span>
            </div>
          </div>
          <div className="status-badge pending">Pending Pickup</div>
        </div>

    
        <div className="locations-container">
          <div className="location pickup">
            <div className="location-icon">📍</div>
            <div className="location-details">
              <div className="location-label">Pickup Location</div>
              <div className="location-address">123 Main Street, Lagos</div>
            </div>
          </div>
          <div className="location delivery">
            <div className="location-icon">📍</div>
            <div className="location-details">
              <div className="location-label">Delivery Location</div>
              <div className="location-address">456 Oak Avenue, Lekki</div>
            </div>
          </div>
        </div>


        <div className="progress-section">
          <div className="progress-label">
            <span>Overall Progress</span>
            <span className="progress-percent">0%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

    
      <div className="bottom-section">
        <div className="runner-summary">
          <div className="runner-avatar small">
            <span className="avatar-initials">JD</span>
          </div>
          <div className="summary-details">
            <h3 className="runner-name">John Doe</h3>
            <div className="rating">★ 4.8</div>
            <div className="jobs">100 jobs</div>
          </div>
          <button className="chat-button">
            <span className="chat-icon">💬</span> Chat with Runner
          </button>
        </div>

        <div className="delivery-timeline">
          <h3 className="timeline-title">Delivery Progress</h3>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-dot completed"></div>
              <div className="timeline-content">
                <div className="timeline-status">Order assigned</div>
                <div className="timeline-time">Oct 19, 10:00am</div>
              </div>
            </div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrandDeliveryTrack;