import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../../features/user/userSlice";
import currentChatReducer from "src/features/user/currentChatSlice";
import chatReducer from "src/features/chat/chatSlice";

const rootReducer = combineReducers({
   user: userReducer,
   currentChat: currentChatReducer,
   chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
