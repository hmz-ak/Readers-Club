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
  var chapter = await Chapter.find();
  var user = req.user;
  res.render("chapters/index", { chapter, user });
});

router.get("/new/:id", auth, (req, res) => {
  var novel_id = req.params.id;
  novel = {
    _id: novel_id,
  };
  console.log(novel_id);
  user = req.user;
  res.render("chapters/new", { novel, user });
});

//get a single chapter
router.get("/:id", auth, async (req, res) => {
  var chapter = await Chapter.findById(req.params.id);
  var user = req.user;
  res.render("chapters/index", { chapter, user });
});

//create a new chapter
router.post("/", auth, upload.single("image"), async (req, res) => {
  console.log(req.body.novel_id);
  var chapter = new Chapter();

  chapter.user_id = req.user._id;
  chapter.novel_id = req.body.novel_id;
  chapter.title = req.body.title;
  chapter.content = req.body.content;
  chapter.image = req.file.filename;

  try {
    await chapter.save();
    res.redirect("/");
  } catch (error) {}
});

module.exports = router;
