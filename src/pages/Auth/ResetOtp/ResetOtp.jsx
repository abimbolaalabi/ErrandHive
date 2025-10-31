import "./Resetotp.css"
import logo1 from "../../../assets/logo.svg";
import eclipseleft from "../../../assets/eclipse.svg";
import eclipseright from "../../../assets/eclipse2.svg";
import runner from "../../../assets/runner.svg";
import bicycle from "../../../assets/bicycle.svg";
import money from "../../../assets/money.svg";
import security from "../../../assets/security.svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetOtp = () => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [BtnLoading, setBtnLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const BaseURL = import.meta.env.VITE_BASE_URL;
  const userEmail = JSON.parse(localStorage.getItem("resetEmail"));

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...codes];
    updated[index] = value;
    setCodes(updated);
    setError("");

    if (value && index < codes.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    if (timer > 0) return;
    try {
      setBtnLoading(true);
      await axios.post(`${BaseURL}/resend-code`, { email: userEmail });
      toast.success("New code sent to your email");
      setTimer(59);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend code");
    } finally {
      setBtnLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = codes.join("");

    if (otpCode.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setBtnLoading(true);
      const res = await axios.post(`${BaseURL}/reset-otp`, {
        email: userEmail,
        otp: otpCode,   
      });

      toast.success(res?.data?.message || "Verification successful!");
      setCodes(["", "", "", "", "", ""]);

      // setTimeout(() => {
      //   navigate("/reset");
      // }, 2000);

      navigate("/reset");
      
    } catch (error) { 
      console.log(error);
      toast.error(error?.response?.data?.message || "Invalid verification code");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <main className="verify-section">
      <ToastContainer />

      <div className="logo-holder">
        <img
          src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
          className="logo"
          alt="logo"
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
                  ref={(ref) => (inputRefs.current[i] = ref)}
                />
              ))}
            </div>

            {error && <span className="error-message">{error}</span>}

            <div className="verify-btn-otp-holder">
              <button
                type="submit"
                className="verify-otp"
                disabled={BtnLoading}
                style={{
                  backgroundColor: BtnLoading ? "gray" : "#8133f1",
                  cursor: BtnLoading ? "not-allowed" : "pointer",
                }}
              >
                {BtnLoading ? "Verifying..." : "Verify"}
              </button>
            </div>

            <div className="resend-holder">
              <p className="didnt-receive">Didn't receive the code?</p>
              <p
                className={`resend-timer ${timer === 0 ? "clickable" : ""}`}
                onClick={handleResendOtp}
              >
                {timer > 0
                  ? `Resend code (${timer}s)`
                  : BtnLoading
                  ? "Resending..."
                  : "Resend code"}
              </p>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetOtp;
