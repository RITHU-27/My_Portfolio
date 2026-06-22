import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://27rithu10_db_user:27rithu@cluster.vqwm1ym.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster";

async function start() {
  try {
    await connectDB(MONGO_URI);
    const app = createApp();
    app.get("/", (req, res) => {
      res.send("Portfolio API is running...");
    });
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
