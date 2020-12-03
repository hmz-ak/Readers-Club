const express = require("express");
const router = express.Router();
const Genre = require("../../models/genre");
const Novel = require("../../models/novels");
const multer = require("multer");
const auth = require("../../middleware/auth");
const upload = require("../../multer");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

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
  const result = await cloudinary.uploader.upload(req.file.path, "images");

  fs.unlinkSync(path);

  var genre = new Genre();
  genre.name = req.body.name;

  genre.image = result.secure_url;
  genre.cloudinary_id = result.public_id;
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
