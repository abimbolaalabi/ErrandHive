import { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RuneerMessage.css";
import { AppContext } from "../../../Context/App";

// GLOBAL SOCKET
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default function RunnerMessage() {
  const { id } = useParams(); // errandId
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const token = JSON.parse(localStorage.getItem("userToken"));
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [chatInfo, setChatInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errands, setErrands] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Logged-in runner
  const userId = user?.id;

  // -----------------------------------------------------
  // 1️⃣ Fetch errands assigned to runner
  // -----------------------------------------------------
  const fetchRunnerErrands = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/errand/runner-errands`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setErrands(res?.data?.data || []);
    } catch (err) {
      console.log("Fetch errands error:", err);
    }
  };

  useEffect(() => {
    fetchRunnerErrands();
  }, []);

  // -----------------------------------------------------
  // 2️⃣ Load the selected conversation
  // -----------------------------------------------------
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setMessages([]);

        // Get errand info
        const info = await axios.get(`${BaseUrl}/errand/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChatInfo(info.data.data);

        const clientId = info.data.data?.poster?.id;
        const runnerId = info.data.data?.assignedTo; // FIXED: string

        if (!clientId || !runnerId) return;

        const receiverId = userId === runnerId ? clientId : runnerId;
        const roomId = [userId, receiverId].sort().join("_");

        // Get chat history by roomId
        const msg = await axios.get(`${BaseUrl}/messages/messages/history/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessages(msg.data?.data || []);
      } catch (err) {
        console.log("Chat load error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, userId]);

  // -----------------------------------------------------
  // 3️⃣ JOIN SOCKET ROOM
  // -----------------------------------------------------
  useEffect(() => {
    const clientId = chatInfo?.poster?.id;
    const runnerId = chatInfo?.assignedTo; // FIXED

    if (!clientId || !runnerId) return;

    const receiverId = userId === runnerId ? clientId : runnerId;
    const roomId = [userId, receiverId].sort().join("_");

    socket.emit("join_room", roomId);
  }, [chatInfo, userId]);

  // -----------------------------------------------------
  // 4️⃣ Receive live messages
  // -----------------------------------------------------
  useEffect(() => {
    const incoming = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", incoming);
    return () => socket.off("receive_message", incoming);
  }, []);

  // -----------------------------------------------------
  // 5️⃣ SEND MESSAGE
  // -----------------------------------------------------
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() || !chatInfo?.poster?.id) return;

    const clientId = chatInfo.poster.id;
    const runnerId = chatInfo.assignedTo; // FIXED

    const receiverId = userId === runnerId ? clientId : runnerId;
    const roomId = [userId, receiverId].sort().join("_");

    const payload = {
      senderId: userId,
      receiverId,
      errandId: id,
      text,
      roomId,
      createdAt: new Date(),
    };

    // Update UI instantly
    setMessages((prev) => [...prev, payload]);

    socket.emit("send_message", payload);

    try {
      await axios.post(`${BaseUrl}/messages/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Message save error:", err);
    }

    setText("");
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  return (
    <div className="messages-wrapper">

      {/* SIDEBAR */}
      <div className="messages-sidebar">
        <h3>Messages</h3>
        <p className="subtext">Chat with your clients</p>

        {errands.map((item) => (
          <div
            key={item.id}
            className={`conversation ${item.id === id ? "active" : ""}`}
            onClick={() => navigate(`/runnerlayout/runnermessage/${item.id}`)}
          >
            <div className="conv-user">
              <div className="avatar">
                {item.poster.firstName?.charAt(0)}
              </div>

              <div className="conversation-info">
                <p className="name">
                  {item.poster.firstName} {item.poster.lastName}
                </p>
                <p className="status">{item.title}</p>
                <p className="status-light">Tap to chat</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="messages-chat">

        <div className="chat-header">
          <div className="avatar large">
            {chatInfo?.poster?.firstName?.charAt(0)}
          </div>

          <div>
            <h4>{chatInfo?.poster?.firstName} {chatInfo?.poster?.lastName}</h4>
            <p>Client</p>
          </div>

          {/* MENU DROPDOWN */}
          <div className="menu-container">
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
            {menuOpen && (
              <div className="menu-options">
                <p onClick={() => navigate(`/runnerlayout/runnermessage/${id}/status`)}>
                  View Progress
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="chat-body">
          {messages.map((m, i) => {
            const mine = m.senderId === userId;

            return (
              <div key={i} className={`message ${mine ? "from-user" : ""}`}>
                {!mine && (
                  <div className="avatar small">
                    {chatInfo?.poster?.firstName?.charAt(0)}
                  </div>
                )}

                <div className="bubble">
                  <p>{m.text}</p>
                  <span className="time">
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {mine && <div className="avatar small">You</div>}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <form className="chat-input" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>➤</button>
        </form>

      </div>
    </div>
  );
}
