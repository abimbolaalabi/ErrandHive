import React from "react";
import "./MoreHero.css";
import { RiDoubleQuotesL } from "react-icons/ri";
import Tomi from "../../assets/Tomi.svg";
import Chioma from "../../assets/Chioma.svg";
import David from "../../assets/David.svg";
import Joy from "../../assets/Joy.svg";

const MoreHero = () => {
  return (
    <section className="morehero">
      <h2 className="morehero-title">User’s Feedback</h2>
      <p className="morehero-subtitle">Real experience from real people</p>

      <div className="feedback-container">
        <div className="feedback-card">
          <span className="quote"><RiDoubleQuotesL /></span>
          <p>
            ErrandHive has been a lifesaver! I used to waste hours running small errands after work, but now I just post them and someone nearby handles it within minutes. It’s safe, fast, and super convenient.
          </p>
          <div className="user-info">
            <img src={Tomi} alt="User" />
            <h4>Tomi Adeyemi</h4>
            <span className="stars">★★★★★</span>
          </div>
        </div>

        <div className="feedback-card">
          <span className="quote"><RiDoubleQuotesL /></span>
          <p>
            I love how simple it is. I posted a last minute delivery and got matched with a verified runner in less than 5 minutes. Everything went smoothly  definitely using ErrandHive again!
          </p>
          <div className="user-info">
            <img src={Chioma} alt="User" />
            <h4>Chioma Eze</h4>
            <span className="stars">★★★★★</span>
          </div>
        </div>

        <div className="feedback-card">
          <span className="quote"><RiDoubleQuotesL /></span>
          <p>
            ErrandHive gave me a flexible way to earn without stress. I pick errands around my area whenever I’m free. It’s easy, and payments come through instantly after each task.
          </p>
          <div className="user-info">
            <img src={David} alt="User" />
            <h4>David Oladipo</h4>
            <span className="stars">★★★★★</span>
          </div>
        </div>

        <div className="feedback-card">
          <span className="quote"><RiDoubleQuotesL /></span>
          <p>
            ErrandHive has been amazing for earning extra income. I pick errands nearby, complete them at my convenience, and receive instant payments securely after every successful task.
          </p>
          <div className="user-info">
            <img src={Joy} alt="User" />
            <h4>Joy Adeniran</h4>
            <span className="stars">★★★★★</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MoreHero;
