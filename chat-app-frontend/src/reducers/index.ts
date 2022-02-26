import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import currentChatReducer from "src/features/user/currentChatSlice";

const rootReducer = combineReducers({
   user: userReducer,
   currentChat: currentChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
