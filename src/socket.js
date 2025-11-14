// src/socket.js
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_UR, {
  transports: ["websocket"],
  reconnection: true,
});
