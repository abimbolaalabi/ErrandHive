import React, { useState } from "react";
import "./MessagesPage.css";

const MessagesPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "JD", text: "Hi! I've accepted your pickup errand. I’ll head to the pickup location now", time: "10:16am", fromUser: false },
    { sender: "You", text: "Alright! please handle the package with care.", time: "10:17am", fromUser: true },
    { sender: "JD", text: "Absolutely! Your package will get to you safely", time: "10:18am", fromUser: false },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { sender: "You", text: message, time: "Now", fromUser: true };
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  return (
    <div className="messages-wrapper">
      <div className="messages-sidebar">
        <h3>Messages</h3>
        <p className="subtext">Chat with your runners</p>

        <div className="search-box">
          <input type="text" placeholder="Search conversations..." />
        </div>

        <div className="conversation active">
          <div style={{ display: "flex" }}>
            <div className="avatar">JD</div>
            <div className="conversation-info">
              <p className="name">John Doe</p>
              <p className="status">Package return</p>
              <p className="status-light">Request accepted</p>
            </div>
          </div>

          <span className="online-dot">online</span>
        </div>
      </div>

      <div className="messages-chat">
        <div className="chat-header">
          <div className="avatar large">JD</div>
          <div>
            <h4>John Doe</h4>
            <p>Runner</p>
          </div>
          <button className="menu-btn">⋮</button>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.fromUser ? "from-user" : ""}`}>
              {!msg.fromUser && <div className="avatar small">{msg.sender}</div>}

              <div className="bubble">
                <p>{msg.text}</p>
                <span className="time">{msg.time}</span>
              </div>

              {msg.fromUser && <div className="avatar small">{msg.sender}</div>}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
