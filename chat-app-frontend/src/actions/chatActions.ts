import io from "socket.io-client";
import config from "../config";
import SocketEvents from "src/config/SocketEvents";
import Axios from "src/config/Axios";
import { Socket } from "socket.io-client";

// var socket = io(config.server);

// Get Contacts list from user's address book
export function getContacts() {}

// Get Contacts list from user's address book
export function getThreads(
   socket: Socket | null,
   setMessages: any,
   messages: any
) {
   if (socket?.connected) {
      socket.on(SocketEvents.message, (data) => {
         console.log("log: New Message", data);
         setMessages([...messages, data.message]);
         return data;
      });
   }
}

export function addMessage(socket: Socket | null, message: any) {
   if (socket) socket.emit(SocketEvents.message, { message });
}
