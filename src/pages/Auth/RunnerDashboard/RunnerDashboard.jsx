import React, { useContext } from "react";
import "./Runerdashboard.css";
import cube from "../../../assets/cube.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/App"; // adjust path if needed

const RunnerDashboard = () => {
  const navigate = useNavigate();

  const { user, userKyc, kycStatus } = useContext(AppContext);

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const totalRequests = 15;
  const completed = 10;
  const active = 5;
  const totalSpent = 25000;

  const stats = [
    {
      title: "Total Request",
      value: userKyc ? totalRequests : "0",
      color: "#8133F1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      ),
    },
    {
      title: "Completed",
      value: userKyc ? completed : "0",
      color: "#F59E0B",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22,4 12,14.01 9,11.01" />
        </svg>
      ),
    },
    {
      title: "Active",
      value: userKyc ? active : "0",
      color: "#8133F1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
    },
    {
      title: "Total Spent",
      value: userKyc ? `₦${totalSpent.toLocaleString()}` : "₦0",
      color: "#F97316",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <g strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 16V8" />
            <path d="M16 16V8" />
            <path d="M8 8l8 8" />
            <path d="M6 10h12" />
            <path d="M6 14h12" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <main className="runner-dashboard-layout">
      <div className="title-dashboard-runner">
        <h1>Welcome to your dashboard {fullName || "User"}! 👋</h1>
      </div>

      {/* Dashboard cards */}
      <div className="e-grid-t">
        {stats.map((e, index) => (
          <div key={index} className={`e-card-t ${!userKyc ? "inactive-card" : ""}`}>
            <div className="e-content-t">
              <h3 className="e-title-t">{e.title}</h3>
              <p className="e-value-t">{e.value}</p>
            </div>
            <div className="e-icon-t" style={{ color: e.color }}>
              {e.icon}
            </div>
          </div>
        ))}
      </div>

      {/* KYC messages */}
      {kycStatus === "pending" && (
        <div className="dashboard-kyc">
          <div className="cube-holder">
            <img src={cube} alt="kyc cube" />
          </div>
          <p className="kyc-reminder">Your KYC is under review.</p>
          <p className="complete-kyc">Please wait for approval to access jobs.</p>
        </div>
      )}

      {!userKyc && kycStatus !== "pending" && (


        <div className="dashboard-kyc">
          <div className="cube-holder">
            <img src={cube} alt="kyc cube" />
          </div>
          <p className="kyc-reminder">You have not completed KYC yet.</p>
          <p className="complete-kyc">Complete KYC to get available jobs.</p>
          <div className="kyc-btn-holder">
            <button type="button" className="kyc-btn" onClick={() => navigate("runnerprofile")}>
              Complete KYC
            </button>
          </div>
        </div>
        
      )}
{              console.log(userKyc)
}
      {userKyc && (
        <div className="dashboard-kyc verified-kyc">
          <div className="cube-browse-holder">
            <img src={cube} alt="cube" className="cube-browse-img" />
          </div>
          <p className="kyc-reminder">Ready to start earning</p>
          <p className="kyc-reminder-p-tag">
            There are jobs available right now. Browse and accept your first errand to get started
          </p>
          <div className="kyc-btn-holder" style={{ marginTop: "20px" }}>
            <Link to="/runnerlayout/runneractive">
              <button className="kyc-btn-browse-btn">Browse Jobs</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default RunnerDashboard;
