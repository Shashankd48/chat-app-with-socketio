const { login } = require("../../controller/auth");

const router = require("express").Router();

router.post("/login", login);

module.exports = router;
