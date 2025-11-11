import { useEffect, useState } from "react";
import "./MessagesPage.css";
import { useParams } from "react-router-dom";
import { getMessages } from "../../../global/chatService";
import { connectSocket } from "../../../global/socket";
// import { connectSocket } from "../../config/socket";
// import { getMessages } from "../../api/messageService";

const MessagesPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const { userId } = useParams(); 
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");


  useEffect(() => {
    if (!token) return;

    const newSocket = connectSocket(token);
    setSocket(newSocket);

    // Join private room
    newSocket.emit("join_room", {
      senderId: currentUserId,
      receiverId: userId,
    });

    // Listen for messages
    newSocket.on("receive_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          text: msg.text,
          fromUser: msg.senderId === currentUserId,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => newSocket.disconnect();
  }, [userId, token, currentUserId]);

  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getMessages(userId);
        const formatted = data.map((m) => ({
          text: m.text,
          fromUser: m.senderId === currentUserId,
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };
    fetchHistory();
  }, [userId, currentUserId]);


  const handleSend = () => {
    if (!message.trim() || !socket) return;

    const newMsg = {
      senderId: currentUserId,
      receiverId: userId,
      text: message,
    };

    socket.emit("send_message", newMsg);

  
    setMessages((prev) => [
      ...prev,
      { text: message, fromUser: true, time: "Now" },
    ]);
    setMessage("");
  };


  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);

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
            <div
              key={i}
              className={`message ${msg.fromUser ? "from-user" : ""}`}
            >
              {!msg.fromUser && <div className="avatar small">JD</div>}
              <div className="bubble">
                <p>{msg.text}</p>
                <span className="time">{msg.time}</span>
              </div>
              {msg.fromUser && <div className="avatar small">You</div>}
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
