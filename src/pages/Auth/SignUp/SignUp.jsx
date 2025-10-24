import React, { useState } from 'react'
import './Signup.css'
import Carousel from '../../../Components/Carousel/Carousel'
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import {  useParams } from 'react-router-dom';


const SignUp = () => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const { role } = useParams()


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role
  })

  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [ShowPassword, SetShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }


    if (password[0] !== password[0].toUpperCase()) {
      toast.error("Password must start with an uppercase letter");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, and symbol"
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  console.log("This is form data", formData)

  const handleSubmit = async (e) => {
      e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post(`${BaseUrl}/register`, formData, {
          headers: { "Content-Type": "application/json" }
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: role
        })
        console.log(res.data)
        toast.success("Registration successful")
      } catch (error) {
        console.log("this is the error", error)
      }
    }
  }


  return (
    <div className="signup-container">
      <div className="signup-left">
        <Carousel />
      </div>

      <div className="signup-right">
        <div className='signup-right-cont'>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up As A Client</h1>
            <div className="input-cont">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-cont">
              <label>Last Name</label>
              <input type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-cont">
              <label>Email Address</label>
              <input type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-contt">
              <label>Password</label>
              <div className='password'>
                <input type={ShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {
                  ShowPassword ? (
                    <FaEye
                      style={{ width: "5%", cursor: "pointer" }}
                      onClick={() => SetShowPassword(!ShowPassword)}
                    />
                  ) :
                    (
                      <FaEyeSlash
                        style={{ width: "5%", cursor: "pointer" }}
                        onClick={() => SetShowPassword(!ShowPassword)}
                      />
                    )
                }

              </div>

            </div>
            <div className="input-contt">
              <label>Confirm Password</label>
              <div className='password'>
                <input type={ShowPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {
                  ShowPassword ? (
                    <FaEye
                      style={{ width: "5%", cursor: "pointer" }}
                      onClick={() => SetShowPassword(!ShowPassword)}
                    />
                  ) :
                    (
                      <FaEyeSlash
                        style={{ width: "5%", cursor: "pointer" }}
                        onClick={() => SetShowPassword(!ShowPassword)}
                      />
                    )
                }

              </div>

            </div>
            <div className="checkbox-input">
              <input type="checkbox" className="checkbox" />
              <p className="remember-me-checkbox">I have read the <span>Terms and condition </span> and i agree</p>
            </div>
            <div className="button-cont">
              <button type='submit'>Sign up for free</button>
            </div>

            <article className="signup-line-cont">
              <div className="firstline"></div>
              <div className="text-or">or</div>
              <div className="firstline"></div>
            </article>


            <button className="google" type="button">
              <FcGoogle />
              <p> Continue with Google</p>
            </button>
            <aside className="account-text">
              <p>Already have an account? <span>Click here to login</span> </p>
            </aside>


          </form>
        </div>



      </div>

      {/* <div className="signup-right">
    

        {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}

       
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
      </div> */}
    </div>
  )
}

export default SignUp