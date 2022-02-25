import config from "../config";

let IPAddress = config.serverAPI + "auth/";

const UserServices = {
   login: IPAddress + "login",
};

export default UserServices;
