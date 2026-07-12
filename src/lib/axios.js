import axios from "axios";

const API = axios.create({
  baseURL: "backendjs-production.up.railway.app", // change to your backend url
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
