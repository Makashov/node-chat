import express from 'express';
import http from "http";
import { Server } from "socket.io";
import routes from "./routes/routes.js";
import webSocket from "./sockets/webSockets.js"
import {authMiddleware} from "./middlewares/authMiddleware.js";
import 'dotenv/config'
import "./config/mongoose.js"

const app = express();
app.use(express.json()); // Parse request as JSON
app.use('/', routes);

const server = http.createServer(app);

global.io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL
  }
});
global.io.use(authMiddleware);
global.io.on('connection', webSocket.connection);

server.listen(8080, () => {
  console.log('listening on *:8080');
});