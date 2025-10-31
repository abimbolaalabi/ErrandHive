import "./Header.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import "./Header.css"
import {Link, useNavigate} from "react-router-dom"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
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
           <Link to ={"/login"}>
             <button className="sign-in-btn">Sign in</button>
             </Link>
             <Link to = {"/clientvsrunner"}>
                    <button className="get-started-btn" >Get Started</button>
             </Link>
        
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-dropdown">
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">Home</li>
            <li className="mobile-menu-item">About</li>
            <li className="mobile-menu-item">Features</li>
            <li className="mobile-menu-item">How it Works</li>
          </ul>
          <div className="mobile-btn-holder">
            <Link to="/login">
              <button className="sign-in-btn">Sign in</button>
            </Link>
            <button className="get-started-btn">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
