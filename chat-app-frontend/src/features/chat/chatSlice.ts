import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

import config from "../../config";
import SocketEvents from "../../config/SocketEvents";

// no dotenv

const chat = createSlice({
   name: "user",
   initialState: null,
   reducers: {
      sendMessage(state, { payload }: any) {
         console.log("log: payload", payload);
         //  socket.emit(SocketEvents.message, payload.message);
         return (state = payload != null ? payload : null);
      },
   },
});

export const { sendMessage } = chat.actions;
export default chat.reducer;
