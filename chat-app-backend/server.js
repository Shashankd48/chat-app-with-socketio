require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const config = require("./config");
const server = http.createServer(app);
const cors = require("cors");

app.use(cors({ origin: "*" }));

const io = require("socket.io")(server, {
   cors: {
      origin: "*",
   },
});

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

app.get("/api", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

app.get("/", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

app.get("/template", (req, res) => {
   try {
      return res.sendFile(__dirname + "/templates/index.html");
   } catch (error) {
      console.log(error);
      throw error;
   }
});

server.listen(config.port, () => {
   console.log("listening on *:", config.port);
});
