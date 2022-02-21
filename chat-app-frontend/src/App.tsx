import "./App.css";
import Home from "./views/Home";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import config from "./config";

// no dotenv
const socket = io(config.server);
const userName = nanoid(4);

function App() {
   return (
      <div className="App">
         <Home />
      </div>
   );
}

export default App;
