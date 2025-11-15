import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Dashboard/Header';
import Sidebar from '../../Components/Dashboard/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="main-content">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
