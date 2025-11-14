import { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import { AppContext } from "../../../Context/App";

// ONE GLOBAL SOCKET
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default function MessagesPage() {
  const { id } = useParams(); // errandId
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const token = JSON.parse(localStorage.getItem("userToken"));
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [chatInfo, setChatInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [myRunners, setMyRunners] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false)

  const messagesEndRef = useRef(null);

  // Logged in user
  const userId = user?.id

  // Identify participants
  const clientId = chatInfo?.poster?.id;
  const runnerId = chatInfo?.assignedTo

  // Detconsermine receiver

  console.log("dhfhffj", runnerId, clientId)
  let receiverId = null;


  console.log("tessstere  ", chatInfo?.poster)
  if (clientId && runnerId) {
    receiverId = userId === clientId ? runnerId : clientId;
  }

  // ⭐ FETCH ALL ERRANDS FOR SIDEBAR LIST
  const fetchMyRunners = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/errand/my-errands
`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const assigned = res?.data?.data?.filter(e => e.assignedTo != null);

      console.log("assigned pag     e", res?.data.data)
      setMyRunners(assigned || []);
    } catch (err) {
      console.log("Runner fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMyRunners();
  }, []);

  // ⭐ JOIN ROOM
  useEffect(() => {
    if (!userId || !receiverId) return;

    const roomId = [userId, receiverId].sort().join("_");

    socket.emit("join_room", roomId);
  }, [userId, receiverId]);

  // ⭐ LISTEN FOR LIVE MESSAGES
  useEffect(() => {
    const incoming = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", incoming);

    return () => socket.off("receive_message", incoming);
  }, []);

  // ⭐ LOAD CHAT INFO + MESSAGE HISTORY
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);

  //       const info = await axios.get(`${BaseUrl}/errand/get/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setChatInfo(info.data.data);

  //       const msg = await axios.get(`${BaseUrl}/messages/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setMessages(msg.data?.data || []);
  //     } catch (err) {
  //       console.log("Chat fetch error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [id]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        setMessages([]); // 🟢 clear old messages when switching

        const info = await axios.get(`${BaseUrl}/errand/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChatInfo(info.data.data);

        const msg = await axios.get(`${BaseUrl}/messages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessages(msg.data?.data || []);
      } catch (err) {
        console.log("Chat fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() || !receiverId) return;

    const roomId = [userId, receiverId].sort().join("_");

    const payload = {
      senderId: userId,
      receiverId,
      text,
      roomId,
      createdAt: new Date(),
    };

    // 1️⃣ ADD THIS — Update your UI immediately
    setMessages(prev => [...prev, payload]);

    // 2️⃣ Emit to socket
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

  // ⭐ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-wrapper">

      {/* SIDEBAR */}
      <div className="messages-sidebar">
        <h3>Messages</h3>
        <p className="subtext">Chat with your runners</p>

        <div className="search-box">
          <input type="text" placeholder="Search conversations..." />
        </div>

        {/* Runner / Conversation List */}
        {myRunners.length === 0 && (
          <p className="empty-text">No runners yet</p>
        )}

        {myRunners.map((item) => (
          <div
            key={item.id}
            className={`conversation ${item.id === id ? "active" : ""}`}
            onClick={() => navigate(`/dashboard/messages/${item.id}`)}
          >
            <div className="conv-user">
              <div className="avatar">
                {item.assignedTo.firstName?.[0] || "U"}
              </div>

              <div className="conversation-info">
                <p className="name">
                  {item.assignedTo.firstName} {item.assignedTo.lastName}
                </p>
                <p className="status">{item.title}</p>
                <p className="status-light">Click to chat</p>
              </div>
            </div>

            <span className="online-dot">online</span>
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="messages-chat">
        <div className="chat-header">
          <div className="avatar large">{chatInfo?.assignedTo?.firstName?.charAt(0).toUpperCase()}</div>
          <div>
            <h4>
              {chatInfo?.assignedTo?.firstName ||
                chatInfo?.poster?.firstName ||
                "User"}
            </h4>
            <p>Runner</p>
          </div>
          <div className="menu-container">
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ⋮
            </button>

            {menuOpen && (
              <div className="menu-options">
                <p onClick={() => navigate(`/dashboard/messages/${id}/status`)}>View Progress</p>
              </div>
            )}
          </div>

        </div>

        <div className="chat-body">
          {loading && <p>Loading...</p>}

          {messages.map((m, i) => {
            const mine = m.senderId === userId;

            return (
              <div key={i} className={`message ${mine ? "from-user" : ""}`}>
                {!mine && (
                  <div className="avatar small">
                    {chatInfo?.assignedTo?.firstName?.[0] || "U"}
                  </div>
                )}

                <div className="bubble">
                  <p>{m.text}</p>
                  <span className="time">
                    {new Date(m.createdAt).toLocaleTimeString()}
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
          <button >➤</button>
        </form>

      </div>
    </div>
  );
}
