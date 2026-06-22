import axios from "axios";

const raw = import.meta.env.VITE_API_URL;
let baseURL;
if (raw && raw.trim() !== "") {
  // Ensure deployed base includes the /api prefix and has no trailing slash
  const cleaned = raw.replace(/\/+$/, "");
  baseURL = cleaned.endsWith("/api") ? cleaned : `${cleaned}/api`;
} else {
  // In dev, use the Vite proxy at /api
  baseURL = "/api";
}

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
