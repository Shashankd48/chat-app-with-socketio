import React, { useEffect } from "react";
import { useAppDispatch } from "src/store";
import { setUser } from "src/features/user/userSlice";

const Layouts = ({ children }: { children: React.ReactNode }) => {
   const dispatch = useAppDispatch();

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
