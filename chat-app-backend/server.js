require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const config = require("./config");
const server = http.createServer(app);
const cors = require("cors");

// Database connection
require("./config/dbConfig");

app.use(cors({ origin: "*" }));
const io = require("socket.io")(server, {
   cors: {
      origin: "*",
   },
});
// Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {
   console.log("User connected", socket.id);
   socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
   });

   socket.on("message", (data) => {
      console.log("Data: ", data);
      socket.broadcast.emit("message", data.message);
   });
});

// Routes import
const HomeRoutes = require("./routes");
const UserRoutes = require("./routes/user");
const AuthRoutes = require("./routes/auth");

// Use routes
app.use("/api/", HomeRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

server.listen(config.port, () => {
   console.log("listening on *:", config.port);
});
