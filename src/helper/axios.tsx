import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000",
  // baseURL: "https://api.maitriai.com/smart_hr",
  // baseURL: "https://lms-5wr7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
   
  },
});