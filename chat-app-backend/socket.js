const SocketEvents = require("./constants/SocketEvents");
const { v4: uuidv4 } = require("uuid");
const ChatService = require("./services/ChatService");

var recipient = [];

// recipients socket ids and userIds  and room_id
var rooms = [];

function socketEvents(io) {
   io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;
      console.log("User connected", socket.id);
      console.log("User ", userId);
      recipient.push(socket.id);

      // check if room already exists
      const foundRoom = rooms.find((item) => item === userId);

      if (!foundRoom) rooms.push(userId);

      socket.join(rooms);

      socket.on("disconnect", () => {
         console.log("User disconnected", socket.id);
         recipient = recipient.filter((item) => item !== socket.id);

         console.log(rooms);
      });

      socket.on(SocketEvents.sendMessage, (data) => {
         console.log("Data: ", data);
         socket.broadcast
            .to(data.receiverId)
            .emit(SocketEvents.receiveMessage, data.message);
         // socket.broadcast
         //    .to(recipient)
         //    .emit(SocketEvents.receiveMessage, data.message);
      });

      socket.on("join-chat", (data) => {});
   });
}

module.exports = socketEvents;
