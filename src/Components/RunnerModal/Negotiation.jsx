import React, { useState } from "react";
import "./Negotiation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const Negotiation = ({ close, errand }) => {
  const [counterPrice, setCounterPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("userToken"); // assuming you store your auth token here

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
          proposedPrice: counterPrice,
          action: "propose",
        }),
      });

      if (!response.ok) throw new Error("Failed to propose price");

      const data = await response.json();
      console.log("✅ Proposal success:", data);
      toast.success("Proposal sent successfully!");
      close();
    } catch (error) {
      console.error("❌ Proposal error:", error);
      toast.error(error.message || "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="negotiate-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="negotiate-wrapper-box">
        <div className="btn-negotiate-wrapper">
          <button className="x-negotiate" onClick={close}>
            X
          </button>
        </div>

        <div className="negotiate-text-holder">
          <p className="review-errand-negotiate-text-header">
            Review Errand Price
          </p>
          <p className="review-errand-negotiate-p">
            Accept offer or propose a different offer
          </p>
        </div>

        <section className="box-negotiate-holder">
          <div className="div-section-negotiate">
            <p>Errand Title</p>
            <p>{errand.title || "No title"}</p>
            <p>Pickup contact: {errand.pickupContact || "N/A"}</p>
          </div>

          <div className="div-section-long-negotiate">
            <p>Current Offer</p>
            <p>₦{errand.price?.toLocaleString() || "0"}</p>
          </div>
        </section>

        <section className="propose-section-propose-stuff">
          <p>Propose your price</p>
          <div className="input-negotiate-wrapper">
            <input
              type="number"
              className="text-input-negotiate"
              placeholder="0.00"
              value={counterPrice}
              onChange={(e) => setCounterPrice(e.target.value)}
            />
          </div>
        </section>

        <section className="section-propose-prce">
          <button
            className="propose-button-shit"
            onClick={handlePropose}
            disabled={isLoading}
          >
            {isLoading ? "Proposing..." : "Propose a price"}
          </button>
          <button className="accept-button-shit" onClick={close}>
            Accept Job
          </button>
        </section>
      </div>
    </div>
  );
};

export default Negotiation;
