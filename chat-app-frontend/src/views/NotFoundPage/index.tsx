import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
   return (
      <div className="flex justify-center h-[100dvh] items-center flex-col">
         <p className="text-2xl font-semibold">404 Not found</p>
         <NavLink to="/" className="text-blue-500 underline">
            Go to home
         </NavLink>
      </div>
   );
};

export default NotFoundPage;
