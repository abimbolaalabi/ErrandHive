import React, { useState } from "react";
import "./RunnerPropModal.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const RunnerPropModal = ({ toclose}) => {
  //   const BaseUrl = import.meta.env.VITE_BASE_URL;
  //   const token = JSON.parse(localStorage.getItem("userToken"));
  //   const [loading, setLoading] = useState(false);

  //   const handleConfirm = async () => {
  //     try {
  //       setLoading(true);
  //       console.log(info)
  //       const res = await axios.patch(
  //         `${BaseUrl}/errands/${info?.errandId}/applications/${info?.applicationId}/accept`,
  //         {},
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       toast.success(res?.data?.message || "Runner application accepted successfully");
  //       console.log("PATCH response:", res.data);

  //       toclose(false);
  //       setErrandPay(true);
  //     } catch (err) {
  //       console.log("Error accepting runner:", err.response?.data || err.message);
  //       toast.error(err?.response?.data?.message || "Failed to assign runner");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    toclose(false);
    setErrandPay(true);
    setLoading(false);
  };

  return (
    <div className="runnerPropModal-cont">
      <div className="runnerPropModal-wrapper">
        <button className="runnerPropModal-close" onClick={() => toclose(false)}>
          <IoClose size={24} />
        </button>

        <p className="runnerPropModal-top-text">Review details before confirming</p>

        <div className="runnerPropModal-task-box">
          <p className="runnerPropModal-task-label">Errand Task</p>
          <p className="runnerPropModal-task-title">Title</p>
        </div>

        <div className="runnerPropModal-center">
          <div className="runnerPropModal-success-icon">
            <span>✔</span>
          </div>

          <h3 className="runnerPropModal-assign-title">Confirm Runner Assignment</h3>
          <p className="runnerPropModal-assign-sub">
            You're about to assign this errand to John Doe
          </p>
        </div>

        <div className="runnerPropModal-price-box">
          <p className="runnerPropModal-price-label">Final Price</p>
       
          <p className="runnerPropModal-price-value">#3000</p>
        </div>

        <div className="runnerPropModal-btn-flex">
          <button className="runnerPropModal-btn-outline" onClick={() => toclose(false)}>
            Back to List
          </button>

          <button
            className="runnerPropModal-btn-fill"
            disabled={loading}
            onClick={handleConfirm}
          >
            <p>⚡ Confirm & Assign</p>
            {/* {loading ? "Processing..." : <><span>⚡</span> Confirm & Assign</>} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunnerPropModal;

// 
