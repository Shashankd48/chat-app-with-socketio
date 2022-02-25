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
