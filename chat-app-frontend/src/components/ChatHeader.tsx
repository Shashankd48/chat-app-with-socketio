import { useSelector } from "react-redux";
import { RootState } from "src/libs/reducers";

export default function ChatHeader() {
   const chat = useSelector((state: RootState) => state.chat);

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
}
