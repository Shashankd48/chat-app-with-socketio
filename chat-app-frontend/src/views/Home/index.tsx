import axios from "axios";
import { useEffect } from "react";
import config from "src/config";
import Chat from "src/components/Chat";

const Home = () => {
   useEffect(() => {
      console.log("log: ", config.server);

      const checkbackend = async () => {
         const response = await axios.get(`${config.server}/api`);
         console.log(response);
      };
      checkbackend();
   }, []);
   return (
      <div className="h-screen bg-gray-200">
         <Chat />
      </div>
   );
};

export default Home;
