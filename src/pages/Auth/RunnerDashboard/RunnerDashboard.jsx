import React, { useEffect, useState } from "react";
import "./Runerdashboard.css";
import cube from "../../../assets/cube.png";
import { Link } from "react-router-dom";

const RunnerDashboard = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user?.kycStatus === "Verified") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  const data = [
    { title: "Total Request", value: "0", color: "#8133F1" },
    { title: "Completed", value: "0", color: "#F59E0B" },
    { title: "Active", value: "0", color: "#10B981" },
    { title: "Total Spent", value: "0", color: "#F97316" },
  ];

  return (
    <main className="runner-dashboard-layout">
      <div className="title-dashboard-runner">
        <h1>Welcome to your dashboard 👋</h1>
      </div>

      {/* ✅ Summary boxes (always visible) */}
      <div className="e-grid-t">
        {data.map((e, i) => (
          <div key={i} className="e-card-t" style={{ borderColor: e.color }}>
            <div className="e-content-t">
              <h3 className="e-title-t">{e.title}</h3>
              <p className="e-value-t">{e.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🚫 If not verified, show this reminder */}
      {!isVerified && (
        <div className="dashboard-kyc">
          <div className="cube-holder">
            <img src={cube} alt="kyc cube" />
          </div>
          <p className="kyc-reminder">You have not completed KYC yet.</p>
          <p className="complete-kyc">Complete KYC to unlock more features.</p>
          <div className="kyc-btn-holder">
            <Link to="/runnerlayout/runnerprofile">
              <button className="kyc-btn">Complete KYC</button>
            </Link>
          </div>
        </div>
      )}

      {/* ✅ If verified, show normal content */}
      {isVerified && (
        <div className="dashboard-kyc">
          <img src={cube} alt="" />
          <p className="kyc-reminder">You have no active job yet</p>

          <div className="kyc-btn-holder" style={{ marginTop: "20px" }}>
            <Link to="/runnerlayout/runneractive">
              <button className="kyc-btn browse-btn">Browse Jobs</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default RunnerDashboard;
