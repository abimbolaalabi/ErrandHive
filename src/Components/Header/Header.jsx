import "./Header.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // ✅ added for the hamburger icon

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-container-wrapper">
        <div className="header-logo">
          <img
            src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
            className="logo"
            alt=""
          />
          <span className="errand">Errandhive</span>
        </div>
        <div className="menu-icon">
          <FaBars />
        </div>

        <nav className="header-navlink">
          <ul className="header-navlink-list-holder">
            <li className="header-navlink-list">Home</li>
            <li className="header-navlink-list">About</li>
            <li className="header-navlink-list">Features</li>
            <li className="header-navlink-list">How it Works</li>
          </ul>
        </nav>

        <div className="header-btn-holder">
          <Link to="/login">
            <button className="sign-in-btn">Sign in</button>
          </Link>
          <button className="get-started-btn">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
