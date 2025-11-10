
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
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const RunnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation()
  
  const handleLogoutRunner = () => {
  localStorage.removeItem("userToken");
  navigate("/");
};
  
  const menuItems = [
    { label: "Dashboard", icon: <MdOutlineDashboard />, path: "/runnerlayout" },
    { label: "Active Jobs", icon: <FaRunning />, path: "/runnerlayout/runneractive" },
    { label: "My Earnings", icon: <IoMdWallet />, path: "/runnerlayout/runnerearning" },
    { label: "Messages", icon: <BiMessageRoundedDetail />, path: "/runnerlayout/runnermessage" },
    { label: "Profile", icon: <IoMdPerson />, path: "/runnerlayout/runnerprofile" },
  ];


  const user = JSON.parse(localStorage.getItem("userDetails"))||{}
  const fullName = `${user?.fullName || ""} ${user?.lastName || ""}`.trim()
  return (
    <div className="runner-layout-style">
      <aside className="sidebar-runner">
        <div className="sidebar-header">
          <div className="sidebar-header-title">
            <img
              src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
              alt=""
            />
            <span style={{ color: "#6a20cc", fontFamily: "Poppins", fontWeight: "500", fontSize: "24px" }}>
              ErrandHive
            </span>
          </div>
          <div>
            <p style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: "400", fontSize: "10px" }}>
              run errand
            </p>
          </div>
        </div>

        <div className="sidebar-main">
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
          <button type="submit" className="log-out-btn"
        onClick={handleLogoutRunner}
          >
            
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
              {/* <div className="red-box"> */}
                {/* <span style={{ fontFamily: "Poppins", fontSize: "13px", color: "white" }}>3</span> */}
              {/* </div> */}
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
