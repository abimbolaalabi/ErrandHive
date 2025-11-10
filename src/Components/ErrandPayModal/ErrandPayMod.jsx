import React, { useState } from 'react'
import "./ErrandPayMod.css"
import { IoClose } from 'react-icons/io5'
import { PiShieldCheckDuotone } from 'react-icons/pi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const ErrandPayMod = ({toclose, setErrandPay, info}) => {
  const {runnerId} = useParams()
  const BaseUrl = import.meta.env.VITE_BASE_URL;
const token = JSON.parse(localStorage.getItem("userToken"));
const [loading, setLoading] = useState(false);

const handlePayment = async () => {
  try {
    setLoading(true);


    const res = await axios.post(
      `${BaseUrl}/payment/initialize`,{amount:info?.bidPrice
         ,description:info?.title,receiverId:info?.runnerId},
     
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res?.data?.message || "Payment initialized successfully");
    console.log(res.data.message)
    JSON.parse(localStorage.getItem(runnerId))
  } catch (err) {
    console.log("PAYMENT ERROR:", err);
    toast.error(err?.response?.data?.message || "Payment failed");
  } finally {
    setLoading(false);
  }
};

  return (
       <div className="errand-pay-cont">
      <div className="errand-pay-wrapper">

     
        <button className="ep-close" onClick={() => toclose(false)}>
          <IoClose size={22} />
        </button>

     
        <h2 className="ep-title">Errand assigned</h2>
        <p className="ep-sub">Both parties have agreed on the price</p>

    
        <div className="ep-task-box">
          <p className="ep-task-label">Errand Task</p>
          <p className="ep-task-title">{info?.title}</p>
        </div>

      
        <div className="ep-center">
          <div className="ep-success-icon">
            <span>✔</span>
          </div>
          <h3 className="ep-mid-title">Price Agreement Reached!</h3>
          <p className="ep-mid-sub">Both parties have agreed on the final price</p>
        </div>

     
        <div className="ep-price-box">
          <p className="ep-price-label">Final Price</p>
          <p className="ep-price-value">₦{
  info?.bidPrice
    ? Number(info?.bidPrice).toLocaleString()
    : Number(info?.currentPrice || 0).toLocaleString()
}</p>
        </div>

       
        <div className="ep-next-step">
          <PiShieldCheckDuotone size={22} className="ep-shield" />
          <div>
            <p className="ep-next-title">Next Step: Payment</p>
            <p className="ep-next-desc">
              Payment will be held securely until the errand is completed
            </p>
          </div>
        </div>

      
        <button className="ep-pay-btn" onClick={handlePayment}>
           {loading ? "Processing..." : <>Make payment</>}
        </button>

      </div>
    </div>
  )
}

export default ErrandPayMod
