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

  const token = JSON.parse(localStorage.getItem("userToken"));
  

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };


  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(res.data.data || []);
    } catch (err) {
      console.log("Error fetching notifications:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };


  const markAsRead = async (id) => {
    try {
      await axios.put(`${BaseUrl}/notifications/${id}/read`, {
        headers: { Authorization: `Bearer ${token}` }
      });

    
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (err) {
      console.log("Mark read error:", err?.response?.data || err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  useEffect(() => {
    markAsRead();
  }, []);

  return (
    <div className="notify-page-container">
      <p className="back-text" onClick={() => navigate(-1)}>← Back to dashboard</p>

      <div className="notify-header">
        <h2>Notifications</h2>
        <p>Stay updated on your delivery request and all notifications</p>
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: 20 }}>Loading notifications...</p>
      )}

      <div className="notify-list">
        {!loading && notifications.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>No notifications yet</p>
        )}

        {!loading &&
          notifications.map((item) => (
            <div key={item.id} className="notify-card">
              <div className="notify-card-left">
                <h3 className="notify-title">New Application</h3>
                <p className="notify-message">{item.message}</p>

                <div className="notify-time">
                  <BsClock size={16} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              <div className="notify-card-right">
                {!item.isRead && <span className="notify-badge">New</span>}

                <button
                  className="notify-btn"
                  onClick={() => markAsRead(item.id)}
                >
                  {item.type === "application_accepted"
                    ? "View Request"
                    : item.type === "counter_offer"
                    ? "View Negotiation"
                    : item.type === "generate_otp"
                    ? "Generate OTP"
                    : "View Details"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notification;
