import React, { useEffect, useState } from "react";
import "./RunnerDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RunnerDetailPage = () => {
  const { id } = useParams(); // errandId
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [details, setDetails] = useState({});
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [otp, setOtp] = useState("");

  const uiSteps = [
    { key: "orderAssignedAt", label: "Order assigned" },
    { key: "headingToPickupAt", label: "Runner heading to pickup" },
    { key: "arrivedAtPickupAt", label: "Runner arrived at pickup location" },
    {
      key: "itemPickedAt",
      label: "Item picked up with (OTP)",
      otp: true,
    },
    { key: "headingToDeliveryAt", label: "Runner heading to delivery location" },
    { key: "arrivedAtDeliveryAt", label: "Runner arrived at delivery location" },
    {
      key: "deliveredConfirmedAt",
      label: "Delivery confirmed (OTP)",
      otp: true,
    },
  ];


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

 
  const fetchProgress = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/errands/${id}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const backend = res.data.data;

      let formatted = [];

      if (Array.isArray(backend)) {
        formatted = uiSteps.map((step) => {
          const match = backend.find((b) => b.label === step.label);

          return {
            label: step.label,
            done: match?.done || false,
            time: match?.time || null,
          };
        });
      } else if (typeof backend === "object" && backend !== null) {
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


  const sendProgressMessage = async (label) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      await axios.post(
        `${BaseUrl}/messages/send`,
        {
          errandId: id,
          text: `Update: ${label}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log("Message send error:", error);
    }
  };


  const updateStep = async (stepKey, label) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userToken"));

      // UI Optimistic update
      setSteps((prev) =>
        prev.map((s) =>
          s.label === label
            ? { ...s, done: true, time: new Date().toLocaleString() }
            : s
        )
      );

      sendProgressMessage(label);

      await axios.put(
        `${BaseUrl}/errands/${id}/progress`,
        { step: stepKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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


  const OtpModal = () => {
    const [otpLoading, setOtpLoading] = useState(false);

    if (!showOtpModal) return null;

    const handleSubmitOtp = async () => {
      if (!otp.trim()) return toast.error("Enter OTP");

      try {
        setOtpLoading(true);

        const token = JSON.parse(localStorage.getItem("userToken"));

        let endpoint = "";

        if (currentStep.stepKey === "itemPickedAt") {
          endpoint = `${BaseUrl}/errands/${id}/verify-start`;
        }

        if (currentStep.stepKey === "deliveredConfirmedAt") {
          endpoint = `${BaseUrl}/errands/${id}/verify-delivery`;
        }

        if (!endpoint) {
          toast.error("Invalid OTP request step");
          return;
        }

        const res = await axios.put(
          endpoint,
          { otp },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success(res?.data?.message || "OTP verified!");

        updateStep(currentStep.stepKey, currentStep.label);

        setOtp("");
        setShowOtpModal(false);
      } catch (error) {
        console.log("OTP verify error:", error);
        toast.error(error?.response?.data?.message || "OTP verification failed!");
      } finally {
        setOtpLoading(false);
      }
    };

    return (
      <div className="otpModal-overlay">
        <div className="otpModal-box">
          <h4>Enter OTP</h4>

          <input
            className="otpModal-input"
            type="text"
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />

          <div className="otpModal-actions">
            <button
              className="otpModal-cancel"
              onClick={() => setShowOtpModal(false)}
            >
              Cancel
            </button>

            <button
              disabled={otpLoading}
              className="otpModal-confirm"
              onClick={handleSubmitOtp}
            >
              {otpLoading ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="runnerDetailPage-container">
      <OtpModal />

      <main className="runnerDetailPage-main-content">
        {/* ERRAND INFO CARD */}
        <div className="runnerDetailPage-errand-card">
          <div className="runnerDetailPage-errand-header">
            <h2>{details?.title}</h2>
            <span className="runnerDetailPage-status-badge">
              {details?.status}
            </span>
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
            <span>
              {details?.createdAt &&
                new Date(details.createdAt).toLocaleDateString()}
            </span>
            <span className="runnerDetailPage-price">₦{details?.price}</span>
          </div>
        </div>

        {/* BOTTOM SECTION */}
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
                navigate(`/runnerlayout/runnermessage/${details?.id}`)
              }
            >
              Chat with Client
            </button>
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
                    if (!details.assignedTo) {
                      return toast.error(
                        "You cannot update progress until this errand is assigned."
                      );
                    }

                    if (!step.done && !loading) {
                      if (uiSteps[i].otp) {
                        setCurrentStep({
                          stepKey: uiSteps[i].key,
                          label: step.label,
                        });
                        setShowOtpModal(true);
                      } else {
                        updateStep(uiSteps[i].key, step.label);
                      }
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
                    <div className="runnerDetailPage-step-time">
                      {step.time}
                    </div>
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
