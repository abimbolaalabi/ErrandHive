import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../../Context/App';
import './Sidebar.css';

const Sidebar = () => {
  const { userType } = useContext(AppContext);
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    },
    {
      path: userType === 'Client' ? '/dashboard/my-errands' : '/dashboard/active-jobs',
      label: userType === 'Client' ? 'My Errands' : 'Active Jobs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      path: userType === 'Client' ? '/dashboard/payments' : '/dashboard/my-earnings',
      label: userType === 'Client' ? 'Payments' : 'My Earnings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      )
    },
    {
      path: '/dashboard/messages',
      label: 'Messages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      path: '/dashboard/profile',
      label: 'Profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg" alt="ErrandHive" />
          <div className="logo-text">
            <span className="logo-title">ErrandHive</span>
            <span className="logo-subtitle">{userType === 'Client' ? 'Post errands' : 'Run errands'}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
         {menuItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <NavLink
               key={item.path}
               to={item.path}
               className={`nav-item ${isActive ? 'active' : ''}`}
               end={item.path === '/dashboard'}
             >
               <span className="nav-icon">{item.icon}</span>
               <span className="nav-label">{item.label}</span>
             </NavLink>
           );
         })}
        
        <NavLink to="/logout" className="nav-item logout">
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          <span className="nav-label">Logout</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
