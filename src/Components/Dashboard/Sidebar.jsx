import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/App";
import "./Sidebar.css";
import { FaRunning } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const { user } = useContext(AppContext);
  const [errand, setErrand] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const getErrandById = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/errand/my-errands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setErrand(res?.data?.data || null);
    } catch (error) {
      console.log("ERR ERRAND:", error);
    }
  };

  useEffect(() => {
    getErrandById();
  }, []);

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      path: "/dashboard/my-errands",
      label: "My Errands",
      icon: <FaRunning />,
    },
    {
      path: "/dashboard/payments",
      label: "Payments",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      path: errand ? `/dashboard/messages/${errand.id}` : "/dashboard/messages",
      label: "Messages",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* TOP LOGO */}
      <div className="sidebar-header">
        <div className="logoo">
          <img
            src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
            alt=""
          />
          <div className="logo-text">
            <span className="logo-title">ErrandHive</span>
            <p>post errands</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}

        {/* LOGOUT */}
        <div className="nav-item logout" onClick={handleLogout}>
          <span className="nav-icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          <span className="nav-label">Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
