import axios from "axios";
import { useEffect } from "react";
import config from "../../config";
import io from "socket.io-client";
import { nanoid } from "nanoid";

// no dotenv
const socket = io(config.server);
const userName = nanoid(4);

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
      <div className=" bg-red-300 p-10">
         <h1 className="text-lg">Home Page</h1>
         <p className=" text-lg font-sans font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga omnis
            autem magnam magni facilis mollitia perspiciatis eum quod rem eos.
         </p>
      </div>
   );
};

export default Home;
