import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

const currentChat = createSlice({
   name: "user",
   initialState: null as User | null,
   reducers: {
      setCurrentChat(state, { payload }: PayloadAction<User | null>) {
         return (state = payload != null ? payload : null);
      },
      removeCurrentChat(state) {
         return (state = null);
      },
   },
});

export const { setCurrentChat } = currentChat.actions;
export default currentChat.reducer;
