import "./RunnerLayout.css";
import { IoIosSearch } from "react-icons/io";
import { 
  IoMdNotificationsOutline, 
  IoMdPerson, 
  IoMdWallet, 
  IoIosLogOut
} from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRunning } from "react-icons/fa";  
import Profile from "../../assets/Profile.png"; // Assuming this is your user profile image
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const RunnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("userToken"));
  const user = JSON.parse(localStorage.getItem("userDetails")) || {};
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  // State variables for data fetching (kept for completeness)
  const [assignedErrand, setAssignedErrand] = useState(null);
  const [errand, setErrand] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // ⭐ GET ERRANDS ASSIGNED TO RUNNER (Kept original logic)
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

  // ⭐ MENU ITEMS
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

  // Logic to determine active link path
  const currentPath = location.pathname.endsWith('/') && location.pathname.length > 1 
                      ? location.pathname.slice(0, -1) 
                      : location.pathname;


  return (
    <div className="runner-layout-style">
      {/* Sidebar - fixed width */}
      <aside className="sidebarr-runner">
        <div className="sidebarr-headerr">
          <div className="sidebarr-headerr-title">
            <img
              src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
              alt="ErrandHive Logo"
            />
            <span className="sidebar-title-text">
              ErrandHive
            </span>
          </div>
          <p className="sidebar-subtitle-text">
            run errands
          </p>
        </div>

        {/* Sidebar Main Menu */}
        <div className="sidebarr-main">
          {menuItems.map((item, index) => {
            // Dashboard should be active if path is exactly '/runnerlayout' or the base route
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
        
        {/* Log Out Button restyled as a menu item */}
        <div className="log-out-box">
          <div 
            onClick={handleLogoutRunner} 
            className="Boxholder log-out-link"
          >
            <span className="sidebar-icon logout-icon">
              <IoIosLogOut />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Section */}
      <div className="main-section">
        {/* Header/Navbar - CORRECTED */}
        <header className="header">
          {/* Search Bar */}
          <div className="input-holder">
            {/* <IoIosSearch className="search-icons-runner" />
            <input 
              type="text" 
              placeholder=" Search errands, runners..." // Corrected placeholder
              className="input search-input" 
            /> */}
          </div>

          <div className="wrapper-notification-profile">
            {/* Notification Icon */}
            <div className="profile-notification-box">
              <div className="notification">
                <IoMdNotificationsOutline className="notify" />
              </div>
            </div>

            {/* Profile Info (Reordered to match: Picture then Name) */}
            <article className="wrapper-profile-shit">
              
              {/* Profile Picture Box (Left in the profile group) */}
              <div className="Profile-layout-box-runner">
                <div className="profile-pic-layout">
                  <img src={Profile} alt="User Profile" />
                </div>
              </div>
              
              {/* Name and Role Holder (Right in the profile group) */}
              <div className="Profile-name-user-holder">
                <h1 className="profile-h1-runner">{fullName || "John Doe"}</h1> 
                <p className="profile-p-runner">Runner</p>
              </div>
            </article>
          </div>
        </header>

        {/* Content Area */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RunnerLayout;