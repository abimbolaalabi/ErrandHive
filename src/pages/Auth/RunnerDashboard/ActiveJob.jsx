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
  const { user } = useContext(AppContext); 

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobStatus, setJobStatus] = useState({});
  const [negotiateModal, seJJtNegotiateModal] = useState(false);
  const [counterModal, setCounterModal] = useState(false);
  const [selectedErrand, setSelectedErrand] = useState(null);

 
 useEffect(() => {
  const token = JSON.parse(localStorage.getItem("userToken"));

  const fetchJobs = async () => {
    if (!token) {J
      toast.error("User token missing");
      setLoading(false);
      return;
    }

      try {
        const res = await axios.get(`${API_BASE_URL}/errand/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const all = Array.isArray(res.data.data) ? res.data.data : [];

        // Show only jobs NOT assigned to a runner
        const unassigned = all.filter(job => !job.assignedRunner);

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
    setSelectedErrand(job);
    setNegotiateModal(true);
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="card-container-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="active-job-heading">Active Jobs</h1>

      {jobs.length === 0 ? (
        <div className="dashboard-kyc verified-kyc">
          <p className="kyc-reminder">No active jobs available at the moment.</p>
        </div>
      ) : (
        jobs.map((job) => (
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
                <CiClock2 /> {new Date(job.createdAt).toLocaleString()} • ₦
                {job.price?.toLocaleString() || "0"}
              </div>

              <button
                className="negotiation-button"
                onClick={() => handleStartNegotiation(job)}
              >
                Start Negotiation
              </button>
            </div>
          </div>
        ))
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
          task={selectedErrand}
        />
      )}
    </div>
  );
};
//giy

export default ActiveJobs;
//kkkkrrrhhh
