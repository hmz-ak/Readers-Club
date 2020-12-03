const express = require("express");
const router = express.Router();
const Chapter = require("../../models/chapters");
const multer = require("multer");
const auth = require("../../middleware/auth");
const { find } = require("../../models/chapters");
const upload = require("../../multer");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

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
  const result = await cloudinary.uploader.upload(req.file.path);

  var chapter = new Chapter();

  chapter.user_id = req.user._id;
  chapter.novel_id = req.body.novel_id;
  chapter.title = req.body.title;
  chapter.content = req.body.content;
  chapter.image = result.secure_url;
  chapter.cloudinary_id = result.public_id;

  try {
    await chapter.save();
    res.redirect("/");
  } catch (error) {}
});

//delete
router.get("/delete/:id", auth, async (req, res) => {
  var chap = await Chapter.findById(req.params.id);
  await cloudinary.uploader.destroy(chap.cloudinary_id);

  await chap.remove();
  res.redirect("/");
});

router.get("/edit/:id", auth, async (req, res) => {
  var chapter = await Chapter.findById(req.params.id);
  user = req.user;
  res.render("chapters/edit", { chapter, user });
});
//update chapter
router.post("/update/:id", auth, upload.single("image"), async (req, res) => {
  console.log("here i am");
  var chapter = await Chapter.findById(req.params.id);

  chapter.title = req.body.title;
  chapter.content = req.body.content;
  if (req.file) {
    await cloudinary.uploader.destroy(chapter.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    chapter.image = result.secure_url;
    chapter.cloudinary_id = result.public_id;
  }

  try {
    await chapter.save();
    res.redirect("/");
  } catch (error) {}
});

module.exports = router;
