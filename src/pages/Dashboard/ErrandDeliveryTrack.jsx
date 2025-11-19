import React, { useEffect, useState } from "react";
import "./ErrandDeliveryTrack.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ErrandDeliveryTrack = () => {
const { id } = useParams();

const splitId =id.split("_")[0]
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [errand, setErrand] = useState({});

  const [steps, setSteps] = useState([]);

  const [loading, setLoading] = useState(false);

  // ⭐ Fetch Errand Details
  const fetchErrand = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/errand/get/${splitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setErrand(res.data.data);
      console.log("hjhhgh,  ",    res.data.data)
    } catch (error) {
      console.log("Errand fetch error:", error);
    }
  };

  // ⭐ Fetch Delivery Progress (matches your backend format)
  const fetchProgress = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userToken"));

      const res = await axios.get(
        `${BaseUrl}/errands/${splitId}/status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSteps(res.data.data); // backend sends correct format
    } catch (error) {
      console.log("Progress fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrand();
    fetchProgress();
  }, [id]);

  return (
    <div className="med-root">

      {/* BACK BUTTON */}
      <div className="med-back-row">
        <button className="med-back-btn" onClick={() => navigate(-1)}>
          ← Back to my errands
        </button>
      </div>

      {/* ---- TOP CARD ---- */}
      <div className="med-card med-top-card">
        <div className="med-top-row">

          {/* RUNNER INFO */}
          <div className="med-runner-info">
            <div className="med-avatar">
              {errand?.assignedRunner?.firstName?.charAt(0)}
              {errand?.assignedRunner?.lastName?.charAt(0)}
            </div>

            <div>
              <h2 className="med-runner-name">
                {errand?.assignedRunner?.firstName}{" "}
                {errand?.assignedRunner?.lastName}
              </h2>

              <div className="med-runner-stats">
                ★ {errand?.assignedRunner?.rating || 4.8} Rating •{" "}
                {errand?.assignedRunner?.totalJobs || 0} Deliveries
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="med-status-wrap">
            <span className="med-pill med-pill-status">
              {errand?.status}
            </span>
          </div>
        </div>

        {/* LOCATIONS */}
        <div className="med-locations-row">
          <div className="med-loc-card med-pickup">
            <p className="med-loc-label">Pickup Location</p>
            <p className="med-loc-value">{errand?.pickupAddress}</p>
          </div>

          <div className="med-loc-card med-delivery">
            <p className="med-loc-label">Delivery Location</p>
            <p className="med-loc-value">{errand?.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* ---- GRID SECTION ---- */}
      <div className="med-grid">

        {/* LEFT PROFILE */}
        <div className="med-card med-profile-card">
          <div className="med-profile-avatar">
            {errand?.assignedRunner?.firstName?.charAt(0)}
            {errand?.assignedRunner?.lastName?.charAt(0)}
          </div>

          <div className="med-profile-name">
            {errand?.assignedRunner?.firstName}{" "}
            {errand?.assignedRunner?.lastName}
          </div>

          <div className="med-profile-meta">
            <span>★ {errand?.assignedRunner?.rating }</span> •{" "}
            <span>{errand?.assignedRunner?.totalJobs } Jobs</span>
          </div>

          <button
            className="med-chat-btn"
            onClick={() =>
              navigate(`/dashboard/messages/${splitId}`)
            }
          >
            💬 Chat with Runner
          </button>
        </div>

        {/* ---- DELIVERY PROGRESS ---- */}
        <div className="med-card med-timeline-card">
          <h3 className="med-timeline-title">Delivery Progress</h3>

<div className="med-card med-timeline-card">
  <h3 className="med-timeline-title">Delivery Progress</h3>

  <div className="progress-timeline">
    <div className="progress-line"></div>

    {steps.map((step, index) => (
      <div className="progress-step" key={index}>
        <div className={`progress-circle ${step.done ? "done" : ""}`}>
          {step.done ? <span className="check-icon">✓</span> : ""}
        </div>

        <div className="progress-text">
          <p className="progress-label">{step.label}</p>
          {step.time && <p className="progress-time">{step.time}</p>}
        </div>
      </div>
    ))}
  </div>
</div>

        </div>

      </div>
    </div>
  );
};

export default ErrandDeliveryTrack;
