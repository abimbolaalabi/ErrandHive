import React from "react";
import "./MidHero.css";
import Clock from "../../assets/Clock.svg";
import Shield from "../../assets/Shield.svg";
import Settings from "../../assets/Settings.svg";
import Wavymoney from "../../assets/Wavymoney.svg";

export default function MidHero() {
  return (
    <section className="midhero-section">
      <div className="container">
        <h2 className="title">Why Choose ErrandHive</h2>
        <p className="subtitle">The trusted platform for all your errand needs</p>

        <div className="cards-container">

          <div className="card">
            <div className="icon-1">
              <img src={Clock} alt="Fast & Reliable" />
            </div>
            <h3 className="card-title">Fast & Reliable</h3>
            <p className="card-description">
              Get your errands done quickly <br/>with our network of verified <br/>runners.
            </p>
          </div>

          <div className="card">
            <div className="icon-2">
              <img src={Shield} alt="Safe and secured payment" />
            </div>
            <h3 className="card-title">Safe and secured payment</h3>
            <p className="card-description">
              Secure, escrow protected <br/>payments. We hold your payment <br/>until the task is complete.
            </p>
          </div>

          <div className="card">
            <div className="icon-3">
              <img src={Settings} alt="Verified Runners" />
            </div>
            <h3 className="card-title">Verified Runners</h3>
            <p className="card-description">
              All Runners are KYC verified for <br/>your peace of mind <br/>and safety.
            </p>
          </div>

          <div className="card">
            <div className="icon-4">
              <img src={Wavymoney} alt="Earn Money" />
            </div>
            <h3 className="card-title">Earn Money</h3>
            <p className="card-description">
              Get your errands done quickly <br/>with our network of verified <br/>runners.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
