import Axios from "src/libs/config/Axios";
import AccountServices from "src/libs/services/AccountServices";

export function login(username: string) {
   let request = Axios.post(AccountServices.login, { username });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}

export function signup(username: string, name: string) {
   let request = Axios.post(AccountServices.sigup, { username, name });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}
