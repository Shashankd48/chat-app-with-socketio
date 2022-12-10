const SocketEvents = require("./constants/SocketEvents");
const { v4: uuidv4 } = require("uuid");
const ChatService = require("./services/ChatService");

var recipient = [];

// recipients socket ids and userIds  and room_id
var rooms = [];

var users = [];

function socketEvents(io) {
   io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;

      console.log("Connected IO : ", socket.id, "User ", userId);

      recipient.push(socket.id);

      for (const [id, socket] of io.of("/").sockets) {
         if (
            !users.find(
               (item) => item.socketId === id && item.userId === socket.userId
            )
         )
            users.push({
               socketId: id,
               userId: socket.userId,
            });
      }

      console.log("log: ", users);
      socket.emit(SocketEvents.onlineUsers, users);

      // check if room already exists
      // const foundRoom = rooms.find((item) => item === userId);

      // if (!foundRoom) rooms.push(userId);

      socket.on("disconnect", () => {
         console.log("User disconnected", socket.id);
         recipient = recipient.filter((item) => item !== socket.id);
         users = users.filter((item) => item.socketId !== socket.id);
         console.log("log: ", users);
         console.log("log: ", socket.userId);
      });

      socket.on(SocketEvents.sendMessage, (data) => {
         console.log("Data: ", data);
         // socket.broadcast
         //    .to(rooms)
         //    .emit(SocketEvents.receiveMessage, data.message);
         // socket.broadcast
         //    .to(recipient)
         //    .emit(SocketEvents.receiveMessage, data.message);
         console.log(
            users.find((item) => item.userId === data.message.receiverId)
         );
         const user = users.find(
            (item) => item.userId === data.message.receiverId
         );
         if (user)
            socket.broadcast
               .to(user.socketId)
               .emit(SocketEvents.receiveMessage, data.message);
      });

      socket.on("join-chat", (data) => {});
   });
}

module.exports = socketEvents;
