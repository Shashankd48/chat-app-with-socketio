import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user.interface";

const user = createSlice({
   name: "user",
   initialState: null as UserInterface | null,
   reducers: {
      setUser(state, { payload }: PayloadAction<UserInterface | null>) {
         return (state = payload != null ? payload : null);
      },

      userLogin(state, { payload }: PayloadAction<UserInterface | null>) {
         if (payload)
            localStorage.setItem("@chat-app-user", JSON.stringify(payload));
         return (state = payload != null ? payload : null);
      },
      userLogout() {
         return null;
      },
   },
});

export const { setUser, userLogin, userLogout } = user.actions;
export default user.reducer;
