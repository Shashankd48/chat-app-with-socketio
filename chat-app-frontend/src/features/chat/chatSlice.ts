import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "src/interfaces/message.interface";
import { UserInterface } from "src/interfaces/user.interface";
import { ChatInterface, InitialChat } from "../../interfaces/chat.interface";

const chat = createSlice({
   name: "chat",
   initialState: InitialChat as ChatInterface,
   reducers: {
      setCurrentThread(state, { payload }: PayloadAction<UserInterface>) {
         state.thread = payload;
         state.messages = [];
         return state;
      },
      addMessage(state, { payload }: PayloadAction<MessageInterface>) {
         state.messages.push(payload);
         return state;
      },
   },
});

export const { setCurrentThread, addMessage } = chat.actions;
export default chat.reducer;
