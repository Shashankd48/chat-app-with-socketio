const UserService = require("../../services/UserService");
const {
   SuccessResponse,
   InternalServerError,
   BadRequestError,
   DuplicateError,
   NotFoundError,
} = require("../../constants/ResponseConstant");

exports.getUserById = async (req, res) => {
   try {
      const { userId } = req.params;

      const user = await UserService.findUserById(userId);

      return user
         ? res.status(200).json({ ...SuccessResponse, user })
         : res.status(404).json({
              ...NotFoundError,
              message: "User not found!",
           });
   } catch (error) {
      return res.status(500).json(InternalServerError);
   }
};

exports.getUsers = async (req, res) => {
   try {
      const users = await UserService.findUsers();

      return users.length > 0
         ? res.status(200).json({ ...SuccessResponse, users })
         : res.status(404).json({
              ...NotFoundError,
              message: "No record found!",
           });
   } catch (error) {
      return res.status(500).json(InternalServerError);
   }
};

exports.createUser = async (req, res) => {
   try {
      const { username, name } = req.body;

      const foundUser = await UserService.findUserByUsername(
         username.toLowerCase()
      );

      if (foundUser)
         return res.status(200).json({
            ...DuplicateError,
            message: "User already exist with this username!",
            user: foundUser,
         });

      const users = await UserService.createUser(username, name);

      return users
         ? res.status(200).json({ ...SuccessResponse, users })
         : res.status(404).json({
              ...BadRequestError,
              message: "Failed to create account!",
           });
   } catch (error) {
      return res.status(500).json(InternalServerError);
   }
};
