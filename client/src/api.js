import axios from "axios";

// Set up your backend base URL
const API = axios.create({
  baseURL: "http://localhost:8080/api/v1", // your Express backend
});

// Add token automatically (if stored in localStorage)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getProfile = () => API.get("/auth/user-auth"); 
// or whatever your route is for user data
