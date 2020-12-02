const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Novel = require("../../models/novels");
const Library = require("../../models/library");

router.get("/", auth, async (req, res) => {
  var library = await Library.find({ user_id: req.user._id });
  var novel = [];
  for (var i = 0; i < library.length; i++) {
    novel[i] = await Novel.findById(library[i].novel_id.toString());
  }
  console.log(novel);

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

router.get("/delete/:id", auth, async (req, res) => {
  console.log("im here!");
  var lib = await Library.find({ novel_id: req.params.id });
  console.log(lib);
  await Library.findByIdAndDelete(lib[0]._id);
  res.redirect("/");
});

module.exports = router;
