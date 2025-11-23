import React from "react";
import "./TermsModal.css";
import { IoClose } from "react-icons/io5";

const TermsModal = ({ open, toclose }) => {
  return (
    <div className="legalmodal-overlay">
      <div className="legalmodal-container">
        <button className="legalmodal-close" onClick={() => toclose(false)}>
          <IoClose size={22} />
        </button>

        <h2 className="legalmodal-title">Legal Information</h2>
        <p className="legalmodal-subtitle">
          Please read our terms and conditions carefully
        </p>

        <div className="legalmodal-content">

          <h3>1. About ErrandHive</h3>
          <p>
            ErrandHive provides an online marketplace that allows users to post errands,
            accept errands, make payments, and complete tasks.
            ErrandHive does not create or deliver errands for users.
            Transactions are solely between requesters and runners.
            ErrandHive is not responsible for user behavior, agreements, or performance.
          </p>

          <h3>2. Eligibility</h3>
          <ul>
            <li>Be at least 18 years old</li>
            <li>Provide accurate information when creating your account</li>
            <li>Not have been previously banned</li>
            <li>Remain responsible for any activity conducted on your account</li>
          </ul>

          <h3>3. Account Registration</h3>
          <ul>
            <li>You must create an account using a valid phone number or email</li>
            <li>Keep your login details secure</li>
            <li>You agree to our policies by registering</li>
            <li>ErrandHive may request verification to confirm your identity</li>
          </ul>

          <h3>4. Posting and Accepting Errands</h3>
          <ul>
            <li>Users can create errands including pickup details, delivery details, price, and conditions</li>
            <li>Runners must complete errands as described</li>
            <li>ErrandHive is not responsible for inaccurate information provided in errands</li>
            <li>Users agree not to misuse the platform</li>
          </ul>

          <h3>5. Payments and Fees</h3>
          <ul>
            <li>All payments must be made through the secure payment system</li>
            <li>Fees and service charges may apply</li>
            <li>ErrandHive may withhold funds until obligations are fulfilled</li>
            <li>Refunds may occur only when necessary</li>
          </ul>

          <h3>6. User Responsibilities</h3>
          <p>For users (requesters):</p>
          <ul>
            <li>Provide accurate pickup/delivery details</li>
            <li>Pay agreed fees</li>
            <li>Avoid illegal activities</li>
          </ul>

          <p>For runners:</p>
          <ul>
            <li>Complete errands honestly and within agreed times</li>
            <li>Avoid misconduct</li>
          </ul>

          <h3>7. Prohibited Activities</h3>
          <ul>
            <li>Illegal actions</li>
            <li>Fraudulent activities</li>
            <li>Misuse of the platform</li>
            <li>Harassment or harmful behavior</li>
            <li>Attempting to hack or exploit the system</li>
          </ul>

          <h3>8. Verification and Safety</h3>
          <ul>
            <li>Verify your identity</li>
            <li>Suspend accounts involved in misconduct</li>
            <li>Permanently remove users who violate rules</li>
          </ul>

          <h3>9. Liability and Disclaimer</h3>
          <ul>
            <li>ErrandHive is a neutral platform</li>
            <li>We are not responsible for losses or damages</li>
            <li>Users act at their own risk</li>
            <li>We do not guarantee outcomes</li>
          </ul>

          <h3>10. Privacy and Data Protection</h3>
          <ul>
            <li>Your privacy is important</li>
            <li>Data is processed in accordance with our policy</li>
            <li>We do not sell personal information</li>
          </ul>

          <h3>11. Intellectual Property</h3>
          <p>All platform content, including designs and materials, belongs to ErrandHive.</p>

          <h3>12. Account Suspension or Termination</h3>
          <ul>
            <li>Fraud</li>
            <li>Violations</li>
            <li>Harmful behavior</li>
            <li>Misuse</li>
          </ul>

          <h3>13. Updates to Terms</h3>
          <p>
            We may update terms without prior notice.
            Continued use means acceptance of updated terms.
          </p>

          <h3>14. Governing Law</h3>
          <p>These terms are governed by applicable laws in your region.</p>

          <h3>15. Contact Us</h3>
          <p>For questions or concerns, contact: support@errandhive.com</p>

        </div>
      </div>
    </div>
  );
};

export default TermsModal;
