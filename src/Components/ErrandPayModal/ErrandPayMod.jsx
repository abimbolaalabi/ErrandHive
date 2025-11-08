import React from 'react'
import "./ErrandPayMod.css"
import { IoClose } from 'react-icons/io5'
import { PiShieldCheckDuotone } from 'react-icons/pi'

const ErrandPayMod = ({toclose, setErrandPay}) => {
  return (
       <div className="errand-pay-cont">
      <div className="errand-pay-wrapper">

        {/* Close Icon */}
        <button className="ep-close" onClick={() => toclose(false)}>
          <IoClose size={22} />
        </button>

        {/* Title */}
        <h2 className="ep-title">Errand assigned</h2>
        <p className="ep-sub">Both parties have agreed on the price</p>

        {/* Task Box */}
        <div className="ep-task-box">
          <p className="ep-task-label">Errand Task</p>
          <p className="ep-task-title">Document pickup</p>
        </div>

        {/* Center Icon + Text */}
        <div className="ep-center">
          <div className="ep-success-icon">
            <span>✔</span>
          </div>
          <h3 className="ep-mid-title">Price Agreement Reached!</h3>
          <p className="ep-mid-sub">Both parties have agreed on the final price</p>
        </div>

        {/* Price Box */}
        <div className="ep-price-box">
          <p className="ep-price-label">Final Price</p>
          <p className="ep-price-value">₦4,000</p>
        </div>

        {/* Next Step Info */}
        <div className="ep-next-step">
          <PiShieldCheckDuotone size={22} className="ep-shield" />
          <div>
            <p className="ep-next-title">Next Step: Payment</p>
            <p className="ep-next-desc">
              Payment will be held securely until the errand is completed
            </p>
          </div>
        </div>

        {/* Payment Button */}
        <button className="ep-pay-btn">Make payment</button>
      </div>
    </div>
  )
}

export default ErrandPayMod
