import { createContext } from "react";
import io from "socket.io-client";
import config from "../config";

export const socket = io(config.server);
const SocketContext = createContext(socket);

export default SocketContext;
