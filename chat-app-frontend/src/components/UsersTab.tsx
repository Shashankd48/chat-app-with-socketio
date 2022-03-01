import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "src/actions/usersActions";
import { setCurrentChat } from "src/features/user/currentChatSlice";
import { UserInterface } from "src/interfaces/user.interface";
import { RootState } from "src/reducers";
import { useAppDispatch } from "src/store";

const UsersTab = () => {
   const [usersList, setUsersList] = useState<[UserInterface] | []>([]);
   const user = useSelector((state: RootState) => state.user);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const _getUsers = async () => {
         getUsers().then((data) => {
            if (!data || data?.error) return;

            const tempUsers = data.users
               .filter((item: any) => item._id != user?.id)
               .map((item: any) => {
                  if (item._id != user?.id)
                     return {
                        id: item._id,
                        name: item.name,
                        username: item.username,
                     };
               });

            setUsersList(tempUsers);
         });
      };

      if (user) _getUsers();
   }, [user]);

   const UserInfo = () => {
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

   return (
      <div className="border-r border-gray-300 h-full overflow-y-auto px-3  min-w-[200px] bg-white">
         <UserInfo />

         {usersList.length > 0 ? (
            <ul className="py-2 pb-4">
               {usersList.map((user) => (
                  <li
                     key={user.id}
                     className="text-lg py-2 flex items-center hover:bg-slate-300 px-1
                      rounded-md cursor-pointer"
                     onClick={() => {
                        dispatch(setCurrentChat(user));
                     }}
                  >
                     <div className="bg-gray-300 rounded-full h-11 w-11 flex justify-center items-center border border-gray-300">
                        <h2 className=" font-medium">
                           {user.username[0].toUpperCase()}
                        </h2>
                     </div>
                     <div className="pl-3">
                        <h3 className="text-md font-medium truncate max-w-[200px]">
                           {user.name}
                        </h3>
                        <h3 className="text-sm font-mono text-gray-500">
                           {user.username}
                        </h3>
                     </div>
                  </li>
               ))}
            </ul>
         ) : (
            <div className="flex justify-center items-center h-[400px]">
               <h2 className="font-medium text-lg">No Users found!</h2>
            </div>
         )}
      </div>
   );
};

export default UsersTab;
