import React, { useState } from "react";
import logo1 from "../../../assets/logo.svg";
import eclipseleft from "../../../assets/eclipse.svg";
import eclipseright from "../../../assets/eclipse2.svg";
import runner from "../../../assets/runner.svg";
import bicycle from "../../../assets/bicycle.svg";
import money from "../../../assets/money.svg";
import security from "../../../assets/security.svg";
import "./Resetpassword.css";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="verify-section">
      <div className="logo-holder">
        <img src={logo1} alt="logo" />
        <span className="errand">Errandhive</span>
      </div>

      <div className="eclipse-left">
        <img src={eclipseleft} alt="eclipse-left" className="eclipse-left" />
      </div>
      <div className="eclipse-right">
        <img src={eclipseright} alt="eclipse-right" className="eclipse-right" />
      </div>
      <div className="bicycle">
        <img src={bicycle} alt="bicycle" className="bicycle" />
      </div>
      <div className="runner">
        <img src={runner} alt="runner" className="runner" />
      </div>
      <div className="money">
        <img src={money} alt="money" className="money" />
      </div>

      <section>
        <form className="verify-form">
          <div className="security-header">
            <div className="security-icon-box">
              <img
                src={security}
                alt="security-icon"
                className="img-security"
              />
            </div>

            <article className="reset-text-holder">
              <h1 className="reset-h1">Reset Password</h1>
              <p className="reset-p">Please put in your new password.</p>
            </article>
          </div>

          <div className="password-holder">
            <div className="password-holder-input">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <div className="password-holder-input">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
          </div>
             <div className="reset-btn-container">
                 <button type="submit" className="reset-btn"> Reset Password</button>

             </div>
 
          
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
