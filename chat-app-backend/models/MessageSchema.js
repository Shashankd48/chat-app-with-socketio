const mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
   },
   { timestamps: true, collection: "User" }
);

module.exports = mongoose.model("User", MessageSchema);
