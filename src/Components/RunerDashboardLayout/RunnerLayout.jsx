import React from "react";
import "./RunnerLayout.css";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import Profile from "../../assets/Profile.png"
const RunnerLayout = () => {
  return (
    <div className="runner-layout-style">
      <aside className="sidebar-runner">
        <div className="sidebar-header">
          <div className="sidebar-header-title">
          <img src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg" alt="" /><span style={{color:"#6a20cc",fontFamily:"Poppins", fontWeight:"500",fontSize:"24px",fontStyle:"Bold"}}>ErrandHive</span>
          </div>
          <div>          <p style={{textAlign:"center",fontFamily:"Poppins",fontWeight:"400",fontStyle:"Regular", fontSize:"10px"}}>run errand</p></div>
        </div>
        <div className="sidebar-main">
        <div className="Boxholder">DashBoard</div>
         <div className="Boxholder">DashBoard</div>
          <div className="Boxholder">DashBoard</div>
           <div className="Boxholder">DashBoard</div>
            <div className="Boxholder">DashBoard</div>
        </div>
        <div className="side-bar-content">

        </div>
      </aside>

      <div className="main-section">
        <header className="header">
          <div className="input-holder">
            <IoIosSearch className="search-icons-runner"/> <input type="text" placeholder="Search errands, runner" className="input" />
          </div>
         <div className="wrapper-notification-profile">
          <div className="profile-notification-box">
          <div className="notification"><IoMdNotificationsOutline className="notify"/></div>
         <div className="red-box"><span style={{fontFamily:"Poppins",fontSize:"13px",color:"white",fontStyle:"Regular",fontWeight:"400"}}>3</span> </div>
          </div>
          <article className="wrapper-profile-shit">
        
          <div className="Profile-layout-box-runner">
            <div className="profile-pic-layout">
            <img src= {Profile} alt="" />
            </div>

          </div>
           <div className="Profile-name-user-holder">
            <h1 className="profile-h1-runner">John Doe</h1>
            <p className="profile-p-runner">runner</p>
       </div>
       </article>
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
