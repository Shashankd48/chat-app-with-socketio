import "./App.css";
import Home from "./views/Home";
import Accounts from "./views/Accounts";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layouts from "./Layouts";
import SocketProvider from "./context/SocketProvider";

function App() {
   return (
      <div className="App">
         <Provider store={store}>
            <SocketProvider>
               <Layouts>
                  <BrowserRouter>
                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="accounts/login" element={<Accounts />} />
                     </Routes>
                  </BrowserRouter>
               </Layouts>
            </SocketProvider>
         </Provider>
      </div>
   );
}

export default App;
