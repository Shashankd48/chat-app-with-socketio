import "./App.css";
import Home from "./views/Home";
import Accounts from "./views/Accounts";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import config from "./config";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Layouts from "./Layouts";

// no dotenv
const socket = io(config.server);
const userName = nanoid(4);

function App() {
   return (
      <div className="App">
         <Provider store={store}>
            <Layouts>
               <BrowserRouter>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="accounts/login" element={<Accounts />} />
                  </Routes>
               </BrowserRouter>
            </Layouts>
         </Provider>
      </div>
   );
}

export default App;
