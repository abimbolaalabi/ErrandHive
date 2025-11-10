import React from "react";
import "./ErrandDeliveryTrack.css";
import { CiLocationOn } from "react-icons/ci";
import { IoCheckmarkCircle } from "react-icons/io5";

const ErrandDeliveryTrack = () => {
  // Dummy runner & job data
  const runner = {
    initials: "JD",
    name: "John Doe",
    rating: 4.8,
    jobs: 100,
    verified: true,
  };

  // Dummy errand/location/status data
  const errand = {
    status: "Pending Pickup",
    pickup: "123 Main Street, Lagos",
    delivery: "456 Oak Avenue, Lekki",
    progress: 0, // %
  };

 
  const steps = [
    { id: 1, label: "Order assigned", time: "Oct 18, 10:00am", done: true },
    { id: 2, label: "Runner departed", time: "", done: false },
    { id: 3, label: "Arrived at pickup", time: "", done: false },
    { id: 4, label: "Picked up item", time: "", done: false },
    { id: 5, label: "On the way", time: "", done: false },
    { id: 6, label: "Arrived at delivery", time: "", done: false },
    { id: 7, label: "Delivered", time: "", done: false },
  ];

  return (
    <div className="med-root">
      {/* Back link row */}
      <div className="med-back-row">
        <button className="med-back-btn" type="button">
          ← Back to my errands
        </button>
      </div>

      {/* Runner / Errand top card */}
      <div className="med-card med-top-card">
        <div className="med-top-row">
          <div className="med-runner-info">
            <div className="med-avatar">{runner.initials}</div>
            <div className="med-runner-meta">
              <div className="med-runner-line">
                <h2 className="med-runner-name">{runner.name}</h2>
                {runner.verified && (
                  <span className="med-pill med-pill-verified">Verified Runner</span>
                )}
              </div>
              <div className="med-runner-stats">
                <span className="med-star">★</span>
                <span className="med-rating">{runner.rating} Rating</span>
                <span className="med-dot">•</span>
                <span className="med-deliveries">{runner.jobs} Deliveries</span>
              </div>
            </div>
          </div>

          <div className="med-status-wrap">
            <span className="med-pill med-pill-status">{errand.status}</span>
          </div>
        </div>

        <div className="med-locations-row">
          <div className="med-loc-card med-pickup">
            <div className="med-loc-icon">
              <CiLocationOn size={18} />
            </div>
            <div className="med-loc-text">
              <span className="med-loc-label">Pickup Location</span>
              <p className="med-loc-value">{errand.pickup}</p>
            </div>
          </div>

          <div className="med-loc-card med-delivery">
            <div className="med-loc-icon med-loc-icon-purple">
              <CiLocationOn size={18} />
            </div>
            <div className="med-loc-text">
              <span className="med-loc-label">Delivery Location</span>
              <p className="med-loc-value">{errand.delivery}</p>
            </div>
          </div>
        </div>

        <div className="med-progress-wrap">
          <div className="med-progress-label-row">
            <span className="med-progress-title">Overall Progress</span>
            <span className="med-progress-val">{errand.progress}%</span>
          </div>
          <div className="med-progressbar">
            <div
              className="med-progressbar-fill"
              style={{ width: `${errand.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom two columns */}
      <div className="med-grid">
        {/* Left profile card */}
        <div className="med-card med-profile-card">
          <div className="med-profile-avatar">{runner.initials}</div>
          <div className="med-profile-name">{runner.name}</div>

          <div className="med-profile-meta">
            <div className="med-profile-rating">
              <span className="med-star">★</span>
              <span>{runner.rating}</span>
            </div>
            <div className="med-profile-jobs">{runner.jobs} jobs</div>
          </div>

          <button type="button" className="med-chat-btn">
            💬 Chat with Runner
          </button>
        </div>

        {/* Right delivery progress card */}
        <div className="med-card med-timeline-card">
          <h3 className="med-timeline-title">Delivery Progress</h3>

          <div className="med-timeline">
            {/* Vertical rail */}
            <div className="med-rail" />

            {/* Steps */}
            {steps.map((step) => (
              <div className="med-step-row" key={step.id}>
                <div className="med-step-icon-wrap">
                  {step.done ? (
                    <div className="med-step-icon med-step-done">
                      <div className="med-step-done-inner">
                        <IoCheckmarkCircle size={18} />
                      </div>
                    </div>
                  ) : (
                    <div className="med-step-icon med-step-idle" />
                  )}
                </div>

                <div className="med-step-text">
                  {step.done ? (
                    <>
                      <div className="med-step-label">{step.label}</div>
                      {step.time && <div className="med-step-time">{step.time}</div>}
                    </>
                  ) : (
                    <div className="med-step-placeholder" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrandDeliveryTrack;
