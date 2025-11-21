import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RuneerMessage.css";
import { AppContext } from "../../../Context/App";
import { socket } from "../../../socket";

export default function MessagesPage() {
  const { id } = useParams(); // errand ID
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const errandId = id?.includes("_") ? id.split("_")[0] : id;
  const roomId = `errand_${errandId}`;

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

  // ------------------ Fetch errands for sidebar ------------------
  useEffect(() => {
    const fetchMyRunners = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/errand/my-errands`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const assigned = res?.data?.data?.filter((e) => e.assignedTo != null);
        setMyRunners(assigned || []);
      } catch (err) {
        console.log("Runner fetch error:", err);
      }
    };

    fetchMyRunners();
  }, []);

  // ------------------ Load chat ------------------
  useEffect(() => {
    if (!id) return;

    const loadChat = async () => {
      try {
        setLoading(true);
        setMessages([]);

        const info = await axios.get(`${BaseUrl}/errand/get/${errandId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChatInfo(info.data.data);

        const clientId = info.data.data?.poster?.id;
        const runnerId = info.data.data?.assignedRunner?.id;

        if (!clientId || !runnerId) return;

        const msg = await axios.get(
          `${BaseUrl}/messages/messages/history/${roomId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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

  // ------------------ Join socket room ------------------
  useEffect(() => {
    const clientId = chatInfo?.poster?.id;
    const runnerId = chatInfo?.assignedRunner?.id;

    if (!clientId || !runnerId) return;

    socket.emit("join_room", roomId);
  }, [chatInfo, userId, roomId]);

  // ------------------ Receive live messages ------------------
  useEffect(() => {
    if (!roomId) return;

    socket.emit("join_room", roomId);

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [roomId]);

  // ------------------ Send message ------------------
  const sendMessage = async (e) => {
    e.preventDefault();

    const clientId = chatInfo?.poster?.id;
    const runnerId = chatInfo?.assignedRunner?.id;

    if (!text.trim() || !clientId || !runnerId) return;

    const receiverId = userId === clientId ? runnerId : clientId;

    const payload = {
      senderId: userId,
      receiverId,
      text,
      errandId,
      roomId,
      createdAt: new Date(),
    };

    socket.emit("send_message", payload);
    setText("");

    try {
      await axios.post(`${BaseUrl}/messages/${errandId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // ------------------ Auto scroll ------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ------------------ Payment lock ------------------
  const isPaid = chatInfo?.paymentStatus === "paid";

  return (
    <div className="messages-wrapper">
      {/* Sidebar */}
      <div className="messages-sidebar">
        <h3>Messages</h3>
        <p className="subtext">Chat with your runners</p>

        {myRunners.map((item) => (
          <div
            key={item.id}
            className={`conversation ${item.id === errandId ? "active" : ""}`}
            onClick={() => navigate(`/dashboard/messages/${item.id}`)}
          >
            <div className="conv-user">
              <div className="avatar">
                {item.assignedRunner?.firstName?.charAt(0)}
              </div>

              <div className="conversation-info">
                <p className="name">
                  {item.assignedRunner?.firstName}{" "}
                  {item.assignedRunner?.lastName}
                </p>
                <p className="status">{item.title}</p>
                <p className="status-light">Tap to chat</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lock screen */}
      {!isPaid && (
        <div className="messages-chat center-block">
          <h2 className="lock-title">Complete Payment to Continue</h2>
          <p className="lock-desc">
            You must complete the payment for this errand before messaging the
            runner.
          </p>
        </div>
      )}

      {/* Chat UI */}
      {isPaid && (
        <div className="messages-chat">
          <div className="chat-header">
            <div className="chat-user-info">
              <div className="avatar large">
                {chatInfo?.assignedRunner?.firstName?.charAt(0)}
              </div>

              <div>
                <h4>
                  {chatInfo?.assignedRunner?.firstName}{" "}
                  {chatInfo?.assignedRunner?.lastName}
                </h4>
                <p>Runner</p>
              </div>
            </div>

            <div className="menu-container">
              <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ⋮
              </button>

              {menuOpen && (
                <div className="menu-options">
                  <p
                    onClick={() =>
                      navigate(`/runnerlayout/runnermessage/${id}/status`)
                    }
                  >
                    View Progress
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Body */}
          <div className="chat-body">
            {loading && <p>Loading messages...</p>}

            {messages.map((m) => {
              const mine = m.senderId === userId;
              return (
                <div
                  key={m.id || Math.random()}
                  className={`message ${mine ? "from-user" : ""}`}
                >
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

          {/* Input */}
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
