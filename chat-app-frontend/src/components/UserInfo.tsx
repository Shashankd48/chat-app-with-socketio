import { useSelector } from "react-redux";
import { RootState } from "src/reducers";

const UserInfo = () => {
   const user = useSelector((state: RootState) => state.user);

   return (
      <div className=" sticky top-0 bg-white py-5">
         <div className="border-b border-gray-300">
            <div className="bg-gray-300 rounded-full h-20 w-20 flex justify-center items-center border border-gray-300 m-auto">
               <h2 className="font-medium text-4xl">
                  {user?.username[0].toUpperCase()}
               </h2>
            </div>

            <div className=" text-center py-2">
               <h2 className="font-medium text-lg">{user?.name}</h2>
               <p className="text-sm font-mono tracking-wide">
                  {user?.username}
               </p>
            </div>
         </div>
         <div className="pt-3">
            <h1 className="font-medium text-lg">Users & Group</h1>
         </div>
      </div>
   );
};

export default UserInfo;
