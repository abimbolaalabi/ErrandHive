// src/config/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";

export const connectSocket = (token) => {
  if (!token) return null;

  const socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log(" Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log(" Socket disconnected");
  });

  return socket;
};





// import { io } from "socket.io-client";

// const WS_URL = process.env.VITE_SOCKET || "http://localhost:3000";

// class SocketService {
//   socket = null;
//   pendingSubscriptions = new Set();

//   connect(token) {
//     if (this.socket?.connected) {
//       console.log("WebSocket already connected");
//       return;
//     }

//     // If socket exists but disconnected, disconnect it first
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }

//     console.log("Connecting to WebSocket...");
//     this.socket = io(WS_URL, {
//       auth: token ? { token } : undefined,
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     this.socket.on("connect", () => {
//       console.log("WebSocket connected:", this.socket?.id);

//       // Subscribe to any pending subscriptions
//       if (this.pendingSubscriptions.size > 0) {
//         console.log(
//           "Subscribing to pending auctions:",
//           Array.from(this.pendingSubscriptions)
//         );
//         this.pendingSubscriptions.forEach((auctionId) => {
//           this.socket?.emit("subscribe_auction", auctionId);
//         });
//       }
//     });

//     this.socket.on("disconnect", () => {
//       console.log("WebSocket disconnected");
//     });

//     this.socket.on("connect_error", (error) => {
//       console.error("WebSocket connection error:", error);
//     });

//     this.socket.on("subscribed", (data) => {
//       console.log("Subscribed to auction:", data.auctionItemId);
//     });
//   }

  


//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }

//   subscribeToAuction(auctionId) {
//     console.log("Requesting subscription to auction:", auctionId);
//     this.pendingSubscriptions.add(auctionId);

//     if (this.socket?.connected) {
//       console.log("Socket connected, subscribing immediately");
//       this.socket.emit("subscribe_auction", auctionId);
//     } else {
//       console.log("Socket not connected yet, subscription pending");
//     }
//   }

//   unsubscribeFromAuction(auctionId) {
//     console.log("Unsubscribing from auction:", auctionId);
//     this.pendingSubscriptions.delete(auctionId);
//     this.socket?.emit("unsubscribe_auction", auctionId);
//   }

//   on(event, callback) {
//     this.socket?.on(event, callback);
//   }

//   off(event, callback) {
//     if (callback) {
//       this.socket?.off(event, callback);
//     } else {
//       this.socket?.off(event);
//     }
//   }

//   emit(event, ...args) {
//     this.socket?.emit(event, ...args);
//   }

//   isConnected() {
//     return this.socket?.connected ?? false;
//   }
// }

// export const socketService = new SocketService();

// src/services/socketService.js
// import { io } from "socket.io-client";

// const WS_URL = import.meta.env.VITE_SOCKET_URL || "https://errandhive-project.onrender.com";

// class SocketService {
//   socket = null;
//   pendingRooms = new Set();

//   connect(token) {
//     if (this.socket?.connected) return;

//     if (this.socket) this.socket.disconnect();

//     this.socket = io(WS_URL, {
//       auth: token ? { token } : undefined,
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     this.socket.on("connect", () => {
//       console.log("Socket connected:", this.socket.id);
//       this.pendingRooms.forEach(room => this.socket.emit("join_room", room));
//       this.pendingRooms.clear();
//     });

//     this.socket.on("disconnect", () => console.log("Socket disconnected"));
//     this.socket.on("connect_error", err => console.error("Socket error:", err));
//   }

//   joinRoom(roomId) {
//     if (!roomId) return;
//     this.pendingRooms.add(roomId);
//     if (this.socket?.connected) {
//       this.socket.emit("join_room", roomId);
//     }
//   }

//   leaveRoom(roomId) {
//     this.pendingRooms.delete(roomId);
//     this.socket?.emit("leave_room", roomId);
//   }

//   on(event, callback) {
//     this.socket?.on(event, callback);
//   }

//   off(event, callback) {
//     this.socket?.off(event, callback);
//   }

//   emit(event, data) {
//     this.socket?.emit(event, data);
//   }

//   disconnect() {
//     this.socket?.disconnect();
//     this.socket = null;
//   }

//   isConnected() {
//     return this.socket?.connected ?? false;
//   }
// }

// export const socketService = new SocketService();
