import React from "react";
import "./Footer.css";
import { MdOutlineFacebook } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import { FaRunning } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section brand">
          <div className="brand-logo">
            <span className="icon"><FaRunning /></span>
            <h2>ErrandHive</h2>
          </div>
          <p>Connecting communities<br />through helpful errands.</p>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Safety</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 ErrandHive. All rights reserved.</p>
        <div className="socials">
          <span><MdOutlineFacebook /></span>
          <span><AiOutlineTwitter /></span>
          <span><IoLogoInstagram /></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
