import React, { useState } from "react";
import "./DownHero.css";
import { IoChevronDown } from "react-icons/io5";

const DownHero = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="downhero">
      <h2 className="downhero-title">Frequently Asked Questions</h2>
      <p className="downhero-subtitle">Everything you need to know</p>

      <div className="faq-wrapper">
        {/* LEFT COLUMN */}
        <div className="faq-column">
          <h3 className="faq-heading">For Users</h3>

          {/* Question 1 */}
          <div className="faq-box" onClick={() => toggleFAQ(0)}>
            <p>What is ErrandHive?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 0 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 0 && (
            <div className="faq-answer">
              <p>
                ErrandHive is a trusted platform that connects people who need
                errands done with verified runners who can handle the tasks
                quickly and securely.
              </p>
            </div>
          )}

          {/* Question 2 */}
          <div className="faq-box" onClick={() => toggleFAQ(1)}>
            <p>How do I post Errand?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 1 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 1 && (
            <div className="faq-answer">
              <p>
                You can post an errand by logging into your account, filling in
                the errand details, and submitting. A nearby verified runner
                will accept and complete it.
              </p>
            </div>
          )}

          {/* Question 3 */}
          <div className="faq-box" onClick={() => toggleFAQ(2)}>
            <p>How do I pay for Errand?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 2 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 2 && (
            <div className="faq-answer">
              <p>
                Payments are made securely within the app using your preferred
                payment method. ErrandHive ensures your money is safe until the
                task is completed.
              </p>
            </div>
          )}

          {/* Question 4 */}
          <div className="faq-box" onClick={() => toggleFAQ(3)}>
            <p>Are the runners verified?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 3 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 3 && (
            <div className="faq-answer">
              <p>
                Yes! Every runner is verified through identity checks to ensure
                safety and trust for all users.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="faq-column">
          <h3 className="faq-heading">For Runners</h3>

          {/* Question 5 */}
          <div className="faq-box" onClick={() => toggleFAQ(4)}>
            <p>How do I become a Runner?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 4 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 4 && (
            <div className="faq-answer">
              <p>
                To become a runner, sign up on the platform, complete your
                verification process, and start accepting errands in your area.
              </p>
            </div>
          )}

          {/* Question 6 */}
          <div className="faq-box" onClick={() => toggleFAQ(5)}>
            <p>How much can I earn?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 5 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 5 && (
            <div className="faq-answer">
              <p>
                Your earnings depend on how many errands you complete. The more
                you work, the more you earn — with instant payments after every
                task.
              </p>
            </div>
          )}

          {/* Question 7 */}
          <div className="faq-box" onClick={() => toggleFAQ(6)}>
            <p>When do I get paid?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 6 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 6 && (
            <div className="faq-answer">
              <p>
                Payments are sent immediately after a task is successfully
                completed and confirmed by the user.
              </p>
            </div>
          )}

          {/* Question 8 */}
          <div className="faq-box" onClick={() => toggleFAQ(7)}>
            <p>Is there a registration fee?</p>
            <IoChevronDown
              className={`faq-icon ${openIndex === 7 ? "rotate" : ""}`}
            />
          </div>
          {openIndex === 7 && (
            <div className="faq-answer">
              <p>
                No, joining ErrandHive as a runner is completely free. You only
                earn when you complete errands.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DownHero;
