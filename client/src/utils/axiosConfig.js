import axios from "axios";
// ✅ Make sure this points to your backend server
axios.defaults.baseURL = "http://localhost:8080"; 

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ add "Bearer" prefix
  }
  return config;
});

export default axios;
