const router = require("express").Router();
const { createContact, getContactByUserId } = require("../../controller/chat");

router.post("/", createContact);

router.get("/:userId", getContactByUserId);

module.exports = router;
