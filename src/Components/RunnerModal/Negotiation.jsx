import React, { useState } from "react";
import "./Negotiation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const Negotiation = ({ close, errand }) => {
  const [counterPrice, setCounterPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const token = localStorage.getItem("userToken");

  
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
      const response = await fetch(`${API_BASE_URL}/apply/${errand.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bidPrice: Number(counterPrice),
          action: "propose",
        }),
      });
      console.log(response)

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to propose price");

      toast.success("Proposal sent successfully!");
      close();
    } catch (error) {
      toast.error(error.message || "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/apply/${errand.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "accept",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to accept errand");

      toast.success("You’ve accepted the current price!");
      close();
    } catch (error) {
      toast.error(error.message || "Something went wrong, please try again.");
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
            onClick={handleAccept}
            disabled={isAccepting}
          >
            {isAccepting
              ? "Accepting..."
              : `Accept ₦${errand.price?.toLocaleString() || "0"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Negotiation;
