import "./Login.css";
import logo from "../../../assets/Errandhivelogo.svg";
import dispatch from "../../../assets/Dispatch.svg";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Login successful!");
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  return (
    <main className="login-container">
      <section className="login-left">
        <div>
          <img src={logo} alt="ErrandHive logo" />
        </div>
        <div className="img-box-wrapper">
          <div className="img-box">
            <img src={dispatch} alt="login image" />
          </div>
        </div>
      </section>

      <section className="login-right">
        <form className="login-right-form" onSubmit={loginSubmit}>
          <h1 className="login-rigt-text">Login to your account</h1>

          <div className="form-wrapper">
            <div className="email-container">
              <label className="form-right-title">Email address</label>
              <div className="email-right-input-box">
                <input
                  type="email"
                  name="email"
                  value={email}
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
                <div className="or">or</div>
                <div className="line"></div>
              </article>

              <button className="continue-with-google" type="button">
                <FcGoogle />
                Continue with google
              </button>

              <span className="forgot-password-form">Forget password?</span>

              <div className="dont-account">
                <p>
                  Don't have an account?{" "}
                  <span style={{ color: "#8133F1", cursor: "pointer" }}>
                    sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* <ToastContainer position="top-center" autoClose={2500} /> */}
    </main>
  );
};

export default Login;
