import React from 'react'
import "./ErrandDeliveryTrack.css"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import {
  ChevronLeft,
  MapPin,
  Star,
  MessageSquare,
} from "lucide-react";

const ErrandDeliveryTrack = () => {
    const {errandId, errandTrack} = useParams()
      const nav = useNavigate();

        const steps = [
    { id: 1, status: "Order assigned", time: "Oct 18, 10:00am", done: true },
    { id: 2, status: "Runner departed", time: null, done: false },
    { id: 3, status: "Arrived at pickup", time: null, done: false },
    { id: 4, status: "Picked up document", time: null, done: false },
    { id: 5, status: "In transit to delivery", time: null, done: false },
    { id: 6, status: "Arrived at delivery", time: null, done: false },
    { id: 7, status: "Document delivered", time: null, done: false },
    { id: 8, status: "Confirmed by client", time: null, done: false },
  ];

  return (
    <div className="dp-root">
      <div className="dp-container">

        {/* Back link */}
        <button className="dp-back" onClick={() => nav(-1)}>
          <HiOutlineArrowLeft size={18} />
          Back to my errands
        </button>

        {/* Main runner card */}
        <div className="dp-card dp-main-card">
          <div className="dp-runner-row">
            <div className="dp-runner-left">
              <div className="dp-avatar">JD</div>
              <div className="dp-runner-info">
                <h2 className="dp-runner-name">John Doe</h2>
                <div className="dp-badges-row">
                  <span className="dp-badge dp-badge-green">Verified Runner</span>
                  <span className="dp-sep">•</span>
                  <span className="dp-meta">⭐ 4.8 Rating</span>
                  <span className="dp-sep">•</span>
                  <span className="dp-meta">156 Deliveries</span>
                </div>
              </div>
            </div>

            <div className="dp-status-wrap">
              <span className="dp-badge dp-badge-yellow">Pending Pickup</span>
            </div>
          </div>

          <div className="dp-locations-row">
            <div className="dp-location-box dp-pickup">
              <span className="dp-location-dot dp-dot-yellow" />
              <div>
                <div className="dp-location-label">Pickup</div>
                <div className="dp-location-text">123 Main Street, Lagos</div>
              </div>
            </div>

            <div className="dp-location-box dp-delivery">
              <span className="dp-location-dot dp-dot-purple" />
              <div>
                <div className="dp-location-label">Delivery</div>
                <div className="dp-location-text">456 Oak Avenue, Lekki</div>
              </div>
            </div>
          </div>

          <div className="dp-progress-head">
            <span className="dp-progress-label">Overall Progress</span>
            <span className="dp-progress-perc">0%</span>
          </div>
          <div className="dp-progress">
            <div className="dp-progress-fill" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Two-column section */}
        <div className="dp-row">
          {/* Mini runner card */}
          <div className="dp-card dp-mini-card">
            <div className="dp-mini-top">
              <div className="dp-avatar dp-avatar-sm">JD</div>
              <div>
                <div className="dp-mini-name">John Doe</div>
                <div className="dp-mini-meta">
                  <span>⭐ 4.8</span>
                  <span className="dp-sep">•</span>
                  <span>100 jobs</span>
                </div>
              </div>
            </div>
            <button className="dp-chat-btn">Chat with Runner</button>
          </div>

          {/* Timeline */}
          <div className="dp-card dp-timeline-card">
            <h3 className="dp-card-title">Delivery Progress</h3>

            <div className="dp-timeline">
              {/* Step 1 active */}
              <div className="dp-step">
                <div className="dp-step-dot dp-step-dot-active" />
                <div className="dp-step-content">
                  <div className="dp-step-title">Order assigned</div>
                  <div className="dp-step-time">Oct 19, 10:00am</div>
                </div>
              </div>

              {/* Remaining steps (placeholders for visual) */}
              <div className="dp-step">
                <div className="dp-step-dot" />
              </div>
              <div className="dp-step">
                <div className="dp-step-dot" />
              </div>
              <div className="dp-step">
                <div className="dp-step-dot" />
              </div>
              <div className="dp-step">
                <div className="dp-step-dot" />
              </div>
              <div className="dp-step">
                <div className="dp-step-dot" />
              </div>
              <div className="dp-step">
                <div className="dp-step-dot" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ErrandDeliveryTrack
