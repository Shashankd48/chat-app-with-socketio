import {
   useContext,
   useEffect,
   useState,
   EffectCallback,
   createContext,
   ReactNode,
} from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "src/reducers";
import config from "../config";

type LayoutsProps = {
   children: ReactNode;
};

const SocketContext = createContext(null);

export function useSocket() {
   return useContext(SocketContext);
}

export default function SocketProvider({ children }: LayoutsProps) {
   const [socket, setSocket] = useState<any>();
   const user = useSelector((state: RootState) => state.user);

   useEffect((): ReturnType<EffectCallback> => {
      if (user) {
         const newSocket = io(config.server);
         setSocket(newSocket);
         return (): any => newSocket.close();
      }
   }, [user]);

   return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
   );
}
