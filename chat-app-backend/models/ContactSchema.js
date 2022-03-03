const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var ContactSchema = new mongoose.Schema(
   {
      members: [
         {
            type: ObjectId,
            ref: "User",
            required: false,
         },
      ],
      userId: {
         type: ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true, collection: "Contact" }
);

module.exports = mongoose.model("Contact", ContactSchema);
