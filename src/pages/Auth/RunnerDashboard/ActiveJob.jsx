import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ActiveJob.css";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import Negotiation from "../../../Components/RunnerModal/Negotiation";
import CounterSuccess from "../../../Components/RunnerModal/CounterSucces";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../Context/App";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const ActiveJobs = () => {
  const { user } = useContext(AppContext); // user and KYC info if needed

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobStatus, setJobStatus] = useState({});
  const [negotiateModal, setNegotiateModal] = useState(false);
  const [counterModal, setCounterModal] = useState(false);
  const [selectedErrand, setSelectedErrand] = useState(null);

  // ✅ Fetch jobs
 useEffect(() => {
  const token = JSON.parse(localStorage.getItem("userToken"));

  const fetchJobs = async () => {
    if (!token) {
      toast.error("User token missing");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/errand/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const all = Array.isArray(res.data.data) ? res.data.data : [];

      // 🔥 FILTER ONLY UNASSIGNED ERRANDS
      const unassigned = all.filter(job => !job.assignedTo);

      setJobs(unassigned);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);


  const handleStartNegotiation = (job) => {
    if (!jobStatus[job._id]) {
      setSelectedErrand(job);
      setNegotiateModal(true);
    } else {
      toast.info("This job has already been proposed/accepted.");
    }
  };

  // ✅ Compute totals
  const totalTime = jobs.reduce((acc, job) => acc + (job.estimatedTime || 0), 0);
  const totalDistance = jobs.reduce((acc, job) => acc + (job.distance || 0), 0);
  const userRating = user?.rating || 0;

  const statsData = [
    { label: "Active Jobs", value: jobs.length },
    { label: "Est Total Time", value: `${totalTime} mins` },
    { label: "Total Distance", value: `${totalDistance} miles` },
    { label: "Average Ratings", value: userRating },
  ];

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading jobs...
      </div>
    );

  return (
    <div className="card-container-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="active-job-heading">Active Jobs</h1>

      {/* ✅ Stats boxes */}
      <div className="card-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* ✅ Jobs list */}
      {jobs.length === 0 ? (
        <div className="dashboard-kyc verified-kyc">
          <p className="kyc-reminder">
            No active jobs available at the moment.
          </p>
        </div>
      ) : (
        jobs.map((job) => {
          const status = jobStatus[job._id];
          const isButtonDisabled =
            status === "accepted" || status === "proposed";
          const buttonText = isButtonDisabled
            ? "View Details"
            : "Start Negotiation";

          return (
            <div key={job._id} className="document-card">
              <h2 className="card-title">{job.title}</h2>

              <div className="document-details-row">
                <div className="location-item">
                  <p className="location-label">
                    <CiLocationOn /> Pickup
                  </p>
                  <p className="location-address">{job.pickupAddress}</p>
                </div>

                <div className="location-item right-align">
                  <p className="location-label">
                    <CiLocationOn /> Delivery
                  </p>
                  <p className="location-address">{job.deliveryAddress}</p>
                </div>
              </div>

              <div className="bottom-info-row">
                <div className="price-time-info">
                  <CiClock2 />{" "}
                  {new Date(job.createdAt).toLocaleString()} ₦
                  {job.price?.toLocaleString() || "0"}
                </div>

                <button
                  className={`negotiation-button ${
                    isButtonDisabled ? "view-details-btn" : ""
                  }`}
                  onClick={() => handleStartNegotiation(job)}
                  disabled={isButtonDisabled}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          );
        })
      )}

     
      {negotiateModal && selectedErrand && (
        <Negotiation
          close={() => setNegotiateModal(false)}
          errand={selectedErrand}
        />
      )}

      {counterModal && selectedErrand && (
        <CounterSuccess
          close={() => setCounterModal(false)}
          errand={selectedErrand}
        />
      )}
    </div>
  );
};

export default ActiveJobs;
