import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { sendMessage, getThreads } from "src/actions/chatActions";
import { useSocket } from "src/context/SocketProvider";
import { RootState } from "src/reducers";
import { useAppDispatch } from "src/store";
import { MessageInterface } from "src/interfaces/message.interface";
import SocketEvents from "src/config/SocketEvents";
import { addMessage } from "src/features/chat/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import { v4 as uuidv4 } from "uuid";
import { EContentType, EMimeType } from "src/enums";

const getEmptyMessage = (senderId: any, receiverId: string | any) => {
   return {
      id: uuidv4(),
      content: "",
      contentType: "",
      mimeType: "",
      conversation: "",
      receiverId,
      user: senderId,
   };
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

const MessageSections = () => {
   const { user, chat } = useSelector((state: RootState) => state);
   let currentThread = chat.thread?.id;

   const [message, setMessage] = useState<MessageInterface>(
      getEmptyMessage(user?.id, chat.thread?.id)
   );
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
            console.log("log: New Message", data.receiverId);
            console.log("log: chat", chat);
            console.log("log: currentThread", currentThread);

            // if (data.receiverId == currentThread) {
            dispatch(addMessage(data));
            scrollMessagesToBottom();
            // }
         });
      } else {
         console.log("log: Not connected yet!");
      }
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (message.content === "") return;

      if (user && chat.thread) {
         const newMessage = {
            ...message,
            receiverId: chat.thread?.id,
            user: user.id,
         };
         console.log("log: newMessage", newMessage);
         await dispatch(addMessage(newMessage));
         sendMessage(socket, newMessage);
         setMessage(getEmptyMessage(user.id, ""));
         scrollMessagesToBottom();
      }
   };

   return (
      <div className="col-span-3 h-full">
         <ChatHeader />
         <div className="flex flex-col h-[92vh]">
            <div className="flex-grow flex-1 p-2 overflow-y-auto">
               {chat.thread ? (
                  <MessageContainer endOfMessageRef={endOfMessageRef} />
               ) : (
                  <EmptyThread />
               )}
            </div>

            <div className="h-[50px] sticky bottom-0 bg-white">
               <form action="" className="flex" onSubmit={handleSubmit}>
                  <input
                     className="border border-gray-400 py-2 px-3 w-full rounded-full"
                     value={message.content}
                     onChange={(e) =>
                        setMessage({
                           ...message,
                           content: e.target.value,
                           contentType: EContentType.TEXT,
                           mimeType: EMimeType.NONE,
                        })
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
