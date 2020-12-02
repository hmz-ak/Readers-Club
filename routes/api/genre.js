const express = require("express");
const router = express.Router();
const Genre = require("../../models/genre");
const Novel = require("../../models/novels");
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
  var genre = await Genre.find();
  var user = req.user;

  res.render("genre/index", { genre, user });
});

router.get("/new", (req, res) => {
  res.render("genre/new");
});

router.get("/:name", async (req, res) => {
  console.log(req.params.name);
  var novel = await Novel.find({ genre: req.params.name });
  console.log(novel);
  res.render("genre/genre_stories", { novel });
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  var genre = new Genre();
  genre.name = req.body.name;

  genre.image = req.file.filename;

  await genre.save();

  res.redirect("/api/novels");
});

router.delete("/delete", async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id);
  res.render();
});

router.put("/:id", async (req, res) => {
  var genre = await Genre.findById(req.params.id);
  genre.name = req.body.name;
  await genre.save();
  res.render();
});

module.exports = router;
