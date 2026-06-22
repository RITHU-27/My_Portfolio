import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import projectRoutes from "./routes/projectRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({origin: "https://my-portfolio-3njc6aelx-rithanyaa-v-s-projects.vercel.app/"}));
  app.use(express.json());
  app.use(morgan("dev"));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api", limiter);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/projects", projectRoutes);
  app.use("/api/messages", messageRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || "Internal server error",
    });
  });

  return app;
}
