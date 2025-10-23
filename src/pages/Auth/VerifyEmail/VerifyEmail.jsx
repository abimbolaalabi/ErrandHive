import "./VerifyEmail.css";
import logo1 from "../../../assets/logo.svg";
import eclipseleft from "../../../assets/eclipse.svg";
import eclipseright from "../../../assets/eclipse2.svg";
import runner from "../../../assets/runner.svg";
import bicycle from "../../../assets/bicycle.svg";
import money from "../../../assets/money.svg";
import security from "../../../assets/security.svg";
import { useState } from "react";

const VerifyEmail = () => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...codes];
    updated[index] = value;
    setCodes(updated);
    setError(""); 


    if (value && index < codes.length - 1) {
      const next = e.target.parentElement.children[index + 1];
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const prev = e.target.parentElement.children[index - 1];
      if (prev) prev.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = codes.join("");

    if (code.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    console.log("Verification code:", code);
  };

  return (
    <main className="verify-section">
      <div className="logo-holder">
   <img src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg" className ="logo" alt="" />
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
        <form className="verify-form" onSubmit={handleSubmit}>
          <div className="security-header">
            <div className="security-icon-box">
              <img src={security} alt="security-icon" className="img-security" />
            </div>
            <h1 className="security-header-h1">Verify Your Email</h1>
            <p className="security-header-p">
              Please input the code sent to your email
            </p>
          </div>

          <div className="input-code-box">
            <div className="input-code-text-holder">
              <p className="input-code-text-p">Input Code</p>
            </div>

            <div className="input-field-holder">
              {codes.map((code, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="code-input"
                  value={code}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
            </div>

            {error && <span className="error-message">{error}</span>}

            <div className="verify-btn-otp-holder">
              <button type="submit" className="verify-otp">
                Verify
              </button>
            </div>

            <div className="resend-holder">
              <p className="didnt-receive">Didn't receive the code?</p>
              <p className="resend-timer">Resend code (59s)</p>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default VerifyEmail;
