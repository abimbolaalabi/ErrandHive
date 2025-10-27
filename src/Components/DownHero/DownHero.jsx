import React from "react";
import "./DownHero.css";
import { IoChevronDown } from "react-icons/io5";

const DownHero = () => {
  return (
    <section className="downhero">
      <h2 className="downhero-title">Frequently Asked Questions</h2>
      <p className="downhero-subtitle">Everything you need to know</p>

      <div className="faq-wrapper">
        {/* LEFT COLUMN */}
        <div className="faq-column">
          <h3 className="faq-heading">For Users</h3>

          <div className="faq-box">
            <p>What is ErrandHive?</p>
            <IoChevronDown className="faq-icon" />
          </div>

          <div className="faq-box">
            <p>How do I post Errand?</p>
            <IoChevronDown className="faq-icon" />
          </div>

          <div className="faq-box">
            <p>How do I pay for Errand?</p>
            <IoChevronDown className="faq-icon" />
          </div>

          <div className="faq-box">
            <p>Are the runners verified?</p>
            <IoChevronDown className="faq-icon" />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="faq-column">
          <h3 className="faq-heading">For Runners</h3>

          <div className="faq-box">
            <p>How do I become a Runner?</p>
            <IoChevronDown className="faq-icon" />
          </div>

          <div className="faq-box">
            <p>How much can I earn?</p>
            <IoChevronDown className="faq-icon" />
          </div>

          <div className="faq-box">
            <p>When do I get paid?</p>
            <IoChevronDown className="faq-icon" />
          </div>

          <div className="faq-box">
            <p>Is there a registration fee?</p>
            <IoChevronDown className="faq-icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownHero;
