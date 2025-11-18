import React, { useEffect, useState } from "react";
import "./RunnerNotification.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsClock } from "react-icons/bs";

const RunnerNotification = () => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("userToken"));

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.log("Error fetching notifications:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${BaseUrl}/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.log("Mark read error:", err?.response?.data || err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="runner-notify-page">
      <p className="runner-back-text" onClick={() => navigate(-1)}>
        ← Back
      </p>

      <div className="runner-notify-header">
        <h2>Notifications</h2>
        <p>Updates on your runners job requests, bids & statuses</p>
      </div>

      {loading && (
        <p className="runner-loading">Loading notifications...</p>
      )}

      <div className="runner-notify-list">
        {!loading && notifications.length === 0 && (
          <p className="runner-empty">No notifications yet</p>
        )}

        {!loading &&
          notifications.map((item) => (
            <div
              key={item.id}
              className={`runner-notify-card ${
                item.isRead ? "" : "runner-unread"
              }`}
            >
              <div className="runner-notify-content">
                <h3 className="runner-notify-title">
                  {item.type === "runner_applied"
                    ? "You Applied for a Job"
                    : item.type === "application_accepted"
                    ? "Your Application Was Accepted"
                    : item.type === "proposed_bid"
                    ? "New Bid Update"
                    : "Notification"}
                </h3>

                <p className="runner-notify-message">{item.message}</p>

                <div className="runner-notify-time">
                  <BsClock size={16} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              <div className="runner-notify-right">
                {!item.isRead && <span className="runner-badge">New</span>}

                <button
                  className="runner-notify-btn"
                  onClick={() => {
                    markAsRead(item.id);
                    navigate(`/runnerlayout/runnermessage/${item.meta.errandId}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RunnerNotification;
