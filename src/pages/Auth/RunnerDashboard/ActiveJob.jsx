import React from 'react';
import "./ActiveJob.css"
import { CiLocationOn,CiClock2  } from "react-icons/ci";
const ActiveJobs = () => {
    const stats = [
        { label: "Active Jobs", value: 1, icon: "📦" },
        { label: "Est Total Time", value: "20 Mins", icon: "⏱️" },
        { label: "Total Distance", value: "7 miles", icon: "📍" },
        { label: "Average Ratings", value: 4.7, icon: "⭐" },
    ];

    return (
        <div className="card-container-wrapper">
            <div className="card-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-header">
                            <p className="stat-label">{stat.label}</p>
                            <span className={`stat-icon ${stat.label === 'Average Ratings' ? 'rating-star' : ''}`}>
                                {stat.icon}
                            </span>
                        </div>
                        <h2 className="stat-value">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="document-card">
                <h2 className="card-title">Pickup Document</h2>

                <div className="document-details-row">
                    <div className="location-item"> 
                        <p className="location-label">
                            <span className="detail-icon"><CiLocationOn/></span> Pickup
                        </p>
                        <p className="location-address">40 Muyibi street</p>
                    </div>

                    <div className="location-item right-align">
                        <p className="location-label">
                            Delivery <span className="detail-icon"></span>
                        </p>
                        <p className="location-address">50 Kirikiri road</p>
                    </div>
                </div>

                <div className="bottom-info-row">
                    <div className="price-time-info">
                        <span className="detail-icon"><CiClock2 /></span> 20/10/2025
                        <span className="detail-icon naira-symbol">₦</span> 3,000
                    </div>

                    <button className="negotiation-button">
                        Start Negotiation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActiveJobs;