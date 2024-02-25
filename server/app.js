const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "config/config.env" });
const user = require("./routes/User");
const auction = require("./routes/Auction");
const Auction = require("./models/Auction");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://kisaan-sathi.vercel.app",
    credentials: true,
  })
);

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

    socket.on('placeBid',async (data) => {
        
        const currentAuction = await Auction.findById(data.auction._id)
        // console.log(data);
        
            if(currentAuction) {
            currentAuction.bidPrice += data.bidAmount;
            }
            currentAuction.bidder = data.bidder;
            currentAuction.bidderEmail = data.bidderEmail;

        await currentAuction.save();

        
        io.to(data.auction._id).emit('updateAuction',{updatedAuction: currentAuction,bidder:data.bidder,bidderEmail:data.bidderEmail})
        }
    )
    socket.on('redirect',(data) => {
        socket.join(data.auction._id)
    })
    socket.on('joinAuction', (data) => {
        socket.join(data.auctionId)
      });
    socket.on('message-passed',(data) => {
        io.to(data.auction_id).emit('message-to-all',{message:data.message})
    })
});

//router
app.use("/api/v1", user);
app.use("/api/v1", auction);

module.exports = server;
