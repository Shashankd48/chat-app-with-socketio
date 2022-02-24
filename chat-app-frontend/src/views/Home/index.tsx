import axios from "axios";
import { useEffect } from "react";
import config from "src/config";
import Chat from "src/components/Chat";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { useAppDispatch } from "src/store";
import { setUser } from "src/features/user/userSlice";

const Home = () => {
   const user = useSelector((state: RootState) => state.user);
   const dispatch = useAppDispatch();

   useEffect(() => {}, []);

   useEffect(() => {
      console.log("log: user", user);
   }, [user]);

   return (
      <div className="h-screen bg-gray-200">
         <Chat />
      </div>
   );
};

export default Home;
