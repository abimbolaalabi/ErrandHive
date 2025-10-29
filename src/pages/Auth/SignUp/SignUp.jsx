import React, { useState } from 'react'
import './Signup.css'
import Carousel from '../../../Components/Carousel/Carousel'
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const SignUp = () => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  // console.log(BaseUrl)
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
  const [modal, setModal] = useState(false)

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

  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password)) {
    toast.error("Password must contain at least one letter, one number, and one symbol");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
};


  console.log("This is form data", formData)
  const navigate = useNavigate()
  const navigatetoverify = ()=> {
    navigate("/verifyemail")
  }
  const navigatetologin = ()=>{
    navigate("/login")
  }

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
        toast.success(res?.data?.message)
        localStorage.setItem("email", JSON.stringify(formData.email));
        navigatetoverify()
      } catch (error) {
        console.log("this is the error", error)
          toast.error(error?.response?.data?.message || "Registration failed");
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
            <h1>Sign Up As {role}</h1>
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
              <p>Already have an account? <span onClick={navigatetologin}>Click here to login</span> </p>
            </aside>


          </form>
        </div>
       {/* <ModalSpinner/> */}
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
