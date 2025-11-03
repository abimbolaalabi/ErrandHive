import { useState } from "react";
import "./RuneerMessage.css";

const RunnerMessage = () => {
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
    <div className="runner-message-wrapper">
      <div className="runner-message-sidebar">
        <h3>Messages</h3>

        <div className="runner-search-box">
          <input type="text" placeholder="Search conversations..." />
        </div>

        <div className="runner-conversation active">
          <div style={{ display: "flex" }}>
            <div className="runner-avatar">JD</div>
            <div className="runner-conversation-info">
              <p className="runner-name">John Doe</p>
              <p className="runner-status">Package return</p>
              <p className="runner-status-light">Request accepted</p>
            </div>
          </div>
          <span className="runner-online-dot">online</span>
        </div>
      </div>

      <div className="runner-message-chat">
        <div className="runner-chat-header">
          <div className="runner-avatar large">JD</div>
          <div>
            <h4 style={{fontSize:"1.5rem"}}>John Doe</h4>
            <p style={{fontSize:"1rem"}}>Runner</p>
          </div>
          <button className="runner-menu-btn">⋮</button>
        </div>

        <div className="runner-chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`runner-message ${msg.fromUser ? "from-user" : ""}`}>
              {!msg.fromUser && <div className="runner-avatar small">{msg.sender}</div>}

              <div className="runner-bubble">
                <p>{msg.text}</p>
                <span className="runner-time">{msg.time}</span>
              </div>

              {msg.fromUser && <div className="runner-avatar small">{msg.sender}</div>}
            </div>
          ))}
        </div>

        <div className="runner-chat-input">
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

export default RunnerMessage;
