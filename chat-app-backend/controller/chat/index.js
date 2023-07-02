const ChatService = require("../../services/ChatService");
const {
   SuccessResponse,
   InternalServerError,
   BadRequestError,
   DuplicateError,
   NotFoundError,
} = require("../../constants/ResponseConstant");
const UserService = require("../../services/UserService");
const { successRes } = require("../../common/interceptors");

exports.createContact = async (req, res) => {
   try {
      const { member, userId } = req.body;

      const dup = await ChatService.checkDuplicateMember(userId, member);
      if (dup)
         return res.status(400).json({
            ...BadRequestError,
            message: "User already exist in your contact!",
         });

      const foundContact = await ChatService.findContactByUserId(userId);

      let contact = null;

      if (foundContact) {
         contact = await ChatService.updateContact(userId, member);
      } else {
         contact = await ChatService.createContact(userId, member);
      }

      return contact
         ? res.status(200).json({ ...SuccessResponse, contact })
         : res.status(404).json({
              ...NotFoundError,
              message: "Failed to create contact!",
           });
   } catch (error) {
      console.log(error);
      return res.status(500).json(InternalServerError);
   }
};

exports.getContactByUserId = async (req, res) => {
   try {
      const { userId } = req.params;

      const contacts = await ChatService.findContactByUserId(userId);

      return successRes(res, contacts);
   } catch (error) {
      console.log(error);
      return res.status(500).json(InternalServerError);
   }
};
