import React, { useState } from "react";
import "./RejectModal.css";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const RejectModal = ({ info, toclose }) => {
    const BaseUrl = import.meta.env.VITE_BASE_URL;
    const token = JSON.parse(localStorage.getItem("userToken"));
    const [loading, setLoading] = useState(false);

    const handleReject = async () => {
        try {
            setLoading(true);

            const res = await axios.patch(
                `${BaseUrl}/errands/${info?.errandId}/applications/${info?.applicationId}/reject`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success(res?.data?.data?.message || "Errand rejected");

            toclose(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to reject errand");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rejectModal-overlay">
            <div className="rejectModal-container">

                {/* Close button */}
                <button className="rejectModal-close" onClick={() => toclose(false)}>
                    <IoClose size={24} />
                </button>

                {/* Title */}
                <p className="rejectModal-title">Review details before confirming</p>

                {/* Task box */}
                <div className="rejectModal-taskBox">
                    <p className="rejectModal-taskLabel">Errand Task</p>
                    <p className="rejectModal-task">{info?.title}</p>
                </div>

                {/* X icon */}
                <div className="rejectModal-iconCircle">
                    <IoClose size={36} color="white" />
                </div>

                {/* Heading */}
                <h3 className="rejectModal-heading">Confirm Errand Rejection</h3>

                {/* Sub */}
                <p className="rejectModal-subtext">
                    You're about to reject this errand application
                    <br />
                    from <span>{info?.runnerName}</span>
                </p>

                {/* Price Box */}
                <div className="rejectModal-priceBox">
                    <p className="rejectModal-priceLabel">Final Price</p>
                    <h3 className="rejectModal-price">
                       ₦{info?.bidPrice || info?.currentPrice}

                    </h3>
                </div>

                {/* Buttons */}
                <div className="rejectModal-buttons">
                    <button className="rejectModal-backBtn" onClick={() => toclose(false)}>
                        Back
                    </button>

                    <button
                        className="rejectModal-rejectBtn"
                        disabled={loading}
                        onClick={handleReject}
                    >
                        {loading ? "Processing..." : <><span className="rejectModal-flash">⚡</span> Confirm & Reject</>}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RejectModal;
