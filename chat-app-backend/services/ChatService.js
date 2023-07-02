const ContactSchema = require("../models/ContactSchema");

class ChatService {
   constructor() {}

   async createContact(userId, member) {
      const list = [member];
      const contact = new ContactSchema({ userId, members: list });
      return await contact.save();
   }

   async findContactByMemberId(memberId) {}

   async findContactByUserId(userId) {
      return await ContactSchema.findOne({ userId: userId }).populate(
         "members"
      );
   }

   async updateContact(userId, member) {
      let contact = await ContactSchema.findOne({ userId: userId });
      contact.members.push(member);
      return await contact.save();
   }

   async checkDuplicateMember(userId, member) {
      return await ContactSchema.findOne({
         userId: userId,
         members: { $in: [member] },
      });
   }
}

module.exports = new ChatService();
