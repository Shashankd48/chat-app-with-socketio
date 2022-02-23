const UserSchema = require("../models/UserSchema");

class UserService {
   constructor() {}

   async findUserById(id) {
      return await UserSchema.findById(id);
   }

   async findUserByUsername(username) {
      return await UserSchema.findOne({ username: username });
   }

   async findUsers() {
      return await UserSchema.find();
   }

   async createUser(username, name) {
      const user = new UserSchema({ username, name });
      return await user.save();
   }
}

module.exports = new UserService();
