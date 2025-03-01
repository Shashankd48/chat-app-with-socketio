import { useSelector } from "react-redux";
import { RootState } from "../libs/reducers";

const classes = {
   message: {
      self: "bg-blue-600 text-white",
      other: "bg-gray-200 float-right",
      default: "px-3 py-2 rounded-md my-2 max-w-[75%] inline-block",
   },
};

const EndOfMessage = ({ endOfMessageRef }: any) => {
   return <div ref={endOfMessageRef} className="mb-5"></div>;
};

const MessageContainer = ({ endOfMessageRef }: any) => {
   const { chat, user } = useSelector((state: RootState) => state);
   return (
      <div>
         {chat.messages.map((message) => (
            <div
               className={`w-full h-full flex ${
                  message.senderId === user?.id ? "justify-end" : ""
               } `}
               key={message.id}
            >
               <div
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
         <EndOfMessage endOfMessageRef={endOfMessageRef} />
      </div>
   );
};

export default MessageContainer;
