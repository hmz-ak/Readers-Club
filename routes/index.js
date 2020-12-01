var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/api/novels/");
});

router.get("/a", function (req, res, next) {
  res.redirect("/api/chapters/new");
});

module.exports = router;
