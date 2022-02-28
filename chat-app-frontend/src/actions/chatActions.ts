import io from "socket.io-client";
import config from "../config";
import SocketEvents from "src/config/SocketEvents";
import Axios from "src/config/Axios";
import { Socket } from "socket.io-client";

var socket = io(config.server);

// Get Contacts list from user's address book
export function getContacts() {}

// Get Contacts list from user's address book
export function getThreads(socket: Socket) {
   if (socket.connected) {
      console.log("log: getThreads");
      socket.on(SocketEvents.message, (data) => {
         return data;
      });
   }
}

export function addMessage(socket: Socket, message: any) {
   socket.emit(SocketEvents.message, { message });
}
