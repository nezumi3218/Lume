import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // change to your backend url
  withCredentials: true,
});
console.log(import.meta.env.VITE_API_URL);

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
