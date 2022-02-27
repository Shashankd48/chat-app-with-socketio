import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";

const MessageSections = () => {
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState(Array(10).fill("Hello"));
   const currentChat = useSelector((state: RootState) => state.currentChat);

   useEffect(() => {
      console.log("log: ", currentChat);
   }, []);

   const handleSubmit = (e: any) => {
      e.preventDefault();
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
                        <p key={index}>{message}</p>
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
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
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
