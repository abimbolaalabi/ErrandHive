import React, { useEffect, useState } from 'react'
import { BsClock } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { useNavigate, useParams } from 'react-router-dom'
import "./MyErrandDetails.css"
import axios from 'axios'
import ModalProposal from '../../Components/ModalProposal/ModalProposal'
import ReviewModal from '../../Components/ReviewPropModal/ReviewModal'


const MyErrandsDetails = () => {
    const { errandId } = useParams()
    const [errand, setErrand] = useState(
        {}
    )
    const [allerrand, setAllErrand] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalProp, setModProp] = useState(false)
    const [review, setReview] = useState(false)
    const [info, setInfo] = useState({
        errandId: "",
        runnerId: ""
    })
    console.log("first", review)


    const BaseUrl = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    const formatDate = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

  
    const getErrandById = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/errand/get/${errandId}`)
            setErrand(response?.data?.data)
            // console.log(response.data)
        } catch (error) {
            console.log("This is the errand error", error)
        }
    }

    const getAllErrands = async () => {
        try {

            setLoading(true);

            const token = localStorage.getItem("userToken");
            if (!token) {
                console.log("No token found");
                setAllErrand([]);
                return;
            }

            const response = await axios.get(`${BaseUrl}/errand/${errandId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setAllErrand(response?.data?.data)
            console.log(response.data.data)
        } catch (error) {
            console.log("This is the errand error", error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getErrandById()
        getAllErrands()
    }, [])



    return (
        <div className='my-errand-detail'>
            <p className="back-link" onClick={()=> navigate("/dashboard/my-errands")}>← Back to my errands</p>

            {/* Errand Card */}
            <div className="recents-card">
                <div className="recents-header">
                    <h4>{errand.title}</h4>
                    <span className="statuss-badge">{errand.status}</span>
                </div>

                <div className="pickups-delivery-row">
                    <div className="pickups-section">
                        <p className="icons-text">
                            <CiLocationOn size={18} /> <span className="label">Pickup location</span>
                        </p>
                        <p className="addresss">{errand?.pickupAddress}<br />Contact: {errand?.pickupContact}</p>
                    </div>

                    <div className="deliverys-section">
                        <p className="icons-text">
                            <CiLocationOn size={18} /> <span className="label">Delivery location</span>
                        </p>
                        <p className="addresss">{errand?.deliveryAddress}</p>
                    </div>
                </div>

                <div className="recents-footer">
                    <p className="dates">
                        <BsClock size={17} />  {formatDate(errand?.createdAt)}
                    </p>
                    <p className="prices">₦{Number(errand?.price ?? 0).toLocaleString()}</p>
                </div>
            </div>

            {/* Runner Applications Section */}
            <div className="runner-applications">
                <h3>Runner Applications</h3>
                <p className="runner-subtitle">Review and select a runner for your request</p>

                {allerrand && allerrand.length > 0 ? (
                    allerrand.map((item, id) => (
                        <div className="runner-card" key={id}>
                            <div className="initials-circle">
                                {item?.runner?.firstName?.charAt(0).toUpperCase() + item?.runner?.lastName?.charAt(0).toUpperCase()}
                            </div>

                            <div className="runner-info">
                                <div className="top-row">
                                    <h4 className="runner-name">{item?.runner?.firstName} {item?.runner?.lastName}  </h4>
                                    <button className="view-btn" onClick={() => {setModProp(true); setInfo({errandId: item?.errandId, runnerId: item?.runnerId})}}>View application</button>
                                </div>

                                <p className="runner-rating">
                                    ⭐ {item.rating} • {item?.runner?.totalJobs} jobs
                                </p>

                                <p className="runner-bio">{item?.runner?.bio}</p>

                                <p className="runner-price"> ₦{item?.bidPrice}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Application Yet</p>
                )}
            </div>

            {
                modalProp && (<ModalProposal toclose={setModProp} setReview={setReview} info={info}/>)
            }

              {
                review && (<ReviewModal close={setReview} />)
            }

        </div >
    )
}

export default MyErrandsDetails


// {runners.map((runner, index) => (
//     <div className="runner-card" key={index}>

//         <div className="initials-circle">
//             {runner.name.split(" ").map(n => n[0]).join("")}
//         </div>

//         <div className="runner-info">

//             <div className="top-row">
//                 <h4 className="runner-name">{runner.name}</h4>
//                 <button className="view-btn" onClick={() =>setModProp(true)}>View application</button>
//             </div>

//             <p className="runner-rating">
//                 ⭐ {runner.rating} • {runner.jobs} jobs
//             </p>

//             <p className="runner-bio">{runner.bio}</p>

//             <p className="runner-price">{runner.amount}</p>
//         </div>

//     </div>
// ))}