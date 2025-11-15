import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyErrandPage.css';
import ModalErrand from '../../Components/ModalErrand/ModalErrand';
import { CiLocationOn } from "react-icons/ci";
import { BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MyErrandsPage = () => {
  const [errandmod, setErrandMod] = useState(false);
  const [errands, setErrands] = useState([]);
  const [loading, setLoading] = useState(true);
const BaseUrl = import.meta.env.VITE_BASE_URL
  // Format: DD/MM/YYYY
  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const fetchErrands = async () => {
  try {
    setLoading(true);

    const token = JSON.parse(localStorage.getItem("userToken"));
    if (!token) {
      console.log("No token found");
      setErrands([]);
      return;
    }

    const res = await axios.get(
      `${BaseUrl}/errand/my-errands`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setErrands(res?.data?.data || []);
  } catch (err) {
    console.log("Fetch errands error:", err.response?.data || err.message);
    setErrands([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchErrands();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="welcome-seection">
        <div className='new-errand-holder'> 
          <h1 className="welcome-title">My Errands</h1>
          <p className="welcome-subtitle">
            Manage your errands.
          </p>
        </div>
        <button onClick={() => setErrandMod(true)} className='new-errand-btn'> <span className='errand-span-b'>+  New Errand</span></button>
      </div>

      {loading && (
        <p style={{ textAlign: 'center', marginTop: 24 }}>Loading errands...</p>
      )}

      {!loading && errands.length === 0 && (
        <div className="no-errands-section">
          <div className="no-errands-content">
            <div className="no-errands-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
                <polygon points="12 3 4 8 12 13 20 8" />
                <polygon points="4 8 4 16 12 21 12 13" />
                <polygon points="20 8 20 16 12 21 12 13" />
                <rect x="9" y="9" width="6" height="6" fill="currentColor" stroke="none" />
              </svg>
            </div>

            <h2 className="no-errands-title">No errands posted yet</h2>
            <p className="no-errands-subtitle">
              Start by posting your first errand.
            </p>
           
          </div>
        </div>
      )}

      {/* API errands list */}
      {!loading && errands.length > 0 && errands.map((item) => (
        <div key={item.id} className="recent-card">
          <div className="recent-header">
            <h4>{item.title}</h4>
            <span className="status-badge">{item.status || 'Open'}</span>
          </div>

          <div className="pickup-delivery-row">
            <div className="pickup-section">
              <p className="icon-text">
                <CiLocationOn size={18} /> <span className="label">Pickup</span>
              </p>
              <p className="address">{item?.pickupAddress}</p>
            </div>

            <div className="delivery-section">
              <p className="icon-text">
                <CiLocationOn size={18} /> <span className="label">Delivery</span>
              </p>
              <p className="address">{item?.deliveryAddress}</p>
            </div>
          </div>

          <div className="recent-footer">
            <p className="date">
              <BsClock size={17} /> {formatDate(item.createdAt)}
            </p>
            <p className="price">₦{Number(item.price ?? 0).toLocaleString()}</p>

            <button className="details-btn">
              <Link className='link' to={`/dashboard/my-errands/${item.id}`}>View Details</Link>
            </button>
          </div>
        </div>
      ))}

      {errandmod && (<ModalErrand toclose={setErrandMod} />)}
    </div>
  );
};

export default MyErrandsPage;





