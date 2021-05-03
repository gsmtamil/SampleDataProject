var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  return res.status(200).json({
    message: "Sample Data Server Running In Fork Mode",
    headers: req.headers["user-agent"],
    dateTime: new Date(),
  });
});

module.exports = router;
