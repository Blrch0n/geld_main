import axios from "axios";

export const api = axios.create({
  baseURL: "https://onegeld-main.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
