import "./Header.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="header-container">
      <div className="header-container-wrapper">
        <div className="header-logo">
          <img
            src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg"
            className="logo"
            alt="logo"
          />
          <span className="errand">Errandhive</span>
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <nav className="header-navlink">
          <ul className="header-navlink-list-holder">
            <li onClick={() => handleScroll("home")} className="header-navlink-list">Home</li>
            <li onClick={() => handleScroll("about")} className="header-navlink-list">About</li>
            <li onClick={() => handleScroll("features")} className="header-navlink-list">Features</li>
            <li onClick={() => handleScroll("how-it-works")} className="header-navlink-list">How it Works</li>
          </ul>
        </nav>

        <div className="header-btn-holder">
          <Link to="/login">
            <button className="sign-in-btn">Sign in</button>
          </Link>
          <Link to="/clientvsrunner">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-dropdown">
          <ul className="mobile-menu-list">
            <li onClick={() => handleScroll("home")} className="mobile-menu-item">Home</li>
            <li onClick={() => handleScroll("about")} className="mobile-menu-item">About</li>
            <li onClick={() => handleScroll("features")} className="mobile-menu-item">Features</li>
            <li onClick={() => handleScroll("how-it-works")} className="mobile-menu-item">How it Works</li>
          </ul>

          <div className="mobile-btn-holder">
            <Link to="/login">
              <button className="sign-in-btn">Sign in</button>
            </Link>
            <Link to="/clientvsrunner">
              <button className="get-started-btn">Get Started</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
