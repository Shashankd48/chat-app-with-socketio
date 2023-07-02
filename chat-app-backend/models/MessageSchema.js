const mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema(
   {
      content: {
         type: String,
         required: true,
      },
      contentType: string, // text/media,
      mimeType: string, // jpg, png, ,
      conversation: {
         type: ObjectId,
         ref: "Contact",
         required: true,
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
