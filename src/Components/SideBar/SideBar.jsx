import React, { useState } from 'react'
import "./SideBar.css"
import Logo from '../Logo/Logo'
import { MdOutlineDashboard } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
const SideBar = () => {
    const nav = useNavigate()
    return (
        <div className='sidebar-container'>
            {/* <Logo /> */}
            <div className='menu'>
             
                <div className='menu-cont'>
                    <MdOutlineDashboard />
                    <p onClick={()=> nav('')}>Dashboard</p>
                </div>
                
                <div className='menu-cont'>
                    <MdOutlineDashboard />
                    <p>Name</p>
                </div>
                <div className='menu-cont' onClick={()=> nav('/date')}>
                    <MdOutlineDashboard />
                    <p>date</p>
                </div>
                <div className='menu-cont' onClick={()=>nav('account')}>
                    <MdOutlineDashboard />
                    <p>Account</p>
                </div>

            </div>

        </div>
    )
}

export default SideBar
