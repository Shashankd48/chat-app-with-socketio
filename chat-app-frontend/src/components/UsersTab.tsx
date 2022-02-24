import { useState, useEffect } from "react";
import { getUsers } from "src/actions/usersActions";
import { User } from "src/interfaces/user.interface";

const UsersTab = () => {
   const [usersList, setUsersList] = useState<[User] | []>([]);

   useEffect(() => {
      const _getUsers = async () => {
         getUsers().then((data) => {
            if (data && data?.error) return;

            setUsersList(data.users);
         });
      };

      _getUsers();
   }, []);

   return (
      <div className="border-r border-gray-300 h-full overflow-y-auto px-3 pt-5 min-w-[200px] bg-white">
         <div className="sticky top-0 bg-white pb-3">
            <h1 className=" font-medium text-lg ">Users & Group</h1>
         </div>
         <div className=" ">
            <ul className="mt-5">
               {usersList.map((user) => (
                  <li
                     key={user.id}
                     className="text-lg py-2 flex items-center hover:bg-slate-300 px-3 rounded-md cursor-pointer"
                  >
                     <div className="bg-gray-300 rounded-full h-10 w-10 flex justify-center items-center border border-gray-300">
                        <h2 className=" font-medium">
                           {user.username[0].toUpperCase()}
                        </h2>
                     </div>
                     <div>
                        <h3 className="ml-5 text-md font-medium">
                           {user.name}
                        </h3>
                        <h3 className="ml-5 text-sm font-mono text-gray-500">
                           {user.username}
                        </h3>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default UsersTab;
