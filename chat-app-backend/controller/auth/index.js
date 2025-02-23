const UserService = require("../../services/UserService");
const {
   SuccessResponse,
   InternalServerError,
   BadRequestError,
   DuplicateError,
   NotFoundError,
} = require("../../constants/ResponseConstant");

exports.login = async (req, res) => {
   try {
      const { username } = req.body;
      const user = await UserService.findUserByUsername(username);
      return user
         ? res.status(200).json({ ...SuccessResponse, user })
         : res
              .status(400)
              .json({ ...BadRequestError, message: "User not found!" });
   } catch (error) {
      return res.status(500).json(InternalServerError);
   }
};

exports.signup = async (req, res) => {
   try {
      const { username, name } = req.body;
      const foundUser = await UserService.findUserByUsername(username);

      if (foundUser)
         return res.status(200).json({ ...DuplicateError, username });

      const user = await UserService.createUser(username, name);

      if (!user)
         return user
            .status(400)
            .json({ ...BadRequestError, message: "Failed to create user!" });

      return res.status(200).json({ ...SuccessResponse, user });
   } catch (error) {
      console.log(error);
      return res.status(500).json(InternalServerError);
   }
};
