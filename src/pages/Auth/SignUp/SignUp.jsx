import React, { useState } from 'react'
import './Signup.css'
import Dispatch from "../../../assets/Dispatch.svg"
import Run from "../../../assets/Run.png"


const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  })

  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setFormErrors(prev => ({
      ...prev,
      [name]: '',
    }))
    setSuccessMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = {}

    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    if (!formData.password) errors.password = 'Password is required'
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setSuccessMessage('Form submitted successfully!')
    console.log('Form Data Submitted:', formData)
  }

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="logo">
          <img src={Run} />
          <span>ErrandHive</span>
        </div>
        <div className="content">
          <div className="illustration">
          <img src={Dispatch} />
        </div>
        <div className="for-client">
          <h2>For Client</h2>
          <p>Delegate tasks effortlessly and save time with trusted local runners</p>
        </div>
        </div>
      </div>

      <div className="signup-right">
        <h2>Sign Up As A Runner</h2>

        {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && <p className="error-text">{formErrors.firstName}</p>}

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && <p className="error-text">{formErrors.lastName}</p>}

          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error-text">{formErrors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <p className="error-text">{formErrors.password}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && <p className="error-text">{formErrors.confirmPassword}</p>}

          <div className="terms">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <span>
              I have read the <a href="#">Terms and Conditions</a> and I agree
            </span>
          </div>
          {formErrors.termsAccepted && <p className="error-text">{formErrors.termsAccepted}</p>}

          <button type="submit" className="signup-btn">Sign-Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp