import "./Login.css";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../../Components/Carousel/Carousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../global/userSlice";

const Login = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const BaseURL = import.meta.env.VITE_BASE_URL;

  const validate = () => {
    const { email, password } = formData;
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch()

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post(`${BaseURL}/login`, formData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log(res?.data);
        toast.success(res?.data?.message);
        const userDetails = res?.data?.data;  // depends on API response
      const userToken = res?.data?.token;

      dispatch(setUserDetails({ userDetails, userToken }));

        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.log("Login error:", error.response?.data || error.message);
        toast.error(error?.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <main className="login-container">
      <ToastContainer />
      <section className="login-left">
        <Carousel />
      </section>

      <section className="login-right">
        <form className="login-right-form" onSubmit={loginSubmit}>
          <div className="login-text-layout">
            <h1 className="login-right-text">Login to your account</h1>
          </div>

          <div className="email-container">
            <label className="form-right-title">Email address</label>
            <div className="email-right-input-box">
              <input
                type="text"
                name="email"
                value={formData.email}
                onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="email-input"
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="password-container">
            <label className="form-right-title">Password</label>
            <div className="password-right-input-box">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
               onChange={(e) => {
        setFormData({ ...formData, password: e.target.value });
        setErrors((prev) => ({ ...prev, password: "" })); // Clear password error while typing
      }}
                placeholder="Enter your Password"
                className="pasword-input"
                
              />
              {show ? (
                <RxEyeOpen
                  className="eye"
                  size={22}
                  onClick={() => setShow(false)}
                />
              ) : (
                <GoEyeClosed
                  className="eye"
                  size={22}
                  onClick={() => setShow(true)}
                />
              )}
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}

            <div className="checkbox-login-form">
              <input type="checkbox" className="checkbox" />
              <span className="remember-me-checkbox">Remember me</span>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <article className="login-right-or">
              <div className="line"></div>
              <div className="or">
                <span style={{ fontSize: "1.7rem" }}>o</span>r
              </div>
              <div className="line"></div>
            </article>

            <button className="continue-with-google" type="button">
              <FcGoogle style={{ fontSize: "1.5rem" }} />
              Continue with Google
            </button>

            <span className="forgot-password-form">
              <Link to={"/forgot"} className="link">
                Forget password?
              </Link>
            </span>

            <div className="dont-account">
              <p>
                Don't have an account?
                <span style={{ color: "#8133F1", cursor: "pointer" }}>
                  <Link to={"/clientvsrunner"} className="link">
                    Sign up
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
