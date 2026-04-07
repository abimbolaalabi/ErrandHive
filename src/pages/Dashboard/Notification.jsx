import React, { useEffect, useState } from "react";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsClock } from "react-icons/bs";

const Notification = () => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userToken");

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  // =====================
  // FETCH NOTIFICATIONS
  // =====================
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // correct mapping based on your API response
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.log("Error fetching notifications:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // MARK A NOTIFICATION AS READ
  // =====================
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${BaseUrl}/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI
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

  // =====================
  // RENDER
  // =====================

  return (
    <div className="notify-page-container">
      <p className="back-text" onClick={() => navigate(-1)}>
        â† Back to dashboard
      </p>

      <div className="notify-header">
        <h2>Notifications</h2>
        <p>Stay updated on your delivery request and all notifications</p>
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Loading notifications...
        </p>
      )}

      <div className="notify-list">
        {!loading && notifications.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            No notifications yet
          </p>
        )}

        {!loading &&
          notifications.map((item) => (
            <div
              key={item.id}
              className={`notify-card ${item.isRead ? "" : "unread"}`}
            >
              {/* LEFT */}
              <div className="notify-card-left">
                <h3 className="notify-title">
                  {item.type === "runner_applied"
                    ? "New Runner Application"
                    : item.type === "application_accepted"
                    ? "Application Accepted"
                    : item.type === "proposed_bid"
                    ? "New Bid Proposal"
                    : "Notification"}
                </h3>

                <p className="notify-message">{item.message}</p>

                <div className="notify-time">
                  <BsClock size={16} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="notify-card-right">
                {!item.isRead && <span className="notify-badge">New</span>}

                <button
                  className="notify-btn"
                  onClick={() => {
                    markAsRead(item.id);
                    navigate(`/dashboard/my-errands/${item.meta.errandId}`);
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

export default Notification;
