import SocketEvents from "src/config/SocketEvents";
import Axios from "src/config/Axios";
import { Socket } from "socket.io-client";

// Get Contacts list from user's address book
export function getContacts() {}

// Get Contacts list from user's address book
export function getThreads(
   socket: Socket | undefined,
   setMessages: any,
   messages: any
) {
   if (socket?.connected) {
      console.log("log: socket Connection", messages);
      socket.on(SocketEvents.receiveMessage, (data) => {
         console.log("log: New Message", data);
         setMessages([...messages, data.message]);
         return data;
      });
   }
}

export function sendMessage(socket: Socket | undefined, message: any) {
   if (socket) socket.emit(SocketEvents.sendMessage, { message });
}
