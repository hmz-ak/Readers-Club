const express = require("express");
const router = express.Router();
const Chapter = require("../../models/chapters");
const multer = require("multer");
const auth = require("../../middleware/auth");

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

router.get("/", auth, async (req, res) => {
  console.log(req.user);
  var chapter = await Chapter.find();
  var user = req.user;
  res.render("chapters/index", { chapter, user });
});

router.get("/new", auth, (req, res) => {
  var passedVar = req.query.novel_id;
  user = req.user;
  console.log("im heree");
  console.log(passedVar);
  res.render("chapters/new", { passedVar, user });
});

//create a new chapter
router.post("/", auth, upload.single("image"), async (req, res) => {
  var chapter = new Chapter();

  chapter.user_id = req.user._id;
  chaper.novel_id = req.body.novel_id;
  chapter.genre = req.body.genre;
  chapter.theme = req.body.theme;
  chapter.image = req.file.filename;

  try {
    await chapter.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
