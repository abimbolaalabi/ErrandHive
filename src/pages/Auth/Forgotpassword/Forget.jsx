import logo1 from "../../../assets/logo.svg";
import eclipseleft from "../../../assets/eclipse.svg";
import eclipseright from "../../../assets/eclipse2.svg";
import runner from "../../../assets/runner.svg";
import bicycle from "../../../assets/bicycle.svg";
import money from "../../../assets/money.svg";
import security from "../../../assets/Padlock.jpg";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Forgot.css";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
  };

  return (
    <main className="verify-section">
      <div className="logo-holder">
        <img
          src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
          className="logo"
          alt="Logo"
        />
        <span className="errand">Errandhive</span>
      </div>

      <div className="eclipse-left">
        <img src={eclipseleft} alt="eclipse-left" />
      </div>
      <div className="eclipse-right">
        <img src={eclipseright} alt="eclipse-right" />
      </div>
      <div className="bicycle">
        <img src={bicycle} alt="bicycle" />
      </div>
      <div className="runner">
        <img src={runner} alt="runner" />
      </div>
      <div className="money">
        <img src={money} alt="money" />
      </div>

      <form className="forget-form" onSubmit={handleSubmit}>
        <div className="forget-header">
          <div className="forget-icon-box">
            <img src={security} alt="forget-icon" className="forget-icon" />
          </div>
          <h1 className="forget-header-h1">Forgot Password</h1>
          <p className="forget-header-p">
            Enter your email address to reset your password
          </p>
        </div>

        <div className="input-email-holder">
          <div className="input-label-holder-wrapper">
            <label className="input-label-text">Input your Email address</label>
            <div className="forget-email-input-box">
              <input
                type="email"
                placeholder="Enter email address"
                className="forget-email-input"
                value={email}                   
                onChange={(e) => setEmail(e.target.value)} 
                
              />
            </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="forget-btn">
              Send Verification code
            </button>

            <div className="back-to-login-holder">
              <div className="back-hold">
                <IoChevronBackSharp className="back-icon" />
                <p className="back-text">
                  <Link to="/login" className="link">Back to login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Forget;
