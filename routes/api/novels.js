const express = require("express");
const router = express.Router();
const Novel = require("../../models/novels");
const Genre = require("../../models/genre");
const multer = require("multer");
const auth = require("../../middleware/auth");
const localStorage = require("node-localstorage").LocalStorage;
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
router.get("/", async (req, res) => {
  var novels = await Novel.find().limit(10).sort({ date: "desc" });
  var completed = await Novel.find().limit(10);
  res.render("novel/index", { novels, completed });
});
router.get("/new", async (req, res) => {
  var genre = await Genre.find();
  res.render("novel/new", { genre });
});

//get a single novel
router.get("/:id", async (req, res) => {
  var novel = await Novel.findById(req.body.id);
  res.render("novel/show_single", { novel });
});

//create a new novel
router.post("/", upload.single("image"), async (req, res) => {
  var novel = new Novel();
  console.log(req.file);

  novel.name = req.body.name;
  novel.genre = req.body.genre;
  novel.theme = req.body.theme;
  novel.image = req.file.filename;
  try {
    await novel.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
