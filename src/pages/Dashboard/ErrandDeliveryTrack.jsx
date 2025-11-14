import React, { useEffect, useState } from "react";
import "./ErrandDeliveryTrack.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrandDeliveryTrack = () => {
  const [steps, setSteps] = useState([
    { id: 1, label: "Order assigned", status: "Assigned", time: "", done: false },
    { id: 2, label: "Runner heading to pickup", status: "HeadingToPickup", time: "", done: false },
    { id: 3, label: "Runner arrived at pickup location", status: "ArrivedAtPickup", time: "", done: false },
    { id: 4, label: "Item picked up with (OTP)", status: "PickedUp", time: "", done: false },
    { id: 5, label: "Runner heading to delivery location", status: "HeadingToDelivery", time: "", done: false },
    { id: 6, label: "Runner arrived at delivery location", status: "ArrivedAtDelivery", time: "", done: false },
    { id: 7, label: "Delivery confirmed (OTP)", status: "Delivered", time: "", done: false },
  ]);

  const [aUser, setAUser] = useState({});
  const [loading, setLoading] = useState(false);

  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  // ⭐ Fetch single errand details
  const getAUserById = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/errand/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAUser(res?.data?.data);

      // ⭐ Populate steps that are already completed in backend
      const completedSteps = res?.data?.data?.completedSteps || [];

      const updated = steps.map((s) => ({
        ...s,
        done: completedSteps.includes(s.status),
        time: completedSteps.includes(s.status)
          ? new Date().toLocaleString()
          : "",
      }));

      setSteps(updated);

    } catch (error) {
      console.log("Fetch errand error:", error);
    }
  };

  // ⭐ SEND PROGRESS UPDATE TO BACKEND
  const updateStatus = async (status) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userToken"));

      const res = await axios.put(
        `https://errandhive-project.onrender.com/api/v1/errands/${id}/progress`,
        { step: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res?.data?.message || "Step updated!");

      // ⭐ Update UI instantly
      const updatedSteps = steps.map((s) =>
        s.status === status
          ? { ...s, done: true, time: new Date().toLocaleString() }
          : s
      );

      setSteps(updatedSteps);
      getAUserById();

    } catch (err) {
      console.log("Status update error:", err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // User clicks a step circle
  const handleCircleClick = (step) => {
    if (loading) return;
    if (step.done) return; // cannot redo step

    updateStatus(step.status);
  };

  useEffect(() => {
    getAUserById();
  }, []);

  return (
    <div className="med-root">
      <ToastContainer />

      {/* Back Button */}
      <div className="med-back-row">
        <button className="med-back-btn" type="button" onClick={() => navigate(-1)}>
          ← Back to my errands
        </button>
      </div>

      {/* TOP CARD */}
      <div className="med-card med-top-card">
        <div className="med-top-row">
          <div className="med-runner-info">
            <div className="med-avatar">
              {aUser?.assignedRunner?.firstName?.[0]}
              {aUser?.assignedRunner?.lastName?.[0]}
            </div>

            <div className="med-runner-meta">
              <div className="med-runner-line">
                <h2 className="med-runner-name">
                  {aUser?.assignedRunner?.firstName} {aUser?.assignedRunner?.lastName}
                </h2>
                <span className="med-pill med-pill-verified">Verified Runner</span>
              </div>

              <div className="med-runner-stats">
                <span className="med-star">★</span>
                <span className="med-rating">{aUser?.assignedRunner?.rating || 4.8} Rating</span>
                <span className="med-dot">•</span>
                <span className="med-deliveries">{aUser?.assignedRunner?.totalJobs || 23} Deliveries</span>
              </div>
            </div>
          </div>

          <div className="med-status-wrap">
            <span className="med-pill med-pill-status">{aUser?.status}</span>
            {loading && <span className="loading-text">Updating...</span>}
          </div>
        </div>

        {/* LOCATIONS */}
        <div className="med-locations-row">
          <div className="med-loc-card med-pickup">
            <span className="med-loc-label">Pickup Location</span>
            <p className="med-loc-value">{aUser?.pickupAddress}</p>
          </div>

          <div className="med-loc-card med-delivery">
            <span className="med-loc-label">Delivery Location</span>
            <p className="med-loc-value">{aUser?.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="med-grid">
        {/* LEFT PROFILE CARD */}
        <div className="med-card med-profile-card">
          <div className="med-profile-avatar">
            {aUser?.assignedRunner?.firstName?.[0]}
            {aUser?.assignedRunner?.lastName?.[0]}
          </div>

          <div className="med-profile-name">
            {aUser?.assignedRunner?.firstName} {aUser?.assignedRunner?.lastName}
          </div>

          <div className="med-profile-meta">
            <span className="med-star">★</span>
            <span>{aUser?.assignedRunner?.rating || 4.8}</span>
            <span className="med-dot">•</span>
            <span>{aUser?.assignedRunner?.totalJobs || 23} Jobs</span>
          </div>

          <button
            type="button"
            className="med-chat-btn"
            onClick={() => navigate(`/dashboard/messages/${id}`)}
          >
            💬 Chat with Runner
          </button>
        </div>

        {/* RIGHT TIMELINE */}
        <div className="med-card med-timeline-card">
          <h3 className="med-timeline-title">Delivery Progress</h3>

          <div className="med-timeline">
            <div className="med-rail" />

            {steps.map((step) => (
              <div className="med-step-row" key={step.id}>
                <div className="med-step-icon-wrap">
                  {step.done ? (
                    <div className="med-step-done" />
                  ) : (
                    <div
                      className="med-step-idle"
                      onClick={() => handleCircleClick(step)}
                    />
                  )}
                </div>

                <div className="med-step-text">
                  <div className="med-step-label">{step.label}</div>
                  {step.time && <div className="med-step-time">{step.time}</div>}
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
