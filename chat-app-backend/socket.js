const SocketEvents = require("./constants/SocketEvents");

var recipient = [];

function socketEvents(io) {
   io.on("connection", (socket) => {
      console.log("User connected", socket.id);
      console.log("User ", socket.handshake.query.userId);
      recipient.push(socket.id);

      socket.on("disconnect", () => {
         console.log("User disconnected", socket.id);
         recipient = recipient.filter((item) => item !== socket.id);
      });

      socket.on(SocketEvents.sendMessage, (data) => {
         console.log("Data: ", data);
         socket.broadcast
            .to(recipient)
            .emit(SocketEvents.receiveMessage, data.message);
      });
   });
}

module.exports = socketEvents;
