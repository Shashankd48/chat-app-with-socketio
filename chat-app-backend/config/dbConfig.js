const mongoose = require("mongoose");
const config = require("./index");

mongoose
   .connect(config.dburl)
   .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
   .catch((error) => {
      console.error("FAILED TO CONNECT DB");
      throw error;
   });
