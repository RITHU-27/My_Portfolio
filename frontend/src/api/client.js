import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchProjects() {
  const { data } = await api.get("/projects");
  return data;
}

export async function sendMessage(payload) {
  const { data } = await api.post("/messages", payload);
  return data;
}

export default api;
