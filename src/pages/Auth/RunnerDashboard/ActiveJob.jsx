import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ActiveJob.css";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import Negotiation from "../../../Components/RunnerModal/Negotiation";

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const ActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [negotiateModal, setNegotiateModal] = useState(false);
  const [selectedErrand, setSelectedErrand] = useState(null);

  const statsData = [
    { label: "Active Jobs", value: jobs.length, icon: "" },
    { label: "Est Total Time", value: "20 Mins", icon: "" },
    { label: "Total Distance", value: "7 miles", icon: "" },
    { label: "Average Ratings", value: 4.7, icon: "" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/errand/getAll`);
        const fetchedData = response.data.data;
        if (Array.isArray(fetchedData)) {
          setJobs(fetchedData);
        } else if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          setError("Data retrieved, but not in expected list format.");
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading jobs...
      </div>
    );

  if (error)
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        Error fetching data: {error}
      </div>
    );

  return (
    <div className="card-container-wrapper">
      <h1
        style={{
          marginBottom: "1.5rem",
          fontFamily: "Poppins",
          fontSize: "2rem",
        }}
      >
        Active Jobs
      </h1>

      {/* Stats */}
      <div className="card-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <p className="stat-label">{stat.label}</p>
            </div>
            <h2 className="stat-value">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <p style={{ marginTop: "2rem", textAlign: "center" }}>
          No active jobs found.
        </p>
      ) : (
        jobs.map((job, index) => (
          <div
            key={job._id || index}
            className="document-card"
            style={{ marginBottom: "1rem" }}
          >
            <h2 className="card-title">
              Pickup Document (Job #{job._id ? job._id.slice(-4) : index + 1})
            </h2>

            <div className="document-details-row">
              <div className="location-item">
                <p className="location-label">
                  <CiLocationOn style={{ color: "black", fontSize: "1rem" }} />{" "}
                  Pickup
                </p>
                <p className="location-address">
                  {job.pickupAddress || job.pickupLocation || "N/A"}
                </p>
              </div>

              <div className="location-item right-align">
                <p className="location-label">
                  <CiLocationOn style={{ color: "black", fontSize: "1rem" }} />{" "}
                  Delivery
                </p>
                <p className="location-address">
                  {job.deliveryAddress || job.deliveryLocation || "N/A"}
                </p>
              </div>
            </div>

            <div className="bottom-info-row">
              <div className="price-time-info">
                <CiClock2 />{" "}
                {new Date(job.createdAt).toLocaleDateString() || "N/A"}{" "}
                <span className="detail-icon naira-symbol">₦</span>{" "}
                {job.price ? job.price.toLocaleString() : "N/A"}
              </div>

              {/* open modal */}
              <button
                className="negotiation-button"
                onClick={() => {
                  setSelectedErrand(job);
                  setNegotiateModal(true);
                }}
              >
                Start Negotiation
              </button>
            </div>

            {/* show modal */}
            {negotiateModal && selectedErrand && (
              <Negotiation
                close={() => setNegotiateModal(false)}
                errand={selectedErrand} // pass the real errand data here
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveJobs;
