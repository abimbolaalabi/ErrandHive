import { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import { AppContext } from "../../../Context/App";

// GLOBAL SOCKET
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default function MessagesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const token = JSON.parse(localStorage.getItem("userToken"));
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [chatInfo, setChatInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [myRunners, setMyRunners] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const userId = user?.id;

  // -----------------------------------------------------
  // FETCH ALL ASSIGNED ERRANDS FOR SIDEBAR
  // -----------------------------------------------------
  useEffect(() => {
    const fetchMyRunners = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/errand/my-errands`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const assigned = res?.data?.data?.filter(e => e.assignedTo != null);
        setMyRunners(assigned || []);
      } catch (err) {
        console.log("Runner fetch error:", err);
      }
    };

    fetchMyRunners();
  }, []);

  // -----------------------------------------------------
  // FETCH CHAT INFO + HISTORY
  // -----------------------------------------------------
  useEffect(() => {
    if (!id) return;

    const loadChat = async () => {
      try {
        setLoading(true);
        setMessages([]);

        const info = await axios.get(`${BaseUrl}/errand/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChatInfo(info.data.data);

        const clientId = info.data.data?.poster?.id;
        const runnerId = info.data.data?.assignedRunner?.id; // FIXED (runner object)

        if (!clientId || !runnerId) return;

        const receiverId = userId === clientId ? runnerId : clientId;
        const roomId = [userId, receiverId].sort().join("_");

        const msg = await axios.get(
          `${BaseUrl}/messages/messages/history/${roomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages(msg.data?.data || []);
      } catch (err) {
        console.log("Chat load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChat();
  }, [id, userId]);

  // -----------------------------------------------------
  // JOIN SOCKET ROOM
  // -----------------------------------------------------
  useEffect(() => {
    const clientId = chatInfo?.poster?.id;
    const runnerId = chatInfo?.assignedRunner?.id;

    if (!clientId || !runnerId) return;

    const receiverId = userId === clientId ? runnerId : clientId;
    const roomId = [userId, receiverId].sort().join("_");

    socket.emit("join_room", roomId);
  }, [chatInfo, userId]);

  // -----------------------------------------------------
  // RECEIVE MESSAGES LIVE (NO DUPLICATES)
  // -----------------------------------------------------
  useEffect(() => {
    const incoming = (msg) => {
      if (msg.senderId !== userId) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("receive_message", incoming);
    return () => socket.off("receive_message", incoming);
  }, [userId]);

  // -----------------------------------------------------
  // SEND MESSAGE
  // -----------------------------------------------------
  const sendMessage = async (e) => {
    e.preventDefault();

    const clientId = chatInfo?.poster?.id;
    const runnerId = chatInfo?.assignedRunner?.id;

    if (!text.trim() || !clientId || !runnerId) return;

    const receiverId = userId === clientId ? runnerId : clientId;
    const roomId = [userId, receiverId].sort().join("_");

    const payload = {
      senderId: userId,
      receiverId,
      text,
      errandId: id,
      roomId,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, payload]);
    socket.emit("send_message", payload);

    try {
      await axios.post(`${BaseUrl}/messages/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Save error:", err);
    }

    setText("");
  };

  // -----------------------------------------------------
  // AUTO SCROLL
  // -----------------------------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -----------------------------------------------------
  // PAYMENT LOCK SCREEN
  // -----------------------------------------------------
  const isPaid = chatInfo?.paymentStatus === "paid";

  return (
    <div className="messages-wrapper">

      {/* SIDEBAR LEFT */}
      <div className="messages-sidebar">
        <h3>Messages</h3>
        <p className="subtext">Chat with your runners</p>

        {myRunners.map((item) => (
          <div
            key={item.id}
            className={`conversation ${item.id === id ? "active" : ""}`}
            onClick={() => navigate(`/dashboard/messages/${item.id}`)}
          >
            <div className="conv-user">
              <div className="avatar">
                {item.assignedRunner?.firstName?.charAt(0)}
              </div>

              <div className="conversation-info">
                <p className="name">
                  {item.assignedRunner?.firstName} {item.assignedRunner?.lastName}
                </p>
                <p className="status">{item.title}</p>
                <p className="status-light">Tap to chat</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔒 LOCK CHAT WHEN PAYMENT IS PENDING */}
      {!isPaid && (
        <div className="messages-chat center-block">
          <h2 className="lock-title">Complete Payment to Continue</h2>
          <p className="lock-desc">
            You must complete the payment for this errand before messaging the runner.
            Once your payment is verified, chat will be automatically unlocked.
          </p>
        </div>
      )}

      {/* CHAT UI — ONLY SHOW WHEN PAID */}
      {isPaid && (
        <div className="messages-chat">
          <div className="chat-header">
            <div className="avatar large">
              {chatInfo?.assignedRunner?.firstName?.charAt(0)}
            </div>

            <div>
              <h4>{chatInfo?.assignedRunner?.firstName} {chatInfo?.assignedRunner?.lastName}</h4>
              <p>Runner</p>
            </div>

            <div className="menu-container">
              <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>

              {menuOpen && (
                <div className="menu-options">
                  <p onClick={() => navigate(`/dashboard/messages/${id}/status`)}>
                    View Progress
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CHAT BODY */}
          <div className="chat-body">
            {loading && <p>Loading messages...</p>}

            {messages.map((m, i) => {
              const mine = m.senderId === userId;

              return (
                <div key={i} className={`message ${mine ? "from-user" : ""}`}>
                  {!mine && (
                    <div className="avatar small">
                      {chatInfo?.assignedRunner?.firstName?.charAt(0)}
                    </div>
                  )}

                  <div className="bubble">
                    <p>{m.text}</p>
                    <span className="time">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>

                  {mine && <div className="avatar small">You</div>}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* CHAT INPUT */}
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
      )}
    </div>
  );
}
