import config from "../config";

let IPAddress = config.serverAPI + "auth/";

const UserServices = {
   login: IPAddress + "login",
   sigup: IPAddress + "signup",
};

export default UserServices;
