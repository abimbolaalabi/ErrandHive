import React, { useEffect, useState } from "react";
import "../DashboardPage/DashboardPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalErrand from "../../../Components/ModalErrand/ModalErrand";
import { CiLocationOn } from "react-icons/ci";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";
import cube from "../../../assets/cube.png"

const DashboardPage = () => {
  const [errandMod, setErrandMod] = useState(false);


  const [errands, setErrands] = useState([]);
  const [loading, setLoading] = useState(true);
  // const[userId, setUserId]

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("userDetails")) || {};
  const userKyc = localStorage.getItem("userKyc") === "true";
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const fullName = `${storedUser?.firstName || ""} ${storedUser?.lastName || ""}`.trim();


  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

    const fetchErrands = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("userToken");
    if (!token) {
      console.log("No token found");
      setErrands([]);
      return;
    }

    const res = await axios.get(
      `${BaseUrl}/errand/my-errands`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setErrands(res?.data?.data || []);
  } catch (err) {
    console.log("Fetch errands error:", err.response?.data || err.message);
    setErrands([]);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchErrands();
  }, []);

           const stats = [
    {
      title: "Total Request",
      value: errands.length,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      ),
      color: "#8133F1",
    },
    {
      title: "Completed",
      value: "0",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22,4 12,14.01 9,11.01" />
        </svg>
      ),
      color: "#F59E0B",
    },
    {
      title: "Active",
      value: "0",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
      color: "#8133F1",
    },
    {
      title: "Total Spent",
      value: "0",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <g strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 16V8" />
            <path d="M16 16V8" />
            <path d="M8 8l8 8" />
            <path d="M6 10h12" />
            <path d="M6 14h12" />
          </g>
        </svg>
      ),
      color: "#F97316",
    },
  ]; 

  return (
    <div className="dashboard-page">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {fullName || "Guest"}! 👋</h1>
          <p className="welcome-subtitle">Manage your errands today.</p>
        </div>

        {userKyc && (
          <button className="post-errand-btn" onClick={() => setErrandMod(true)}>
            + <span>Post New Errand</span>
          </button>
        )}
      </div>

      <div className="statts-grid">
        {stats.map((stat, index) => (
          <div key={index} className="statt-card">
            <div className="statt-content">
              <h3 className="statt-title">{stat.title}</h3>
              <p className="statt-value">{stat.value}</p>
            </div>
            <div className="statt-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: 24 }}>Loading errands...</p>
      )}

 
      {!loading && errands.length === 0 && (
        <div className="no-errands-section">
          <div className="no-errands-content">
            <div className="no-errands-icon">
             <img src={cube} alt="" />
            </div>

            <h2 className="no-errands-title">No errands yet</h2>
            <p className="no-errands-subtitle">
              {userKyc ? "Create your first errand to get started" : "Complete KYC to get started"}
            </p>

            {!userKyc && (
              <button onClick={() => navigate("/dashboard/profile")} className="kyc-button">
                Complete KYC
              </button>
            )}
          </div>
        </div>
      )}
          <h1>Recent Errands</h1>
  
      {!loading && errands.length > 0 && errands.map((item) => (
        <div key={item.id} className="recent-card">
          <div className="recent-header">
            <h4>{item.title}</h4>
            <span className="status-badge">{item?.status}</span>
          </div>

          <div className="pickup-delivery-row">
            <div className="pickup-section">
              <p className="icon-text">
                <CiLocationOn size={18} /> <span className="label">Pickup</span>
              </p>
              <p className="address">{item?.pickupAddress}</p>
            </div>

            <div className="delivery-section">
              <p className="icon-text">
                <CiLocationOn size={18} /> <span className="label">Delivery</span>
              </p>
              <p className="address">{item?.deliveryAddress}</p>
            </div>
          </div>

          <div className="recent-footer">
            <p className="date">
              <BsClock size={17} /> {formatDate(item.createdAt)}
            </p>
            <p className="price">₦{Number(item.price ?? 0).toLocaleString()}</p>

            <button className="details-btn">
              <Link className="link" to={`/dashboard/my-errands/${item.id}`}>
                View Details
              </Link>
            </button>
          </div>
        </div>
      ))}

   
      {errandMod && <ModalErrand toclose={setErrandMod} />}
    </div>
  );
};

export default DashboardPage;
