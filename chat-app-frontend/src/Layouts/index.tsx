import React, { useEffect } from "react";
import { useAppDispatch } from "src/store";
import { setUser } from "src/features/user/userSlice";
import { useSocket } from "src/context/SocketProvider";

const Layouts = ({ children }: { children: React.ReactNode }) => {
   const dispatch = useAppDispatch();
   const socket = useSocket();

   useEffect((): any => {
      if (socket) {
         socket.onAny((event, ...args) => {
            console.log("log: EVENT", event, args);
         });
      }
   }, [socket?.connected]);

   useEffect(() => {
      const readLocalUser = () => {
         const userData = localStorage.getItem("@chat-app-user");
         if (userData) {
            const { id, username, name } = JSON.parse(userData);
            dispatch(setUser({ id, username, name }));
         }
      };

      readLocalUser();
   }, []);

   return <>{children}</>;
};

export default Layouts;
