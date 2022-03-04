function onConnect() {
   ChatService.findContactByUserId(userId).then((contact) => {
      // Create rooms for each users
      // Check if user already exist in this room
      let foundRoom = null;

      for (let i = 0; i < rooms.length; i++) {
         for (let j = 0; j < rooms[i].recipients.length; j++) {
            if (rooms[i].recipients[j].userId === userId) {
               foundRoom = i;
               break;
            }
         }
         if (foundRoom !== null) break;
      }

      if (foundRoom !== null) {
         rooms[foundRoom].recipients.push({ socketId: socket.id, userId });
         rooms[foundRoom] = {
            ...rooms[foundRoom],
            userId,
         };
      } else {
         const newRoom = {
            id: uuidv4(),
            recipients: [{ socketId: socket.id, userId: userId }],
            userId,
         };
         for (const member of contact.members) {
            newRoom.recipients.push({ socketId: "", userId: member });
         }
         rooms.push(newRoom);
      }

      console.log(rooms);
   });
}

function onDisconnect() {
   rooms = rooms.map((room) => {
      return {
         ...room,
         recipients: room.recipients.filter(
            (item) => item.socketId != socket.id
         ),
      };
   });
}
