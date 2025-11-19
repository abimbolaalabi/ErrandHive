import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RuneerMessage.css";
import { AppContext } from "../../../Context/App";
import { socket } from "../../../socket";

export default function RunnerMessage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const token = JSON.parse(localStorage.getItem("userToken"));
  const BaseUrl = import.meta.env.VITE_BASE_URL;
const errandId = id.includes("_") ? id.split("_")[0] : id;
const roomId = `errand_${errandId}`;


  const [chatInfo, setChatInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errands, setErrands] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const userId = user?.id;

  // ================================
  // Fetch runner errands for sidebar
  // ================================
  useEffect(() => {
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
    fetchRunnerErrands();
  }, []);

  // ================================
  // Load chat info & history
  // ================================
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
        const runnerId = info.data.data?.assignedTo;

        if (!clientId || !runnerId) return;

        const receiverId = userId === runnerId ? clientId : runnerId;

        const history = await axios.get(
          `${BaseUrl}/messages/messages/history/${roomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages(history.data?.data || []);
      } catch (err) {
        console.log("Chat load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChat();
  }, [id, userId]);




 useEffect(() => {
  if (!roomId) return;

  socket.emit("join_room", roomId);

  const handleMessage = (msg) => {
    // Only append if the message is for THIS room
    if (msg.roomId === roomId) {
      setMessages(prev => [...prev, msg]);
    }
  };

  socket.on("receive_message", handleMessage);

  return () => {
    socket.off("receive_message", handleMessage);
  };
}, [roomId]);


  // ================================
  // Send message
  // ================================
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const clientId = chatInfo?.poster?.id;
    const runnerId = chatInfo?.assignedTo;
    if (!clientId || !runnerId) return;

    const receiverId = userId === runnerId ? clientId : runnerId;

    const payload = {
      senderId: userId,
      receiverId,
      text,
      errandId: id,
 roomId: `errand_${chatInfo.id}`,    };

    // realtime socket
    socket.emit("send_message", payload);

    setText("");

    try {
      await axios.post(`${BaseUrl}/messages/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Message save error:", err);
    }
  };
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isPaid = chatInfo?.paymentStatus === "paid";

  return (
    <div className="messages-wrapper">
   
      <div className="messages-sidebar">
        <h3>Messages</h3>
        <p className="subtext">Chat with your clients</p>

        {errands.filter((jobs)=>jobs.assignedTo ===userId && jobs.status !== "Completed").map((item) => (
          <div
            key={item.id}
            className={`conversation ${item.id == id ? "active" : ""}`}
            onClick={() =>
              navigate(`/runnerlayout/runnermessage/${item.id}`)
            }
          >
            <div className="conv-user">
              <div className="avatar">
                {item.poster?.firstName?.charAt(0)}
              </div>

              <div className="conversation-info">
                <p className="name">
                  {item.poster?.firstName} {item.poster?.lastName}
                </p>
                <p className="status">{item.title}</p>
                <p className="status-light">Tap to chat</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      

   
      {chatInfo?.id && !isPaid && (
        <div className="messages-chat center-block">
          <div className="lock-screen">
            <h2 className="lock-title">Payment Required</h2>
            <p className="lock-desc">
              The client has not made payment for this errand yet.
            </p>
            <p className="lock-desc">
              You cannot chat until payment is completed.
            </p>
          </div>
        </div>
      )}

      {/* ================================ */}
      {/* CHAT BOX */}
      {/* ================================ */}
      {chatInfo?.id && isPaid && (
        <div className="messages-chat">
          
          <div className="chat-header">
            <div style={{display: "flex"}}>
             <div className="avatar large">
              {chatInfo?.poster?.firstName?.charAt(0)}
            </div>

            <div>
              <h4>
                {chatInfo?.poster?.firstName} {chatInfo?.poster?.lastName}
              </h4>
              <p>Client</p>
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

          <div className="chat-body">
            {loading && <p>Loading messages...</p>}

            {messages.map((m) => {
              const mine = m.senderId === userId;

              return (
                <div
                  key={m.id || m.createdAt}
                  className={`message ${mine ? "from-user" : ""}`}
                >
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
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

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
