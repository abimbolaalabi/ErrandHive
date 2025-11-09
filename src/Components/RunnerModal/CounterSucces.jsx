import React from 'react';
import "./CounterSucces.css";

const CounterModal = ({ close, task }) => {
  return (
    <div className="modal-overlay" onClick={() => close()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={close}>&times;</button>
          <h2 className="header-title">Counter Offer Sent</h2>
          <p className="header-status">Waiting for user response</p>
        </div>

        <div className="task-details-card">
          <p className="task-type">{task?.type || "Errand Task"}</p>
          <h3 className="task-name">{task?.title || "Document Pickup"}</h3>
        </div>
      </div>
    </div>
  );
};

export default CounterModal;
