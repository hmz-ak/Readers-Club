const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Novel = require("../../models/novels");
const Library = require("../../models/library");

router.get("/", auth, async (req, res) => {
  var library = await Library.find({ user_id: res.user._id });
  var novel = await Novel.find({ _id: library.novel_id });
  var user = req.user;
  res.render("library/index", { library, novel, user });
});

router.get("/add", auth, async (req, res) => {
  var library = new Library();
  library.novel_id = req.query.novel_id;
  console.log(req.query.novel_id);
  library.user_id = req.user._id;
  await library.save();
  res.redirect("/");
});

module.exports = router;
