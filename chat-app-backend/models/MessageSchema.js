const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var MessageSchema = new mongoose.Schema(
   {
      content: {
         type: String,
         required: true,
      },
      contentType: String, // text/media,
      mimeType: String, // jpg, png, ,
      conversation: {
         type: ObjectId,
         ref: "Contact",
         required: false,
      },
      user: {
         type: ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true, collection: "Messages" }
);

module.exports = mongoose.model("Messages", MessageSchema);
