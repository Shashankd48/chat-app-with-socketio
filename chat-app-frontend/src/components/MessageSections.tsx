import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { sendMessage, getThreads } from "src/actions/chatActions";
import { useSocket } from "src/context/SocketProvider";
import { RootState } from "src/reducers";
import { useAppDispatch } from "src/store";
import { MessageInterface } from "src/interfaces/message.interface";
import SocketEvents from "src/config/SocketEvents";
import { addMessage } from "src/features/chat/chatSlice";

const classes = {
   message: {
      self: "bg-blue-600 text-white",
      other: "bg-gray-200 float-right",
      default: "px-3 py-2 rounded-md my-2 max-w-[75%] inline-block",
   },
};

const MessageSections = () => {
   const { user, chat } = useSelector((state: RootState) => state);
   const initialMessage = {
      value: "",
      senderId: user?.id || "",
   };
   const [message, setMessage] = useState<MessageInterface>(initialMessage);
   const socket = useSocket();
   const dispatch = useAppDispatch();
   const endOfMessageRef = useRef<any>(null);

   useEffect(() => {
      return listenMessage();
   }, [socket?.connected]);

   function scrollMessagesToBottom() {
      if (endOfMessageRef.current) {
         console.log("log: mess", endOfMessageRef);
         endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
         });
      }
   }

   const listenMessage = () => {
      if (socket?.connected) {
         console.log("log: Now connected");
         socket.on(SocketEvents.receiveMessage, (data) => {
            console.log("log: New Message", data);
            dispatch(addMessage(data));
            scrollMessagesToBottom();
         });
      } else {
         console.log("log: Not connected yet!");
      }
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (message.value === "") return;

      if (user && chat.thread) {
         await dispatch(addMessage(message));
         sendMessage(socket, message);
         setMessage(initialMessage);
         scrollMessagesToBottom();
      }
   };

   const ChatHeader = () => {
      return (
         <div className="sticky top-0 bg-blue-600 px-3 py-2 items-center flex min-h-[8vh]">
            {chat.thread && (
               <div className="flex items-center">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                     <p className=" font-medium text-xl">
                        {chat.thread?.username[0].toUpperCase()}
                     </p>
                  </div>
                  <div className="ml-5">
                     <h2 className="text-white font-medium text-lg m-0 ">
                        {chat.thread?.name}
                     </h2>
                     <div className="-mt-1 flex items-center">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-1"></div>

                        <p className="text-gray-200 m-0 p-0 ml-1 text-sm">
                           online
                        </p>
                     </div>
                  </div>
               </div>
            )}
         </div>
      );
   };

   const Messages = () => {
      return (
         <div>
            {chat.messages.map((message, index) => (
               <div
                  className={`w-full h-full flex ${
                     message.senderId === user?.id ? "justify-end" : ""
                  } `}
               >
                  <div
                     key={index}
                     className={`${classes.message.default} ${
                        user?.id !== message.senderId
                           ? classes.message.self
                           : classes.message.other
                     }`}
                  >
                     <p>{message.value}</p>
                  </div>
               </div>
            ))}
            <EndOfMessage />
         </div>
      );
   };

   const EndOfMessage = () => {
      return <div ref={endOfMessageRef} className="mb-5"></div>;
   };

   const EmptyThread = () => {
      return (
         <div className="flex item-center justify-center flex-col h-[100%]">
            <div>
               <img src="/logo192.png" alt="logo" className="m-auto" />
            </div>
            <div className="text-center">
               <h2 className="text-lg font-medium">
                  Welcome to XSocket chat app!
               </h2>
               <p>Please select any user to start chating.😊</p>
            </div>
         </div>
      );
   };

   return (
      <div className="col-span-3 h-full" ref={endOfMessageRef}>
         <ChatHeader />
         <div className="flex flex-col h-[92vh]">
            <div className="flex-grow flex-1 p-2 overflow-y-auto">
               {chat.thread ? <Messages /> : <EmptyThread />}
            </div>

            <div className="h-[50px] sticky bottom-0 bg-white">
               <form action="" className="flex" onSubmit={handleSubmit}>
                  <input
                     className="border border-gray-400 py-2 px-3 w-full rounded-full"
                     value={message.value}
                     onChange={(e) =>
                        setMessage({ ...message, value: e.target.value })
                     }
                  />
                  <button
                     type="submit"
                     className=" bg-blue-600 px-10 py-1 text-white rounded-full ml-2"
                  >
                     Send
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default MessageSections;
