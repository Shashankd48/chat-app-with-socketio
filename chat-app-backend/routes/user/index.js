const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../../controller/user");

// @route    -  POST /mimansa/api/utils/auth/loginWithToken
// @desc    -   Login with token and generate new token
// @access  -   Private
router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

module.exports = router;
