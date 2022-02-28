import "./App.css";
import Home from "./views/Home";
import Accounts from "./views/Accounts";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layouts from "./Layouts";
import SocketContext, { socket } from "./context/SocketContext";

function App() {
   return (
      <div className="App">
         <SocketContext.Provider value={socket}>
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
         </SocketContext.Provider>
      </div>
   );
}

export default App;
