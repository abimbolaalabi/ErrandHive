import React, { useEffect, useState } from "react";
import "./RunnerDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RunnerDetailPage = () => {
  const { id } = useParams(); // errandId
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [details, setDetails] = useState({});
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  // === UI STEP CONFIG ===
  const uiSteps = [
    { key: "orderAssignedAt", label: "Order assigned" },
    { key: "headingToPickupAt", label: "Runner heading to pickup" },
    { key: "arrivedAtPickupAt", label: "Runner arrived at pickup location" },
    { key: "itemPickedAt", label: "Item picked up with (OTP)" },
    { key: "headingToDeliveryAt", label: "Runner heading to delivery location" },
    { key: "arrivedAtDeliveryAt", label: "Runner arrived at delivery location" },
    { key: "deliveredConfirmedAt", label: "Delivery confirmed (OTP)" },
  ];

  // === Fetch single errand ===
  const fetchErrand = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/errand/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDetails(res.data.data);
    } catch (err) {
      console.log("Fetch errand error", err);
    }
  };

 // === Fetch Progress ===
const fetchProgress = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const res = await axios.get(`${BaseUrl}/errands/${id}/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const backend = res.data.data;

    let formatted = [];

    // 🟢 CASE 1 — Backend returns an ARRAY:
    // [
    //   { label: "Order assigned", done: true, time: "..." }
    // ]
    if (Array.isArray(backend)) {
      formatted = uiSteps.map((step) => {
        const match = backend.find((b) => b.label === step.label);

        return {
          label: step.label,
          done: match?.done || false,
          time: match?.time || null,
        };
      });
    }

    // 🟢 CASE 2 — Backend returns OBJECT:
    // {
    //   orderAssignedAt: "...",
    //   headingToPickupAt: "..."
    // }
    else if (typeof backend === "object" && backend !== null) {
      formatted = uiSteps.map((step) => ({
        label: step.label,
        done: backend[step.key] ? true : false,
        time: backend[step.key]
          ? new Date(backend[step.key]).toLocaleString()
          : null,
      }));
    }

    setSteps(formatted);
  } catch (error) {
    console.log("Progress error", error);
  }
};

  // ⭐ SEND MESSAGE TO CLIENT WHEN STEP IS UPDATED
  const sendProgressMessage = async (label) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      await axios.post(
        `${BaseUrl}/messages/send`,
        {
          errandId: id,
          text: `Update: ${label}`, // message content
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log("Message send error:", error);
    }
  };

  // === Runner updates step ===
  const updateStep = async (stepKey, label) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userToken"));

      // 🔥 Instantly update UI
      setSteps((prev) =>
        prev.map((s) =>
          s.label === label
            ? { ...s, done: true, time: new Date().toLocaleString() }
            : s
        )
      );

      // 🔥 SEND PROGRESS MESSAGE AUTOMATICALLY
      sendProgressMessage(label);

      // 🔥 CALL BACKEND TO MARK STEP
      await axios.put(
        `${BaseUrl}/errands/${id}/progress`,
        { step: stepKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh from backend (optional)
      fetchProgress();
    } catch (err) {
      console.log("Update step error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrand();
    fetchProgress();
  }, []);

  return (
    <div className="runnerDetailPage-container">
      <main className="runnerDetailPage-main-content">
        {/* ERRAND INFO CARD */}
        <div className="runnerDetailPage-errand-card">
          <div className="runnerDetailPage-errand-header">
            <h2>{details?.title}</h2>
            <span className="runnerDetailPage-status-badge">{details?.status}</span>
          </div>

          <div className="runnerDetailPages-locations">
            <div className="runnerDetailPage-location pickup">
              <strong>Pickup Location</strong>
              <p>{details?.pickupAddress}</p>
            </div>
            <div className="runnerDetailPage-location delivery">
              <strong>Delivery Location</strong>
              <p>{details?.deliveryAddress}</p>
            </div>
          </div>

          <div className="runnerDetailPage-instruction">
            <strong>Instruction:</strong> {details?.description}
          </div>

          <div className="runnerDetailPage-footer-row">
            <span className="runnerDetailPage-date">
              {details?.createdAt
                ? new Date(details.createdAt).toLocaleDateString()
                : ""}
            </span>
            <span className="runnerDetailPage-price">₦{details?.price}</span>
          </div>
        </div>

        {/* BOTTOM: CUSTOMER + PROGRESS */}
        <div className="runnerDetailPage-bottom-section">
          {/* CUSTOMER CARD */}
          <div className="runnerDetailPage-customer-card">
            <h3>Customer</h3>
            <div className="runnerDetailPage-customer-info">
              <div className="runnerDetailPage-avatar">
                {details?.poster?.firstName?.[0]}
              </div>
              <div className="runnerDetailPage-details">
                <h4>{details?.poster?.firstName}</h4>
                <div>{details?.poster?.rating || 4.8}</div>
              </div>
            </div>

            <button
              className="runnerDetailPage-chat-btn"
              onClick={() =>
                navigate(`/runnerlayout/runnermessage/${details.id}`)
              }
            >
              Chat with Client
            </button>

            <button className="runnerDetailPage-otp-btn">Request OTP</button>
          </div>

          {/* DELIVERY PROGRESS */}
          <div className="runnerDetailPage-progress-card">
            <h3>Delivery Progress</h3>

            <div className="runnerDetailPage-progress-timeline">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`runnerDetailPage-progress-step ${
                    step.done ? "done" : ""
                  }`}
                  onClick={() => {
                    if (!step.done && !loading) {
                      updateStep(uiSteps[i].key, step.label);
                    }
                  }}
                >
                  <div className="runnerDetailPage-step-circle">
                    {step.done ? "✓" : ""}
                  </div>

                  <div className="runnerDetailPage-step-content">
                    <div className="runnerDetailPage-step-label">
                      {step.label}
                    </div>

                    <div className="runnerDetailPage-step-time">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RunnerDetailPage;
