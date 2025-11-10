import React from "react";
import "./MyHero.css";

const MyHero = () => {
  return (
    <section className="myhero-section">
      <h2 className="myhero-title">How It Works</h2>
      <p className="myhero-subtitle">Simple steps to get started</p>

      <div className="myhero-container">

        <div className="myhero-box">
          <h3 className="box-title users-title">For Users</h3>

          <div className="step">
            <span className="step-number">1</span>
            <div>
              <h4>Sign Up And Post Your Errand</h4>
              <p>Create a User profile, describe your errand with pickup <br/>and delivery details.</p>
            </div>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <div>
              <h4>Set Your Budget</h4>
              <p>Choose how much you want to pay. You can also allow <br/>runners to make offers if you want flexible pricing.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <div>
              <h4>Get Matched Instantly</h4>
              <p>Nearby verified Runners see your task and accept it. <br/>You’ll be notified once someone accepts.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <div>
              <h4>Stay In Touch</h4>
              <p>Chat directly with your Runner for updates and handover <br/>instructions.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">5</span>
            <div>
              <h4>Confirm And Pay Securely</h4>
              <p>Once your errand is completed, confirm in the app.  Your <br/>payment (held in escrow) is safely released to the Runner.</p>
            </div>
          </div>
        </div>
        <div className="myhero-box">
          <h3 className="box-title runners-title">For Runners</h3>
          <div className="step">
            <span className="step-number yellow">1</span>
            <div>
              <h4>Sign Up</h4>
              <p>Sign up and Create your Runner profile </p>
            </div>
          </div>
          <div className="step">
            <span className="step-number yellow">2</span>
            <div>
              <h4>Complete KYC</h4>
              <p>verify your identity to build trust with users and start accepting <br/>jobs.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number yellow">3</span>
            <div>
              <h4>Browse Available Errands</h4>
              <p>View nearby errands posted by people around you, choose what <br/>fits your time, route, or budget.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number yellow">4</span>
            <div>
              <h4>Accept And Complete Tasks</h4>
              <p>Accept errands, communicate with the requester, and complete <br/>the task as described.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number yellow">5</span>
            <div>
              <h4>Get Paid Instantly</h4>
              <p>Once the user confirms completion, your earnings are released <br/>immediately to your wallet.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyHero;
