import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Dashboard/Header";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Overlay - only visible on mobile when sidebar is open */}
      <div
        className={`sidebar-overlay ${sidebarOpen && isMobile ? "active" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <div className="content-area" onClick={closeSidebar}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
