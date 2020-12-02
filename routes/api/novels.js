const express = require("express");
const router = express.Router();
const Novel = require("../../models/novels");
const Genre = require("../../models/genre");
const Chapter = require("../../models/chapters");
const Library = require("../../models/library");
const { User } = require("../../models/user");
const multer = require("multer");
const auth = require("../../middleware/auth");
//logic of image uploading using multer is defined in this part of code

//define storage for images

const storage = multer.diskStorage({
  //destination
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/");
  },

  //filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

//routes

//get all the novels
router.get("/", auth, async (req, res) => {
  var novels = await Novel.find().limit(10).sort({ date: "desc" });
  var completed = await Novel.find().limit(10);
  var user = req.user;
  console.log(completed);
  res.render("novel/index", { novels, completed, user });
});
router.get("/new", auth, async (req, res) => {
  var genre = await Genre.find();
  var user = req.user;
  res.render("novel/new", { genre, user });
});
//Show all the stories specific to person
router.get("/mystories", auth, async (req, res) => {
  var novel = await Novel.find({ user_id: req.user._id }).sort({
    date: "desc",
  });
  console.log(novel);
  if (novel.length == 0) {
    novel = null;
  }
  var user = req.user;
  res.render("novel/mystories", { novel, user });
});

//get a single novel
router.get("/:id", auth, async (req, res) => {
  var novel = await Novel.findById(req.params.id);
  var user_info = await User.findById(novel.user_id);
  var library = await Library.find({
    user_id: req.user._id,
    novel_id: req.params.id,
  });
  console.log(library);
  var chapters = await Chapter.find({ novel_id: req.params.id });
  var user = req.user;
  res.render("novel/show_single", {
    novel,
    user,
    user_info,
    chapters,
    library,
  });
});

//create a new novel
router.post("/", auth, upload.single("image"), async (req, res) => {
  var novel = new Novel();
  novel.user_id = req.user._id;
  novel.name = req.body.name;
  novel.genre = req.body.genre;
  novel.theme = req.body.theme;
  novel.image = req.file.filename;
  user = req.user;
  try {
    await novel.save();
    console.log("here");
    res.render("chapters/new", { novel, user });
  } catch (error) {
    console.log("errorrr");
    console.log(error);
  }
});

//delete

router.get("/delete/:id", async (req, res) => {
  console.log("here i am");
  await Novel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//update the story
router.get("/edit/:id", async (req, res) => {
  var novel = await Novel.findById(req.params.id);
  var genre = await Genre.find();

  res.render("novel/edit", { novel, genre });
});

//update the story
router.post("/edit/:id", upload.single("image"), async (req, res) => {
  var novel = await Novel.findById(req.params.id);
  novel.name = req.body.name;
  novel.genre = req.body.genre;
  novel.theme = req.body.theme;
  if (req.file) {
    novel.image = req.file.filename;
  }
  await novel.save();
  res.redirect("/");
});

module.exports = router;
