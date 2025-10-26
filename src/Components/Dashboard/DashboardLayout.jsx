import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Dashboard/Header';
import Sidebar from '../../Components/Dashboard/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
