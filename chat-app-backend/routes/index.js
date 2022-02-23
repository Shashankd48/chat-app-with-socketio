const router = require("express").Router();

router.get("/api", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

router.get("/", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

router.get("/template", (req, res) => {
   try {
      return res.sendFile(__dirname + "/templates/index.html");
   } catch (error) {
      console.log(error);
      throw error;
   }
});

module.exports = router;
