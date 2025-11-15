import React, { useState } from "react";
import "./Negotiation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RunnerPropModal from "./RunnerPropModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const Negotiation = ({ close, errand }) => {
  const [counterPrice, setCounterPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [runnerPMod, setRunnerPMod] = useState(false);

  const token = JSON.parse(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  // ✅ Handle proposing a counter price
  const handlePropose = async () => {
    if (!counterPrice) {
      toast.error("Please enter a proposed price.");
      return;
    }
    if (Number(counterPrice) <= Number(errand.price)) {
      toast.error("Your proposed price must be higher than the current offer.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/apply/${errand.id}`,
        {
          bidPrice: Number(counterPrice),
          // action: "propose",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message || "Proposal sent successfully!");
      close();
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong, please try again.";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle accepting an errand offer
  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/apply/${errand.id}`,
        { action: "accept" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message || "You’ve accepted the current price!");
      close();
      navigate(`/runnerlayout/runnertrack/${errand.id}`);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong, please try again.";
      toast.error(errMsg);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="negotiation-overlay">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="negotiation-modal">
        <button className="close-btn" onClick={close}>
          ×
        </button>

        <h2 className="modal-title">Review Errand Price</h2>
        <p className="modal-subtitle">
          Accept the offer or propose a different price
        </p>

        <div className="info-card">
          <h4 className="info-title">Errand Task</h4>
          <p className="info-content">
            <strong>{errand.title || "Document Pickup"}</strong>
          </p>
          <p className="info-sub">
            Pickup Contact: {errand.pickupContact || "N/A"}
          </p>
        </div>

        <div className="info-card">
          <h4 className="info-title">Errand Locations</h4>
          <p className="info-content">
            <strong>Pickup Location:</strong> {errand.pickupAddress || "N/A"}
          </p>
          <p className="info-content">
            <strong>Delivery Location:</strong> {errand.deliveryAddress || "N/A"}
          </p>
        </div>

        <div className="offer-box">
          <p className="offer-label">Current Offer</p>
          <h3 className="offer-amount">
            ₦{errand.price ? errand.price.toLocaleString() : "0"}
          </h3>
        </div>

        <div className="propose-section">
          <label className="propose-label">
            Propose Your Price{" "}
            <span className="offer-limit-text">(Your Counter Offer 0/2 used)</span>
          </label>
          <input
            type="number"
            placeholder="₦ 0.00"
            className="propose-input"
            value={counterPrice}
            onChange={(e) => setCounterPrice(e.target.value)}
          />
          <p className="helper-text">
            Suggest a higher price if you believe the offer is too low
          </p>
        </div>

        <div className="button-row">
          <button
            className="propose-btn"
            onClick={handlePropose}
            disabled={isLoading}
          >
            {isLoading ? "Proposing..." : "Propose Price"}
          </button>
<button
  className="accept-btn"
  onClick={() => {
    handleAccept();
    navigate(`/runnerlayout/runnermessage/${errand.id}/status/`);
  }}
  disabled={isAccepting}
>
  {isAccepting
    ? "Accepting..."
    : `Accept ₦${errand.price?.toLocaleString() || "0"}`}
</button>

        </div>
      </div>

      {runnerPMod && <RunnerPropModal toclose={setRunnerPMod} />}
    </div>
  );
};

export default Negotiation;
