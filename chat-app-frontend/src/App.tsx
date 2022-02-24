import "./App.css";
import Home from "./views/Home";
import Auth from "./views/Auth";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import config from "./config";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

// no dotenv
const socket = io(config.server);
const userName = nanoid(4);

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Auth />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
