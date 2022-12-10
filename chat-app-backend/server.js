require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const config = require("./config");
const server = http.createServer(app);
const cors = require("cors");
const socket = require("./socket");

// Database connection
require("./config/dbConfig");

// CORS Middlewares
app.use(cors({ origin: "*" }));
const io = require("socket.io")(server, {
   cors: {
      origin: "*",
   },
});

// Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.use((socket, next) => {
   const userId = socket.handshake.query.userId;

   if (userId) {
      socket.userId = userId;
   }
   next();
});

// Socket Events
socket(io);

// Routes import
const HomeRoutes = require("./routes");
const UserRoutes = require("./routes/user");
const AuthRoutes = require("./routes/auth");
const ChatRoutes = require("./routes/chat");

// Use routes
app.use("/api/", HomeRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/chat", ChatRoutes);

app.get("/", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

server.listen(config.port, () => {
   console.log("listening on *:", config.port);
});
