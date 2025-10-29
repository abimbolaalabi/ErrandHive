import React from "react";
import "./RunnerLayout.css";

const RunnerLayout = () => {
  return (
    <div className="runner-layout">
      <aside className="sidebar">
        <p>Sidebar</p>
      </aside>

      <div className="main-section">
        <header className="header">
          <div className="input-holder">
            <input type="text" placeholder="Search errands, runner" className="input" />
          </div>
          <div className="profile-notification-box">
          <div className="notification">Notification</div>
          
          </div>
        </header>

        <div className="content">
          <p>Main content goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default RunnerLayout;
