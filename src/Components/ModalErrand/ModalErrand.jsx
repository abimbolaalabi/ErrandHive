import React from 'react'
import "./ModalErrand.css"
import { FaLocationDot, FaPhone, FaPaperclip } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";



const ModalErrand = ({ toclose }) => {
  return (
    <div className='modalerrand-container'>
      <div className='modalerrand-child'>

        {/* Top Note and Close Button */}
        <div className='top-note-container'>
          <p className='top-note'>
            Note!! Do not place items above **₦100,000** For pickup
          </p>
          <span onClick={() => toclose(false)} className='close-button'>X</span>
        </div>

        {/* Header */}
        <h2 className='post-errand-header'>Post New Errand</h2>
        <p className='post-errand-subheader'>
          Fill in the details for your errand. All fields are required.
        </p>

        {/* Form Container */}
        <div className='form-content'>

          {/* Errand Title */}
          <div className='input-group'>
            <p className='label-with-icon'><FaBook /> Errand Title</p>
            <input
              type='text'
              placeholder='e.g., Grocery Shopping, Document Pickup'
              className='form-input'
            />
          </div>

          {/* Pickup Address */}
          <div className='input-group'>
            <p className='label-with-icon'><FaLocationDot /> Pickup Address</p>
            <input
              type='text'
              placeholder='Enter pickup location'
              className='form-input'
            />
          </div>

          {/* Pickup Contact Phone */}
          <div className='input-group'>
            <p className='label-with-icon'><FaPhone /> Pickup Contact Phone</p>
            <input
              type='tel'
              placeholder='e.g. 09078651221'
              className='form-input'
            />
          </div>

          {/* Delivery Address */}
          <div className='input-group'>
            <p className='label-with-icon'><FaLocationDot /> Delivery Address</p>
            <input
              type='text'
              placeholder='Enter delivery location'
              className='form-input'
            />
          </div>

          {/* Price */}
          {/* <div className='input-group'>
                <p className='label-with-icon'><FaNairaSign /> Price</p>
                <input 
                    type='text' 
                    placeholder='e.g. ₦5,000' 
                    className='form-input'
                />
            </div> */}

          {/* Description & Instructions */}
          <div className='input-group'>
            <p className='label-text'>Description & Instructions</p>
            <textarea
              placeholder='Provide any additional details or special instructions'
              className='form-textarea'
            ></textarea>
          </div>

          {/* Attachments (Optional) */}
          <div className='attachments-section'>
            <p className='label-text'>Attachments (Optional)</p>
            <label htmlFor='file-upload' className='attachment-box'>
              <FaPaperclip className='attachment-icon' />
              <p>Click to upload a file</p>
              <p className='max-file-size'>Max file size: 10MB</p>
              <input
                id='file-upload'
                type='file'
                accept='.pdf,.doc,.docx,.xls,.xlsx'
                className='file-input'
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='action-buttons'>
          <button className='btn cancel-btn' onClick={() => toclose(false)}>
            Cancel
          </button>
          <button className='btn post-btn'>
            Post Errand
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalErrand;