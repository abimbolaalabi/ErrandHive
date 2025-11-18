import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/App';
import { GiHamburgerMenu } from "react-icons/gi";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Profile from "../../assets/Profile.png"; 
import axios from 'axios';

const Header = ({ setSidebarOpen }) => {
  const { userType, user } = useContext(AppContext);
  const [notifyCount, setNotifyCount] = useState(0);
  const BaseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()

  const storedUser = JSON.parse(localStorage.getItem("userDetails")) || {};
  const fullName = `${storedUser?.firstName || ""} ${storedUser?.lastName || ""}`.trim();


  const fetchNotifyCount = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("userToken"))
    const res = await axios.get(`${BaseUrl}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const unread = res.data?.notifications?.filter(n => !n.isRead).length || 0;
    setNotifyCount(unread);
  } catch (err) {
    console.log("Notify count error:", err);
  }
};

useEffect(() => {
  fetchNotifyCount();
}, []);

  return (
    <header className="dashboard-header">

      {/* SINGLE HAMBURGER (Mobile Only) */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        <GiHamburgerMenu size={24} />
      </button>

      <div className="header-left">

        {/* SEARCH BAR */}
        <div className="search-container">
          {/* <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg> */}
          {/* <input 
            type="text" 
            placeholder="Search errands, runners..." 
            className="search-input"
          /> */}
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn" onClick={()=> navigate("/dashboard/notification")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
         <div className='ntfy'>{notifyCount}</div>

        </button>

        <div className="user-profile">
           <img src={Profile} alt="User Profile" />
          <div className="user-info">
            <span className="user-namee">{fullName || "Guest"}</span>
            <span className="user-role">{userType || user?.role || "No Role"}</span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
