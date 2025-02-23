import Axios from "src/libs/config/Axios";
import UserServices from "src/libs/services/UserServices";

export function getUsers() {
   let request = Axios.get(UserServices.user);
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}

export function getUserById(id: string) {
   let request = Axios.get(`${UserServices.user}/${id}`);
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}

export function createUser(username: string, name: string) {
   let request = Axios.post(UserServices.user, {
      username,
      name,
   });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}
