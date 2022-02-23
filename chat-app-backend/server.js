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
      console.log("Data: " + data);
      io.emit("message", { socketId: socket.id, message: data.message });
   });
});

// Routes import
const HomeRoutes = require("./routes");
const UserRoutes = require("./routes/user");

// Use routes
app.use("/api/", HomeRoutes);
app.use("/api/user", UserRoutes);

server.listen(config.port, () => {
   console.log("listening on *:", config.port);
});
