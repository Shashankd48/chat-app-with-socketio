import Chat from "src/components/Chat";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";

import { Navigate } from "react-router-dom";

const Home = () => {
   const user = useSelector((state: RootState) => state.user);

   if (!user) return <Navigate to="/accounts/login" />;

   return (
      <div className="h-screen bg-gray-200">
         <Chat />
      </div>
   );
};

export default Home;
