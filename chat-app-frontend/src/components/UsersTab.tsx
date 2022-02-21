const users = [
   {
      id: "jasd8nak",
      username: "shashankd48",
   },
   {
      id: "jasd8pak",
      username: "void148",
   },
   {
      id: "jasd9nak",
      username: "pathakd48",
   },
   {
      id: "jasm8nak",
      username: "mark01",
   },
   {
      id: "jask8nak",
      username: "dj007",
   },
   {
      id: "jasd007k",
      username: "vikas4real",
   },
];

const UsersTab = () => {
   return (
      <div className="border-r border-gray-300 h-full overflow-y-auto px-3 pt-5 min-w-[200px] bg-white">
         <div className="sticky top-0 bg-white pb-3">
            <h1 className=" font-medium text-lg ">Users & Group</h1>
         </div>
         <div className=" ">
            <ul className="mt-5">
               {users.map((user) => (
                  <li
                     key={user.id}
                     className="text-lg py-2 flex items-center hover:bg-slate-300 px-3 rounded-md cursor-pointer"
                  >
                     <div className="bg-gray-300 rounded-full h-10 w-10 flex justify-center items-center border border-gray-300">
                        <h2 className=" font-medium">
                           {user.username[0].toUpperCase()}
                        </h2>
                     </div>
                     <p className="ml-5">{user.username}</p>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default UsersTab;
