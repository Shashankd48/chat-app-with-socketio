import MessageSections from "./MessageSections";
import UsersTab from "./UsersTab";

const Chat = () => {
   return (
      <div className="grid grid-cols-3 h-screen  rounded-sm max-w-6xl mx-auto bg-white">
         <UsersTab />

         <MessageSections />
      </div>
   );
};

export default Chat;
