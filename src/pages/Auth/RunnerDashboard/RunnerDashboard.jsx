import React, { useContext, useEffect, useState } from "react";
import "./Runerdashboard.css";
import cube from "../../../assets/cube.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../Context/App";

const RunnerDashboard = () => {
  const [summary, setSummary] = useState({});
   const{getAUser} = useContext(AppContext)
   const[kycStatus, setKycStatus] = useState(null)
    const [kycReason, setKycReason] = useState("")
  const storedUser = JSON.parse(localStorage.getItem("userDetails")) || {};
  const userKyc = localStorage.getItem("userKyc");   
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const fullName = `${storedUser?.firstName || ""} ${storedUser?.lastName || ""}`.trim();
  
  const runnerSummaryDashBoard = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/runner/dashboard-summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res?.data?.data || {});
    } catch (error) {
      console.log("Runner summary error:", error);
    }
  };

    const getKyc = async () => {
    try {
       const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios.get(`${BaseUrl}/kyc/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const kyc = res?.data?.data;

      console.log("kyc", kyc)
      if (kyc && kyc.status) {
        const status = kyc.status.toLowerCase();
        setKycStatus(status);
        setKycReason(kyc.reason || "");
        localStorage.setItem("userKyc", (status === "verified" || status === "approved").toString());
      } else {
        setKycStatus(null);
        localStorage.setItem("userKyc", "false");
      }
    } catch (error) {
      console.error("KYC fetch error:", error);
      setKycStatus(null);
      localStorage.setItem("userKyc", "false");
    }
  };

  useEffect(() => {
    runnerSummaryDashBoard();
    getAUser()
    getKyc()
  }, []);

  const data = [
    {
      title: "Total Request",
      value: summary?.totalRequests ?? 0,
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
      value: summary?.completedJobs ?? 0,
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
      value: summary?.activeJobs ?? 0,
      color: "#8133F1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
    },
    {
      title: "Total Earnings",
      value: `₦${Number(summary?.totalEarnings ?? 0).toLocaleString()}`,
      color: "#F97316",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M6 10h12" />
          <path d="M6 14h12" />
        </svg>
      ),
    },
  ];

  const isVerified = !!userKyc; 

  return (
    <main className="runner-dashboard-layout">
      <div className="title-dashboard-runner">
        <h1>Welcome to your dashboard {fullName || "User"}! 👋</h1>
      </div>

    
     {!isVerified ? (
  <>
    <div className="e-grid-t">
      {data.map((e, index) => (
        <div key={index} className="e-card-t">
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

    <div className="dashboard-kyc">
      <div className="cube-holder">
        <img src={cube} alt="kyc cube" />
      </div>

      <p className="kyc-reminder">You have not completed KYC yet.</p>
      <p className="complete-kyc">Complete KYC to access runner jobs</p>

      <div className="kyc-btn-holder">
        <Link to="/runnerlayout/runnerprofile">
          <button className="kyc-btn">Complete KYC</button>
        </Link>
      </div>
    </div>
  </>
) : (
  <>
    <div className="e-grid-t">
      {data.map((e, index) => (
        <div key={index} className="e-card-t">
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

    <div className="dashboard-kyc">
      <h2>Ready to start earning?</h2>
      <p className="kyc-reminder">You have no active job yet</p>

      <div className="kyc-btn-holder" style={{ marginTop: "20px" }}>
        <Link to="/runnerlayout/runneractive">
          <button className="kyc-btn browse-btn">Browse Jobs</button>
        </Link>
      </div>
    </div>
  </>
)}

    </main>
  );
};

export default RunnerDashboard;
