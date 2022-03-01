import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { addMessage, getThreads } from "src/actions/chatActions";
import { useSocket } from "src/context/SocketProvider";
import { RootState } from "src/reducers";
import { useAppDispatch } from "src/store";
import { MessageInterface } from "src/interfaces/message.interface";
import SocketEvents from "src/config/SocketEvents";

const sampleMessage: MessageInterface[] = [
   { value: "Hello Sample", senderId: "jnjnda" },
   { value: "Hello Sample2", senderId: "knjnda" },
];

const MessageSections = () => {
   const { currentChat, user } = useSelector((state: RootState) => state);
   const initialMessage = {
      value: "",
      senderId: user?.id || "",
   };
   const [message, setMessage] = useState<MessageInterface>(initialMessage);
   const [messages, setMessages] = useState<MessageInterface[] | []>(
      sampleMessage
   );
   const socket = useSocket();

   const dispatch = useAppDispatch();

   useEffect(() => {
      console.log("log: messages", messages);
   }, [messages]);

   const newAddMessage = async (newMessage: MessageInterface) => {
      const tempMessages = [...messages];
      console.log("log: List", messages);
      tempMessages.push(newMessage);
      console.log("log: tempMessages", tempMessages);
      await setMessages(tempMessages);
   };

   useEffect(() => {
      if (socket?.connected) {
         console.log("log: Now connected");
         socket.on(SocketEvents.receiveMessage, (data) => {
            console.log("log: New Message", data);
            newAddMessage(data.message);
         });
      } else {
         console.log("log: Not connected yet!");
      }
      // if (socket?.connected) getThreads(socket, setMessages, messages);
   }, [socket?.connected]);

   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (user && currentChat) {
         const payload = {
            currentChat,
            message,
         };

         addMessage(socket, payload);
         const temp = [...messages, message];
         setMessages(temp);
         setMessage(initialMessage);
      }
   };

   const ChatHeader = () => {
      return (
         <div className="sticky top-0 bg-blue-600 px-3 py-2 items-center flex min-h-[8vh]">
            {currentChat && (
               <div className="flex items-center">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                     <p className=" font-medium text-xl">
                        {currentChat?.username[0].toUpperCase()}
                     </p>
                  </div>
                  <div className="ml-5">
                     <h2 className="text-white font-medium text-lg m-0 ">
                        {currentChat?.username}
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

   return (
      <div className="col-span-3 h-full overflow-y-auto">
         <ChatHeader />
         <div className="flex flex-col h-[92%]">
            <div className=" flex-grow flex-1 p-2 overflow-y-auto">
               {currentChat ? (
                  <Fragment>
                     {messages.map((message, index) => (
                        <p key={index}>{message.value}</p>
                     ))}
                  </Fragment>
               ) : (
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
               )}
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
                     className=" bg-blue-500 px-10 py-1 text-white rounded-full ml-2"
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
