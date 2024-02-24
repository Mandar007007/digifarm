const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config({ path: "config/config.env" })


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    // origin: "https://kisaan-sathi.vercel.app",
    credentials: true,
  }));

  const server = http.createServer(app); 

 io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        // origin: "https://kisaan-sathi.vercel.app",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    socket.on('message-sent', (data) => {
        io.sockets.emit('message-received', { message: data.message });
    });
});

module.exports = server;