import { useEffect, useRef, useState, useContext , } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { AppContext } from "../../../Context/App";
import "./Chat.css";
import { useParams } from "react-router-dom";

// ✅ Initialize socket correctly
const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  reconnection: true,
});



export default function Chat({ receiver }) {
  const{runnerId}= useParams()
  const { user } = useContext(AppContext);
  const token =JSON.parse(localStorage.getItem("userToken"));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

const [chatinfo, setChatInfo] = useState({})
  const userId = user?._id || user?.id;
  const receiverId = chatinfo?.assignedRunner?.id


  console.log("🟢 Receiver:", token);


const Baseurl = import.meta.env.VITE_BASE_URL
const getMessages = async()=> {
try {
  const res = await axios.get(`${Baseurl}/errand/get/${runnerId}`)
  setChatInfo(res.data.data)

} catch (error) {
  console.log(error)
}
}

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/messages/${runnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🟢 Fetched messages:", res.data);
      // Adjust based on your API response structure
      setMessages(res.data?.data || []);
    } catch (err) {
      console.error(
        " Error fetching messages:",
        err?.response?.data || err.message
      );
    }
  };
getMessages()
  fetchMessages();
}, [runnerId, userId, receiverId, token]);

  const sendMessa = async()=>{try {
console.log("chatinfo   :",chatinfo)
        const payload ={errandId:runnerId,senderId:chatinfo?.poster?.id,text}
console.log("i am payload  :",payload)

    await axios.post( `${import.meta.env.VITE_BASE_URL}/messages/${runnerId}`,payload,
          { headers: { Authorization: `Bearer ${token}` } })
    
  } catch (error) {
   console.log(error) 
  }}

console.log("messsages,   ",messages)
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    const onNewMessage = (msg) => {
      if (msg.error) {
        const toast = document.createElement("div");
        toast.textContent = msg.error;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#ffdddd";
        toast.style.color = "#b30000";
        toast.style.padding = "10px 16px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        toast.style.fontWeight = "500";
        toast.style.zIndex = "9999";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
        return;
      }

      // Only add relevant messages for this conversation
      if (
        (msg.senderId === userId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === userId)
      ) {
        setMessages((prev) => {
          if (prev.some((m) => String(m._id) === String(msg._id))) return prev;
          return [...prev, msg];
        });
      }
    };

    socket.on("new-message", onNewMessage);

    return () => {
      socket.off("new-message", onNewMessage);
    };
  }, [userId, receiverId]);

  // ✅ Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !userId || !receiverId) return;

    socket.emit("private-message", {
      senderId: userId,
      receiverId,
      text,
    });

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        senderId: userId,
        receiverId,
        text,
        createdAt: new Date(),
      },
    ]);

    setText("");
  };

  // ✅ Auto scroll on new messages




  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
console.log(chatinfo);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with {chatinfo?. assignedRunner?.firstName|| "User"}</div>

      <div className="chat-messages">
        {loading && <div className="loader">Loading messages…</div>}

        {messages.length === 0 && !loading && (
          <div className="no-messages">No messages yet — say hi 👋</div>
        )}

        {messages.map((m) => {
          const isSent = String(m.senderId) === String(userId);
          const date = new Date(m.createdAt);
          const now = new Date();
          const isToday = date.toDateString() === now.toDateString();
          const formatted = isToday
            ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : date.toLocaleString([], {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              });

          return (
            <div
              key={m._id || Math.random()}
              className={`message ${isSent ? "sent" : "received"}`}
            >
              <div className="text">{m.text}</div>
              <div className="ts">{formatted}</div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit"onClick={sendMessa}>Send</button>
      </form>
    </div>
  );
}















































// import { useEffect, useState } from "react";
// import "./MessagesPage.css";
// import { useParams } from "react-router-dom";
// import { getMessages } from "../../../global/chatService";
// import { connectSocket } from "../../../global/socket";
// // import { connectSocket } from "../../config/socket";
// // import { getMessages } from "../../api/messageService";

// const MessagesPage = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   const { userId } = useParams(); 
//   const token = localStorage.getItem("token");
//   const currentUserId = localStorage.getItem("userId");


//   useEffect(() => {
//     if (!token) return;

//     const newSocket = connectSocket(token);
//     setSocket(newSocket);

//     // Join private room
//     newSocket.emit("join_room", {
//       senderId: currentUserId,
//       receiverId: userId,
//     });

//     // Listen for messages
//     newSocket.on("receive_message", (msg) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: msg.text,
//           fromUser: msg.senderId === currentUserId,
//           time: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     });

//     return () => newSocket.disconnect();
//   }, [userId, token, currentUserId]);

  
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const data = await getMessages(userId);
//         const formatted = data.map((m) => ({
//           text: m.text,
//           fromUser: m.senderId === currentUserId,
//           time: new Date(m.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         }));
//         setMessages(formatted);
//       } catch (err) {
//         console.error("Error fetching messages:", err.message);
//       }
//     };
//     fetchHistory();
//   }, [userId, currentUserId]);


//   const handleSend = () => {
//     if (!message.trim() || !socket) return;

//     const newMsg = {
//       senderId: currentUserId,
//       receiverId: userId,
//       text: message,
//     };

//     socket.emit("send_message", newMsg);

  
//     setMessages((prev) => [
//       ...prev,
//       { text: message, fromUser: true, time: "Now" },
//     ]);
//     setMessage("");
//   };


//   useEffect(() => {
//     const chatBody = document.querySelector(".chat-body");
//     if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
//   }, [messages]);

//   return (
//     <div className="messages-wrapper">
//       <div className="messages-sidebar">
//         <h3>Messages</h3>
//         <p className="subtext">Chat with your runners</p>
//         <div className="search-box">
//           <input type="text" placeholder="Search conversations..." />
//         </div>

//         <div className="conversation active">
//           <div style={{ display: "flex" }}>
//             <div className="avatar">JD</div>
//             <div className="conversation-info">
//               <p className="name">John Doe</p>
//               <p className="status">Package return</p>
//               <p className="status-light">Request accepted</p>
//             </div>
//           </div>
//           <span className="online-dot">online</span>
//         </div>
//       </div>

//       <div className="messages-chat">
//         <div className="chat-header">
//           <div className="avatar large">JD</div>
//           <div>
//             <h4>John Doe</h4>
//             <p>Runner</p>
//           </div>
//           <button className="menu-btn">⋮</button>
//         </div>

//         <div className="chat-body">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`message ${msg.fromUser ? "from-user" : ""}`}
//             >
//               {!msg.fromUser && <div className="avatar small">JD</div>}
//               <div className="bubble">
//                 <p>{msg.text}</p>
//                 <span className="time">{msg.time}</span>
//               </div>
//               {msg.fromUser && <div className="avatar small">You</div>}
//             </div>
//           ))}
//         </div>

//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend}>➤</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;
