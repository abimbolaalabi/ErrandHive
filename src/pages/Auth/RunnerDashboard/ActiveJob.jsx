import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ActiveJob.css";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import Negotiation from "../../../Components/RunnerModal/Negotiation";
import CounterSuccess from "../../../Components/RunnerModal/CounterSucces";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../Context/App"

const API_BASE_URL = "https://errandhive-project.onrender.com/api/v1";

const ActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [negotiateModal, setNegotiateModal] = useState(false);
  const [counterModal, setCounterModal] = useState(false);
  const [selectedErrand, setSelectedErrand] = useState(null);
  const [jobStatus, setJobStatus] = useState({});
  const [userRating, setUserRating] = useState(0);

  
  const { userKyc, kycStatus } = useContext(AppContext);

  const isVerified = userKyc;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    const fetchUserRating = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const rating = response?.data?.data?.rating || 0;
        setUserRating(rating);
      } catch (error) {
        console.error("Failed to fetch user rating:", error);
        setUserRating(0);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/errand/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedData = response.data.data;
        setJobs(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRating();
    fetchJobs();
  }, []);


  const totalTime = jobs.reduce((acc, job) => acc + (job.estimatedTime || 0), 0);
  const totalDistance = jobs.reduce((acc, job) => acc + (job.distance || 0), 0);

  const statsData = [
    { label: "Active Jobs", value: isVerified ? jobs.length : 0 },
    { label: "Est Total Time", value: isVerified ? `${totalTime} Mins` : "0 Mins" },
    { label: "Total Distance", value: isVerified ? `${totalDistance} miles` : "0 miles" },
    { label: "Average Ratings", value: isVerified ? userRating : 0 },
  ];

  const handleStartNegotiation = (job) => {
    if (!jobStatus[job._id]) {
      setSelectedErrand(job);
      setNegotiateModal(true);
    } else {
      toast.info("This job has already been proposed/accepted.");
    }
  };

  const handleProposePrice = async (job, price) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        `${API_BASE_URL}/errand/proposePrice`,
        { jobId: job._id, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobStatus((prev) => ({ ...prev, [job._id]: "proposed" }));
      setNegotiateModal(false);
      setSelectedErrand(job);
      setCounterModal(true);
      toast.success("Counter offer sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send counter offer.");
    }
  };

  if (loading)
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading jobs...</div>;
  if (error)
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        Error fetching data: {error}
      </div>
    );

  return (
    <div className="card-container-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="active-job-heading">Active Jobs</h1>

      <div className="card-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">{stat.value}</h2>
          </div>
        ))}
      </div>

      {!isVerified && (
        <div className="dashboard-kyc">
          {kycStatus === "pending" ? (
            <>
              <p className="kyc-reminder">Your KYC is under review.</p>
              <p className="complete-kyc">Please wait for approval to access jobs.</p>
            </>
          ) : (
            <>
              <p className="kyc-reminder">You have not completed KYC yet.</p>
              <p className="complete-kyc">Complete KYC to get available jobs.</p>
            </>
          )}
        </div>
      )}

      {isVerified &&
        (jobs.length === 0 ? (
          <div className="dashboard-kyc verified-kyc">
            <p className="kyc-reminder">You have no active job yet.</p>
          </div>
        ) : (
          jobs.map((job, index) => {
            const status = jobStatus[job._id];
            const buttonText =
              status === "accepted" || status === "proposed" ? "View Details" : "Start Negotiation";
            const isButtonDisabled = status === "accepted";

            return (
              <div key={job._id || index} className="document-card">
                <h2 className="card-title">{job?.title}</h2>

                <div className="document-details-row">
                  <div className="location-item">
                    <p className="location-label">
                      <CiLocationOn style={{ fontSize: "1rem" }} /> Pickup
                    </p>
                    <p className="location-address">{job.pickupAddress || job.pickupLocation || "N/A"}</p>
                  </div>

                  <div className="location-item right-align">
                    <p className="location-label">
                      <CiLocationOn style={{ fontSize: "1rem" }} /> Delivery
                    </p>
                    <p className="location-address">{job.deliveryAddress || job.deliveryLocation || "N/A"}</p>
                  </div>
                </div>

                <div className="bottom-info-row">
                  <div className="price-time-info">
                    <CiClock2 />
                    {new Date(job.createdAt).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    ₦{job.price ? job.price.toLocaleString() : "N/A"}
                  </div>

                  <button
                    className={`negotiation-button ${isButtonDisabled ? "view-details-btn" : ""}`}
                    onClick={() => handleStartNegotiation(job)}
                    disabled={isButtonDisabled || status === "proposed"}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            );
          })
        ))}

      {negotiateModal && selectedErrand && (
        <Negotiation
          close={() => setNegotiateModal(false)}
          errand={selectedErrand}
          onAccept={(price) => handleProposePrice(selectedErrand, price)}
        />
      )}

      {counterModal && selectedErrand && (
        <CounterSuccess close={() => setCounterModal(false)} errand={selectedErrand} />
      )}
    </div>
  );
};

export default ActiveJobs;
