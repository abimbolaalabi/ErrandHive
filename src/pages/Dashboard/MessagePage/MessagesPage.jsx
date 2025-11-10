import { useEffect, useState, useContext, useRef } from "react";
import "./MessagesPage.css";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../Context/App";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

const MessagesPage = () => {
  const { user } = useContext(AppContext);
  const { runnerId } = useParams(); 
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const currentUserId = user?.id || JSON.parse(localStorage.getItem("userDetails"))?.id;


  const getMessages = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/messaages/${runnerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res?.data?.data || []);
    } catch (error) {
      console.log("Error fetching messages:", error?.response?.data || error);
    }
  };


  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: runnerId,
      text: message,
    };


    setMessages((prev) => [
      ...prev,
      { ...newMessage, fromUser: true, createdAt: new Date() },
    ]);
    setMessage("");

    try {
      await axios.post(`${BaseUrl}/write/message`, newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      socket.emit("private-message", newMessage);
    } catch (error) {
      console.log("Error sending message:", error?.response?.data || error);
    }
  };

 
  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("join", currentUserId);

    socket.on("new-message", (msg) => {
      if (
        (msg.senderId === currentUserId && msg.receiverId === runnerId) ||
        (msg.senderId === runnerId && msg.receiverId === currentUserId)
      ) {
        setMessages((prev) => {
          if (prev.some((m) => String(m._id) === String(msg._id))) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      socket.off("new-message");
    };
  }, [currentUserId, runnerId]);

  // ✅ Scroll to bottom automatically
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Fetch old messages initially
  useEffect(() => {
    if (runnerId) getMessages();
  }, [runnerId]);

  return (
    <div className="messages-wrapper">
      <div className="messages-chat">
        <div className="chat-header">
          <div className="avatar large">👤</div>
          <div>
            <h4>Chat</h4>
            <p>Conversation with Runner</p>
          </div>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => {
            const isFromUser = String(msg.senderId) === String(currentUserId);
            const time = new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={i}
                className={`message ${isFromUser ? "from-user" : ""}`}
              >
                <div className="bubble">
                  <p>{msg.text}</p>
                  <span className="time">{time}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">➤</button>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;
