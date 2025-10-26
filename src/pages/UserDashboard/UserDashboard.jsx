import React from 'react'
import "./UserDashboard.css"
import SideBar from '../../Components/SideBar/SideBar'
import { MdOutlineDashboard } from "react-icons/md";
import { Outlet } from 'react-router-dom';
const UserDashboard = () => {
  return (
    <div className='dashboard-container'>
      <div className='leftside'>
        <SideBar/>
      </div>
      <div className='right-side'>
        <div className='right-header'>
        
        </div>
        <Outlet />
      </div>
    
    </div>
  )
}

export default UserDashboard
