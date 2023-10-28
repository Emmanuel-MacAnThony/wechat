import express from "express";
import config from "config";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import log from "./utils/logger";
import socket from "./socket";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) => {
  res.send("Server is up");
});

httpServer.listen(port, host, () => {
  log.info("🚀 Server is listening 🚀");
  socket({ io });
});
