import axios from "axios";

export default axios.create({
  // baseURL: "https://il8rigour.com/",
  // baseURL: "http://il8rigour.com:8000/",
  baseURL: "https://ac13-2405-201-37-21d9-6d0d-e15-3541-8f2d.ngrok-free.app/",
  // baseURL: "https://lms-5wr7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});