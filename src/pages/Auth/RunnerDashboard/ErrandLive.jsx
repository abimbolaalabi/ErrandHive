import React from "react";
import "./ErrandLive.css";
import { FaBell, FaUserCircle, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaComments, FaPaperPlane } from "react-icons/fa";

const ErrandLive = () => {
  return (
    <div className="errandLive-container">
      <header className="errandLive-header">
        <div className="errandLive-logo">ErrandLive</div>
        <div className="errandLive-headerRight">
          <FaBell className="errandLive-icon" />
          <div className="errandLive-user">
            <FaUserCircle size={32} />
            <span>John Doe</span>
          </div>
        </div>
      </header>

      <div className="errandLive-breadcrumb">
        <span>◄ Back to my errands</span>
      </div>

      <div className="errandLive-main">
        <div className="errandLive-pickupSection">
          <h2>Pickup Document</h2>
          <div className="errandLive-taskItem">
            <FaMapMarkerAlt className="errandLive-taskIcon" />
            <div>
              <p>Pickup from</p>
              <strong>123 Main Street, New York</strong>
            </div>
          </div>
          <div className="errandLive-taskItem">
            <FaMapMarkerAlt className="errandLive-taskIcon" />
            <div>
              <p>Deliver to</p>
              <strong>456 Elm Street, Brooklyn</strong>
            </div>
          </div>
          <div className="errandLive-taskItem">
            <FaClock className="errandLive-taskIcon" />
            <div>
              <p>Estimated arrival</p>
              <strong>30 mins</strong>
            </div>
          </div>
          <div className="errandLive-price">
            <FaMoneyBillWave />
            <span>$3,00</span>
          </div>
        </div>

        <div className="errandLive-content">
          <div className="errandLive-clientCard">
            <h3>Client</h3>
            <div className="errandLive-clientInfo">
              <div className="errandLive-clientAvatar">JD</div>
              <div className="errandLive-clientDetails">
                <strong>John Doe</strong>
                <button className="errandLive-chatBtn">
                  <FaComments /> Chat with Client
                </button>
              </div>
            </div>
            <button className="errandLive-startBtn">Start journey to pickup</button>
          </div>

          <div className="errandLive-progressCard">
            <h3>Delivery Progress</h3>
            <div className="errandLive-progressSteps">
              <div className="errandLive-step completed">
                <div className="errandLive-stepCircle done">✓</div>
                <div className="errandLive-stepLabel">
                  <strong>Order accepted</strong>
                  <span>2 mins ago</span>
                </div>
              </div>
              <div className="errandLive-step active">
                <div className="errandLive-stepCircle current"></div>
                <div className="errandLive-stepLabel">
                  <strong>Delivery location secured</strong>
                  <span>10:30am - 10:40am</span>
                </div>
              </div>
              <div className="errandLive-step">
                <div className="errandLive-stepCircle"></div>
              </div>
              <div className="errandLive-step">
                <div className="errandLive-stepCircle"></div>
              </div>
              <div className="errandLive-step">
                <div className="errandLive-stepCircle"></div>
              </div>
              <div className="errandLive-step">
                <div className="errandLive-stepCircle"></div>
                <span className="errandLive-finalLabel">Package delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrandLive;