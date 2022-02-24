import Axios from "axios";
import config from "./index";

const instance = Axios.create({
   // .. where we make our configurations
   baseURL: config.server,
});

// Where you would set stuff like your 'Authorization' header, etc ...
// if (localStorage.getItem("accessToken")) {
//    let accessToken = JSON.parse(localStorage.getItem("accessToken"));
//    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// }

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.response.use(
   (response) => {
      return Promise.resolve(response);
   },
   (error) => {
      if (error.response && error.response.status === 401) {
         window.location.href = "/logout";
      }
      //   return error;
      return Promise.reject(error);
   }
);

// Also add/ configure interceptors && all the other cool stuff
export default instance;
