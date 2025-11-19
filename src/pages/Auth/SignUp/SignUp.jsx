import React, { useState } from "react";
import "./Signup.css";
import Carousel from "../../../Components/Carousel/Carousel";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const SignUp = () => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const { role } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // clear error for this field
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name should only contain letters.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name should only contain letters.";
    }

    if (email === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid Email Format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must contain at least one letter, one number, one special character, and be 8 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${BaseUrl}/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(res?.data?.message || "Registration successful!");
      localStorage.setItem("email", JSON.stringify(formData.email));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: role,
      });
      setFormErrors({});
      navigate("/verifyemail");
    } catch (error) {
      console.log("Signup error:", error);
      toast.error(error.response?.data?.message || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <Carousel />
      </div>

      <div className="signup-right">
        <div className="signup-right-cont">
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
                className={formErrors.firstName ? "error-input" : ""}
              />
              {formErrors.firstName && (
                <span className="error-text">{formErrors.firstName}</span>
              )}
            </div>

            <div className="input-cont">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className={formErrors.lastName ? "error-input" : ""}
              /> 
              {formErrors.lastName && (
                <span className="error-text">{formErrors.lastName}</span>
              )}
            </div>

            <div className="input-cont">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "error-input" : ""}
              />
              {formErrors.email && (
                <span className="error-text">{formErrors.email}</span>
              )}
            </div>

            <div className="input-contt">
              <label>Password</label>
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={formErrors.password ? "error-input" : ""}
                />
                {showPassword ? (
                  <FaEye
                    style={{ width: "5%", cursor: "pointer" }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    style={{ width: "5%", cursor: "pointer" }}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {formErrors.password && (
                <span className="error-text">{formErrors.password}</span>
              )}
            </div>

            <div className="input-contt">
              <label>Confirm Password</label>
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={formErrors.confirmPassword ? "error-input" : ""}
                />
                {showPassword ? (
                  <FaEye
                    style={{ width: "5%", cursor: "pointer" }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    style={{ width: "5%", cursor: "pointer" }}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {formErrors.confirmPassword && (
                <span className="error-text">
                  {formErrors.confirmPassword}
                </span>
              )}
            </div>

            <div className="checkbox-input">
              <input type="checkbox" className="checkbox" required />
              <p className="remember-me-checkbox">
                I have read and agree to the <span>Terms and Conditions</span>
              </p>
            </div>

            <div className="button-cont">
              <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign up for free"}
              </button>
            </div>

            {/* <article className="signup-line-cont">
              <div className="firstline"></div>
              <div className="text-or">or</div>
              <div className="firstline"></div>
            </article>

            <Link
              style={{ display: "flex", gap: "10px", textDecoration: "none" }}
              to={`https://errandhive-project.onrender.com/api/v1/google`}
            >
              <button className="google" type="button" disabled={loading}>
                <FcGoogle />
                <p>Continue with Google</p>
              </button>
            </Link> */}

            <aside className="account-text">
              <p>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>
                  Click here to login
                </span>
              </p>
            </aside>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
