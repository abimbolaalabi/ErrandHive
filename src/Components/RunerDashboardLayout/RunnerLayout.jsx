import "./RunnerLayout.css";
import { IoIosSearch } from "react-icons/io";
import {
  IoMdNotificationsOutline,
  IoMdPerson,
  IoMdWallet,
  IoIosLogOut,
} from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRunning } from "react-icons/fa";  
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io"; // Mobile sidebar close
import Profile from "../../assets/Profile.png"; 
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const RunnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("userToken"));
  const user = JSON.parse(localStorage.getItem("userDetails")) || {};
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const [assignedErrand, setAssignedErrand] = useState(null);
  const [errand, setErrand] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const getErrandById = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/errand/my-errands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setErrand(res?.data?.data || null);
    } catch (error) {
      console.log("ERR ERRAND:", error);
    }
  };

  useEffect(() => {
    getErrandById();
  }, []);

  const menuItems = [
    { label: "Dashboard", icon: <MdOutlineDashboard />, path: "/runnerlayout" },
    { label: "Active Jobs", icon: <FaRunning />, path: "/runnerlayout/runneractive" },
    { label: "My Earnings", icon: <IoMdWallet />, path: "/runnerlayout/runnerearning" },
    {
      label: "Messages",
      icon: <BiMessageRoundedDetail />,
      path: "/runnerlayout/runnermessage",
    },
    { label: "Profile", icon: <IoMdPerson />, path: "/runnerlayout/runnerprofile" },
  ];

  const handleLogoutRunner = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const currentPath =
    location.pathname.endsWith("/") && location.pathname.length > 1
      ? location.pathname.slice(0, -1)
      : location.pathname;

  return (
    <div className="runner-layout-style">
      {/* Sidebar */}
      <aside className={`sidebarr-runner ${showSidebar ? "show-mobile-sidebar" : ""}`}>
        <div className="sidebarr-headerr">
          <div className="sidebarr-headerr-title">
            <img
              src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
              alt="ErrandHive Logo"
              className="errand-logo"
            />
            <span className="sidebar-title-text">ErrandHive</span>
          </div>
          <p className="sidebar-subtitle-text">run errands</p>

          {/* MOBILE CLOSE ICON */}
          <button
            className="close-sidebar-btn"
            onClick={() => setShowSidebar(false)}
          >
            <IoMdClose style={{ fontSize: "1.8rem", color: "#8133F1" }} />
          </button>
        </div>

        <div className="sidebarr-main">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path;

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`Boxholder ${isActive ? "active-sidebar-link" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="log-out-box">
          <div onClick={handleLogoutRunner} className="Boxholder log-out-link">
            <span className="sidebar-icon logout-icon">
              <IoIosLogOut style={{ color: "red" }} />
            </span>
            <span style={{ color: "red" }}>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <div className="main-section">
        {/* ⭐ HEADER */}
        <header className="header">
          <button
            className="hamburger-menu"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <GiHamburgerMenu
              style={{ fontSize: "2rem" }}
              className="hamburger-icon"
            />
          </button>

          <div className="input-holder"></div>

          <div className="wrapper-notification-profile">
            <div className="profile-notification-box">
              <div className="notification">
                <IoMdNotificationsOutline className="notify" />
              </div>
            </div>

            <article className="wrapper-profile-shit">
              <div className="Profile-layout-box-runner">
                <div className="profile-pic-layout">
                  {/* <div style={{color:"white"}}>V</div> */}
                  <img src={Profile} alt="User Profile" />
                </div>
              </div>

              <div className="Profile-name-user-holder">
                <h1 className="profile-h1-runner">{fullName || "John Doe"}</h1>
                <p className="profile-p-runner">Runner</p>
              </div>
            </article>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RunnerLayout;
