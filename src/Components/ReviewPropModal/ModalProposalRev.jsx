import React, { useState } from "react";
import "./ModalProposalRev.css";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ModalProposalRev = ({ toclose, setErrandPay, info }) => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const res = await axios.patch(
        `${BaseUrl}/errands/${info?.errandId}/applications/${info?.applicationId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res?.data?.message || "Runner application accepted successfully");
      console.log("PATCH response:", res.data);

      toclose(false);
      setErrandPay(true);
    } catch (err) {
      console.log("Error accepting runner:", err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Failed to assign runner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-mod-cont">
      <div className="review-wrapper">
        <button className="rev-close" onClick={() => toclose(false)}>
          <IoClose size={24} />
        </button>

        <p className="rev-top-text">Review details before confirming</p>

        <div className="rev-task-box">
          <p className="rev-task-label">Errand Task</p>
          <p className="rev-task-title">{info?.title}</p>
        </div>

        <div className="rev-center">
          <div className="rev-success-icon">
            <span>✔</span>
          </div>

          <h3 className="rev-assign-title">Confirm Runner Assignment</h3>
          <p className="rev-assign-sub">
            You're about to assign this errand to {info?.runnerName}
          </p>
        </div>

        <div className="rev-price-box">
          <p className="rev-price-label">Final Price</p>
          <p className="rev-price-value">₦{Number(info?.bidPrice).toLocaleString()}</p>
        </div>

        <div className="rev-btn-flex">
          <button className="rev-btn-outline" onClick={() => toclose(false)}>
            Back to List
          </button>
          <Link to={"/dashboard/my-errands/errandId/errandTrack"}>
            <button
            className="rev-btn-fill"
            disabled={loading}
          >
            {loading ? "Processing..." : <><span>⚡</span> Confirm & Assign</>}
          </button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default ModalProposalRev;
