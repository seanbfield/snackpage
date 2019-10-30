let express = require("express")
let router = express.Router();

router.get("/api", function (req, res, next) {
  res.send("API is working properly");
});

module.exports = router;
