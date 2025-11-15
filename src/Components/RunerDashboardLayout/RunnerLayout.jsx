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
import Profile from "../../assets/Profile.png";
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const RunnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const token = JSON.parse(localStorage.getItem("userToken"));

  const user = JSON.parse(localStorage.getItem("userDetails")) || {};
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const [assignedErrand, setAssignedErrand] = useState(null);
  const [errand, setErrand] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // ⭐ GET ERRANDS ASSIGNED TO RUNNER
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

    // {
    //   label: "Messages",
    //   icon: <BiMessageRoundedDetail />,
    //   path: assignedErrand
    //     ? `/runnerlayout/runnermessage/${errand.id}`
    //     : "/runnerlayout/runnermessage",
    // },
{
  label: "Messages",
  icon: <BiMessageRoundedDetail />,
  path: "/runnerlayout/runnermessage",   // ALWAYS SHOW LIST FIRST
},

    { label: "Profile", icon: <IoMdPerson />, path: "/runnerlayout/runnerprofile" },
  ];

  const handleLogoutRunner = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="runner-layout-style">
      <aside className="sidebarr-runner">
        <div className="sidebarr-headerr">
          <div className="sidebarr-headerr-title">
            <img
              src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
              alt=""
            />
            <span style={{ color: "#6a20cc", fontFamily: "Poppins", fontWeight: "500", fontSize: "24px" }}>
              ErrandHive
            </span>
          </div>
          <p style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: "400", fontSize: "10px" }}>
            run errand
          </p>
        </div>

        <div className="sidebarr-main">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`Boxholder ${isActive ? "active slide-in" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="log-out-box">
          <button type="submit" className="log-out-btn" onClick={handleLogoutRunner}>
            <IoIosLogOut style={{ fontSize: "1.5rem" }} /> Log out
          </button>
        </div>
      </aside>

      <div className="main-section">
        <header className="header">
          <div className="input-holder">
            <IoIosSearch className="search-icons-runner" />
            <input type="text" placeholder=" Search errands, runner" className="input" />
          </div>

          <div className="wrapper-notification-profile">
            <div className="profile-notification-box">
              <div className="notification">
                <IoMdNotificationsOutline className="notify" />
              </div>
            </div>

            <article className="wrapper-profile-shit">
              <div className="Profile-layout-box-runner">
                <div className="profile-pic-layout">
                  <img src={Profile} alt="" />
                </div>
              </div>

              <div className="Profile-name-user-holder">
                <h1 className="profile-h1-runner">{fullName || "guest"}</h1>
                <p className="profile-p-runner">runner</p>
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
