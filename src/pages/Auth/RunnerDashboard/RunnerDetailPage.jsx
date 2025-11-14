import React, { useEffect, useState } from "react";
import "./RunnerDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RunnerDetailPage = () => {
    const [details, setDetails]  = useState({})
    const {runnerId} = useParams()
    console.log(" checking id   ", runnerId)
    const navigate = useNavigate()
    const BaseUrl = import.meta.env.VITE_BASE_URL

      const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

    const fetchErrand =async ()=> {
        try {
                  const token = JSON.parse(localStorage.getItem("userToken"));
        const res = await axios.get(`${BaseUrl}/errand/get/${runnerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setDetails(res?.data?.data)

 console.log("This is rdttt",res?.data?.data);
 
            
        } catch (error) {
            console.log("this error",error);
            
        }

    }
    useEffect(()=>{
        fetchErrand()
    },[])
     console.log("This is rdt",details);
  return (
    <div className="runnerDetailPage-container">
      {/* Back Link */}
      {/* <div className="runnerDetailPage-back-link">
        <span>Back to my errands</span>
      </div> */}

      {/* Main Content */}
      <main className="runnerDetailPage-main-content">
        {/* Errand Card */}
        <div className="runnerDetailPage-errand-card">
          <div className="runnerDetailPage-errand-header">
            <h2>{details?.title}</h2>
            <span className="runnerDetailPage-status-badge">{details?.status}</span>
          </div>

          <div className="runnerDetailPages-locations">
            <div className="runnerDetailPage-location pickup">
              <strong>Pickup Location</strong>
              <p>{details?.pickupAddress}</p>
           
            </div>
            <div className="runnerDetailPage-location delivery">
              <strong>Delivery Location</strong>
              <p>{details?.deliveryAddress}</p>
            
            </div>
          </div>

          <div className="runnerDetailPage-instruction">
            <strong>Instruction:</strong> { details?.description}
          </div>

          <div className="runnerDetailPage-footer-row">
            <span className="runnerDetailPage-date">{formatDate(details.createdAt)}</span>
            <span className="runnerDetailPage-price"> ₦{details?.price}</span>
          </div>
        </div>

        {/* Customer & Progress Section */}
        <div className="runnerDetailPage-bottom-section">
          {/* Customer Info */}
          <div className="runnerDetailPage-customer-card">
            <h3>Customer</h3>
            <div className="runnerDetailPage-customer-info">
              <div className="runnerDetailPage-avatar">JD</div>
              <div className="runnerDetailPage-details">
                <h4>John Doe</h4>
                <div className="runnerDetailPage-rating">{details?.assignedRunner?.rating}</div>
                <div className="runnerDetailPage-jobs">{details?.assignedRunner?.totalJobs} jobs</div>
              </div>
            </div>
            <button className="runnerDetailPage-chat-btn" onClick={()=>window.location.href =`https://errand-hive.vercel.app/runnerlayout/runnermessage/${runnerId}`}>Chat with Client</button>
            <button className="runnerDetailPage-otp-btn">Request OTP</button>
          </div>

          {/* Delivery Progress */}
          <div className="runnerDetailPage-progress-card">
            <h3>Delivery Progress</h3>
            <div className="runnerDetailPage-progress-timeline">
              {[
                { label: "Order assigned", time: "Oct 19, 10:00am", done: true },
                { label: "Runner heading to pickup", time: "Oct 19, 10:00am", done: true },
                { label: "Runner arrived at pickup location", time: "Oct 19, 10:00am", done: true },
                { label: "Item picked up with (OTP)", time: "Oct 19, 10:00am", done: true },
                { label: "Runner heading to delivery location", time: "Oct 19, 10:00am", done: true },
                { label: "Runner arrived at delivery location", time: "Oct 19, 10:00am", done: true },
                { label: "Delivery confirmed (OTP)", time: "Oct 19, 10:00am", done: false },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`runnerDetailPage-progress-step ${step.done ? "done" : ""}`}
                >
                  <div className="runnerDetailPage-step-circle">
                    {step.done ? "✓" : ""}
                  </div>
                  <div className="runnerDetailPage-step-content">
                    <div className="runnerDetailPage-step-label">{step.label}</div>
                    <div className="runnerDetailPage-step-time">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RunnerDetailPage;
