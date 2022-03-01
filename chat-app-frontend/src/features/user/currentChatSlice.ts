import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user.interface";

const currentChat = createSlice({
   name: "currentChat",
   initialState: null as UserInterface | null,
   reducers: {
      setCurrentChat(state, { payload }: PayloadAction<UserInterface | null>) {
         return (state = payload != null ? payload : null);
      },
      removeCurrentChat(state) {
         return (state = null);
      },
   },
});

export const { setCurrentChat } = currentChat.actions;
export default currentChat.reducer;
