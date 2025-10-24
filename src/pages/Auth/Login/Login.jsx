import "./Login.css";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../../Components/Carousel/Carousel";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
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

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: /\S+@\S+\.\S+/.test(value) ? "" : prev.email,
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim()) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    validate()
  };

  return (
    <main className="login-container">
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
                value={email}
                onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
                onChange={handleEmailChange}
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
                value={password}
                onChange={handlePasswordChange}
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
                Don't have an account?{" "}
                <span style={{ color: "#8133F1", cursor: "pointer" }}>
                  <Link to={"/signup"} className="link">
                    sign up
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
