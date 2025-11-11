import React, { useState } from "react";
import "./ErrandPayMod.css";
import { IoClose } from "react-icons/io5";
import { PiShieldCheckDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ErrandPayMod = ({ toclose, setErrandPay, info }) => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()


  const price = info?.bidPrice || info?.currentPrice || 0;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${BaseUrl}/payment/initialize`,
        {
          amount: price,
          description: info?.title || "Errand Payment",
          receiverId: info?.runnerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data)
      const checkoutUrl = res?.data?.data?.koraResponse?.data?.checkout_url

      const ok = res?.data?.success === true;

      if (ok && checkoutUrl) {
        toast.success(res.data.message);
        console.log(res.data.message)
        setTimeout(() => {
          window.location.href = checkoutUrl;
          // window.location.href = url;
          // Navigate(checkoutUrl) 
        }, 1000);
      } else {
        toast.error();
      }
    } catch (err) {
      console.log("PAYMENT ERROR:", err);
      toast.error(err?.data?.message);
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

        <h2 className="ep-title">Errand Assigned</h2>
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
          <p className="ep-mid-sub">
            Both parties have agreed on the final price.
          </p>
        </div>

        <div className="ep-price-box">
          <p className="ep-price-label">Final Price</p>
          <p className="ep-price-value">
            ₦{Number(price).toLocaleString()}
          </p>
        </div>

        <div className="ep-next-step">
          <PiShieldCheckDuotone size={22} className="ep-shield" />
          <div>
            <p className="ep-next-title">Next Step: Payment</p>
            <p className="ep-next-desc">
              Payment will be held securely until the errand is completed.
            </p>
          </div>
        </div>

        <button className="ep-pay-btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Make Payment"}
        </button>
      </div>
    </div>
  );
};

export default ErrandPayMod;

// import React, { useState } from "react";
// import "./ErrandPayMod.css";
// import { IoClose } from "react-icons/io5";
// import { PiShieldCheckDuotone } from "react-icons/pi";
// import { toast } from "react-toastify";
// import axios from "axios";

// const ErrandPayMod = ({ toclose, setErrandPay, info }) => {
//   const BaseUrl = import.meta.env.VITE_BASE_URL;
//   const token = JSON.parse(localStorage.getItem("userToken"));
//   const [loading, setLoading] = useState(false);

//   const price = info.currentPrice || info.bidPrice

//   console.log("Good",price)

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
            
//       const res = await axios.post(
//         `${BaseUrl}/payment/initialize`,
//         {
//           amount: price,
//           description: info?.title,
//           receiverId: info?.runnerId,
//         },
         
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const ok = res?.data?.status  === true;
//       const checkoutUrl = res.data?.data?.koraResponse.data?.checkout_url
       
//       toast.success(res?.data?.message || "Payment initialized successfully");
    
//     } catch (err) {
//       console.log("PAYMENT ERROR:", err);
//       toast.error(err?.response?.data?.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="errand-pay-cont">
//       <div className="errand-pay-wrapper">
//         <button className="ep-close" onClick={() => toclose(false)}>
//           <IoClose size={22} />
//         </button>

//         <h2 className="ep-title">Errand assigned</h2>
//         <p className="ep-sub">Both parties have agreed on the price</p>

//         <div className="ep-task-box">
//           <p className="ep-task-label">Errand Task</p>
//           <p className="ep-task-title">{info?.title}</p>
//         </div>

//         <div className="ep-center">
//           <div className="ep-success-icon">
//             <span>✔</span>
//           </div>
//           <h3 className="ep-mid-title">Price Agreement Reached!</h3>
//           <p className="ep-mid-sub">
//             Both parties have agreed on the final price
//           </p>
//         </div>

//         <div className="ep-price-box">
//           <p className="ep-price-label">Final Price</p>
//           <p className="ep-price-value">
//             ₦
//             {info?.bidPrice
//               ? Number(info?.bidPrice).toLocaleString()
//               : Number(info?.currentPrice || 0).toLocaleString()}
//           </p>
//         </div>

//         <div className="ep-next-step">
//           <PiShieldCheckDuotone size={22} className="ep-shield" />
//           <div>
//             <p className="ep-next-title">Next Step: Payment</p>
//             <p className="ep-next-desc">
//               Payment will be held securely until the errand is completed
//             </p>
//           </div>
//         </div>

//         <button className="ep-pay-btn" onClick={handlePayment}>
//           {loading ? "Processing..." : "Make payment"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ErrandPayMod;
