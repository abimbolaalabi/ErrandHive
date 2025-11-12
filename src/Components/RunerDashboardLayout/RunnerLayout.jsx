import React from "react";
import "./RunnerLayout.css";
import { Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const RunnerLayout = () => {
  return (
    <div className="runner-layout-style">
      {/* ===== Sidebar ===== */}
      <div className="sidebar-runner">
        <div className="sidebar-header">
          <div className="sidebar-header-title">
            <img src="/logo.png" alt="Logo" />
            <h2>ErrandHive</h2>
          </div>
        </div>

        <div className="sidebar-main">
          <div className="Boxholder active">🏠 Dashboard</div>
          <div className="Boxholder">💼 Active Jobs</div>
          <div className="Boxholder">💰 Earnings</div>
          <div className="Boxholder">⚙️ Settings</div>
        </div>

        <div className="log-out-box">
          <button className="log-out-btn">
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className="main-section">
        <header className="header">
          <div className="input-holder">
            <input className="input" placeholder="Search..." />
          </div>

          <div className="wrapper-notification-profile">
            <div className="profile-notification-box">
              <IoMdNotificationsOutline className="notify" />
              <div className="red-box">3</div>
            </div>

            <div className="wrapper-profile-shit">
              <div className="Profile-layout-box-runner">
                <div className="profile-pic-layout">V</div>
              </div>
              <div className="Profile-name-user-holder">
                <h1 className="profile-h1-runner">Victory</h1>
                <p className="profile-p-runner">Runner</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== Scrollable Outlet Content ===== */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RunnerLayout;
