const MessageSchema = require("../models/MessageSchema");

class MessagesService {
   constructor() {}

   async create(user, payload) {
      const message = new MessageSchema({ user, ...payload });
      return await message.save();
   }

   async findById(_id, limit = 50, sortBy = "_id", order = "desc") {
      return await MessageSchema.find({ _id })
         .limit(limit)
         .sort({ _id: "desc" });
   }
}

module.exports = new MessagesService();
