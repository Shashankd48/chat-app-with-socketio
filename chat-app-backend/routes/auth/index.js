const { login, signup } = require("../../controller/auth");

const router = require("express").Router();

router.post("/login", login);

router.post("/signup", signup);

module.exports = router;
