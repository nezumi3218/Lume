import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-js-uc2d.vercel.app/api/v1", // change to your backend url
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
