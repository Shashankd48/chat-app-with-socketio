import Axios from "src/config/Axios";
import AccountServices from "src/services/AccountServices";

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
