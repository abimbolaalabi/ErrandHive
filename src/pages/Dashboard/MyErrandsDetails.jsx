import React from 'react'
import { BsClock } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { useParams } from 'react-router-dom'
import "./MyErrandDetails.css"

const MyErrandsDetails = () => {
    const { errandId } = useParams()

    const runners = [
        {
            name: "John Doe",
            rating: 4.8,
            jobs: 100,
            bio: "Hi! I'm John Doe and I'd love to help with your delivery. I have 100 completed jobs with a 4.8 rating.",
            amount: "₦4,000"
        },
        {
            name: "Emeka Wilson",
            rating: 4.9,
            jobs: 120,
            bio: "Hi! I'm Emeka Wilson and I'd love to help with your delivery. I have 120 completed jobs with a 4.9 rating.",
            amount: "₦3,000"
        },
        {
            name: "Dara Simi",
            rating: 4.7,
            jobs: 108,
            bio: "Hi! I'm Dara Simi and I'd love to help with your delivery. I have 108 completed jobs with a 4.7 rating.",
            amount: "₦3,000"
        },
    ]

    return (
        <div className='my-errand-detail'>
            <p className="back-link">← Back to my errands</p>
            {errandId}
        
            {/* Errand Card */}
            <div className="recents-card">
                <div className="recents-header">
                    <h4>Pickup Document</h4>
                    <span className="statuss-badge">Pending</span>
                </div>

                <div className="pickups-delivery-row">
                    <div className="pickups-section">
                        <p className="icons-text">
                            <CiLocationOn size={18} /> <span className="label">Pickup location</span>
                        </p>
                        <p className="addresss">40 Muyibi street<br />Contact: 090878654321</p>
                    </div>

                    <div className="deliverys-section">
                        <p className="icons-text">
                            <CiLocationOn size={18} /> <span className="label">Delivery location</span>
                        </p>
                        <p className="addresss">50 Kirikiri road</p>
                    </div>
                </div>

                <div className="recents-footer">
                    <p className="dates">
                        <BsClock size={17} /> 20/10/2025
                    </p>
                    <p className="prices">₦3,000</p>
                </div>
            </div>

            {/* Runner Applications Section */}
            <div className="runner-applications">
                <h3>Runner Applications</h3>
                <p className="runner-subtitle">Review and select a runner for your request</p>

                {runners.map((runner, index) => (
                    <div className="runner-card" key={index}>

                        <div className="initials-circle">
                            {runner.name.split(" ").map(n => n[0]).join("")}
                        </div>

                        <div className="runner-info">

                            <div className="top-row">
                                <h4 className="runner-name">{runner.name}</h4>
                                <button className="view-btn">View application</button>
                            </div>

                            <p className="runner-rating">
                                ⭐ {runner.rating} • {runner.jobs} jobs
                            </p>

                            <p className="runner-bio">{runner.bio}</p>

                            <p className="runner-price">{runner.amount}</p>
                        </div>

                    </div>
                ))}



            </div>

        </div>
    )
}

export default MyErrandsDetails
