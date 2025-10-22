import "./Login.css";
import logo from "../../../assets/logo.svg";
import dispatch from "../../../assets/Dispatch.svg";
import secure from "../../../assets/secure.jpg";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const carouselData = [
  {
    id: 1,
    image: dispatch,
    alt: "Dispatch service",
    description: "For Client",
    title:
      "Delegate tasks effortlessly and save time with trusted local runners.",
  },
  {
    id: 2,
    image: secure,
    alt: "Secure delivery",
    description: "Secure & Reliable",
    title:
      "Enjoy secure and Verified Runners for a stress-free experience",
  },
];

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselData.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

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
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login successful!");
    } else {
      console.log("Please fix the errors before submitting.");
    }
  };

  return (
    <main className="login-container">
      <section className="login-left">
        <div className="login-left-header">
          <img src={logo} alt="Logo" className="img" />
          <span className="errand">ErrandHive</span>
        </div>

        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className="img-carosel-box"
            style={{
              display: index === current ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.alt}
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "0.5rem",
                marginTop: "2rem",
              }}
            />
            <article className="carousel-text">
              <h1 className="carousel-text-header">{item.description}</h1>
              <p className="carousel-text-paragrah">{item.title}</p>
            </article>
          </div>
        ))}
      </section>

      <section className="login-right">
        <form className="login-right-form" onSubmit={loginSubmit}>
          <div className="form-wrapper">
            <h1 className="login-right-text">Login to your account</h1>

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
                Continue with Google
              </button>

              <span className="forgot-password-form"><Link to={"/forgot"} className="link">Forget password?</Link></span>

              <div className="dont-account">
                <p>
                  Don't have an account?{" "}
                  <span style={{ color: "#8133F1", cursor: "pointer" }}>
                    <Link to={"/signup"} className="link">sign up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
