import { useState, useEffect } from "react";
import { InitialUser, User } from "src/interfaces/user.interface";
import { LockClosedIcon } from "@heroicons/react/solid";
import { login } from "src/actions/accountActions";
import { useAppDispatch } from "src/store";
import { setUser, userLogin } from "src/features/user/userSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";

const Accounts = () => {
   const [account, setAccount] = useState<User>(InitialUser);
   const [isLogin, setIsLogin] = useState(true);
   const dispatch = useAppDispatch();
   const user = useSelector((state: RootState) => state.user);

   const handleChange = (event: any) => {
      setAccount({ ...account, [event.target.name]: event.target.value });
   };

   const toggleForm = () => setIsLogin(!isLogin);

   useEffect(() => {
      console.log(user);
   }, [user]);

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
         if (isLogin) {
            const data = await login(account.username);
            if (!data || data?.error) return;

            dispatch(
               userLogin({
                  id: data.user._id,
                  name: data.user.name,
                  username: data.user.username,
               })
            );
         } else {
            //
         }
      } catch (error) {
         console.log(error);
      }
   };

   const FormSection = () => {
      return (
         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
               <div>
                  <label htmlFor="username-key" className="text-sm">
                     Username
                  </label>

                  <input
                     id="username-key"
                     name="username"
                     type="text"
                     required
                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="ex: shashankd48"
                     value={account.username}
                     onChange={handleChange}
                  />
               </div>
               {!isLogin && (
                  <div className="pt-4">
                     <label htmlFor="name-key" className="text-sm">
                        Full Name
                     </label>
                     <input
                        id="name-key"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="ex: Shashank Dubey"
                        value={account?.name}
                        onChange={handleChange}
                     />
                  </div>
               )}
            </div>

            <div className="flex items-center justify-between">
               <div className="text-sm cursor-pointer">
                  <a
                     className="font-medium text-indigo-600 hover:text-indigo-500"
                     onClick={toggleForm}
                  >
                     {isLogin
                        ? "Don't have account? Sign up"
                        : "Already have an account? Login"}
                  </a>
               </div>
            </div>

            <div>
               <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                     <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                     />
                  </span>
                  {isLogin ? "Sign in" : "Sign up"}
               </button>
            </div>
         </form>
      );
   };

   if (user) return <Navigate to="/" />;

   return (
      <div className="bg-gray-200">
         <div className="max-w-2xl mx-auto flex items-center  h-screen">
            <div className="border rounded-md p-5 w-[100%] bg-white min-h-[400px] shadow-md">
               <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8">
                     <div>
                        <img
                           className="mx-auto h-12 w-auto"
                           src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                           alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                           {isLogin
                              ? "Sign in to your account"
                              : "Create new account"}
                        </h2>
                     </div>
                     {FormSection()}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Accounts;
