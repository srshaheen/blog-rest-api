import express from "express";
import apiRoutes from "../routes/api";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

export default async function handler(req, res) {
  const server = createServer(app);
  server.emit("request", req, res);
}

