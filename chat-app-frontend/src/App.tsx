import ChatPage from "./views/ChatPage";
import AuthPage from "./views/AuthPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./libs/store";
import Layouts from "./Layouts";
import SocketProvider from "./libs/context/SocketProvider";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./views/NotFoundPage";

function App() {
   return (
      <>
         <Provider store={store}>
            <SocketProvider>
               <Layouts>
                  <BrowserRouter>
                     <Routes>
                        <Route path="/" element={<ChatPage />} />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/*" element={<NotFoundPage />} />
                     </Routes>
                  </BrowserRouter>
               </Layouts>
            </SocketProvider>
         </Provider>
         <Toaster position="top-center" reverseOrder={false} />
      </>
   );
}

export default App;
