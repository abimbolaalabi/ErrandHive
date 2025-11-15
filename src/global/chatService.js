import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BaseUrl,
});


api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("userToken"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getMessages = async (userId) => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};


export const sendMessage = async (receiverId, text) => {
  const response = await api.post("/messages", { receiverId, text });
  return response.data;
};

export default {
  getMessages,
  sendMessage,
};
