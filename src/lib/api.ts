import axios from "axios";

export const api = axios.create({
  //baseURL: "http://localhost:3333",
  baseURL: "https://api-correia.onrender.com",
  //baseURL: "https://correia-api.vercel.app",
});
