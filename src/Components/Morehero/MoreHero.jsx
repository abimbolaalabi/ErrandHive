import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import newpics from "../../assets/newpics.svg";
import womanpics from "../../assets/womanpics.svg";
import malepics from "../../assets/malepics.svg";
import imga4 from "../../assets/imga4.svg";
import "./MoreHero.css";

const MoreHero = () => (
  <section className="morehero">
    <h2 className="morehero-title">User's Feedback</h2>
    <p className="morehero-subtitle">Real experience from real people</p>

    <div className="feedback-container">
      <div className="feedback-card">
        <RiDoubleQuotesL className="quote" />
        <p>
          ErrandHive has been a lifesaver! I used to waste hours running small
          errands after work, but now I just post them and someone nearby
          handles it within minutes. It's safe, fast, and super convenient.
        </p>
        <div className="user-row">
          <img src={newpics} alt="Tomi Adeyemi" className="user-img" />
          <span className="user-name">Tomi Adeyemi</span>
          <div className="stars">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>
        </div>
      </div>

      <div className="feedback-card">
        <RiDoubleQuotesL className="quote" />
        <p>
          I love how simple it is. I posted a last minute delivery and got
          matched with a verified runner in less than 5 minutes. Everything went
          smoothly definitely using ErrandHive again!
        </p>
        <div className="user-row">
          <img src={womanpics} alt="Chioma Eze" className="user-img" />
          <span className="user-name">Chioma Eze</span>
          <div className="stars">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>
        </div>
      </div>
      <div className="feedback-card">
        <RiDoubleQuotesL className="quote" />
        <p>
          ErrandHive gave me a flexible way to earn without stress. I pick
          errands around my area whenever I'm free. It's easy, and payments come
          through instantly after each task.
        </p>
        <div className="user-row">
          <img src={malepics} alt="David Oladipo" className="user-img" />
          <span className="user-name">David Oladipo</span>
          <div className="stars">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>
        </div>
      </div>

      <div className="feedback-card">
        <RiDoubleQuotesL className="quote" />
        <p>
          ErrandHive has been amazing for earning extra income. I pick errands
          nearby, complete them at my convenience, and receive instant payments
          securely after every successful task.
        </p>
        <div className="user-row">
          <img src={imga4} alt="Joy Adeniran" className="user-img" />
          <span className="user-name">Joy Adeniran</span>
          <div className="stars">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MoreHero;
