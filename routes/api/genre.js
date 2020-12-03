const express = require("express");
const router = express.Router();
const Genre = require("../../models/genre");
const Novel = require("../../models/novels");
const multer = require("multer");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const upload = require("../../multer");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

router.get("/", auth, async (req, res) => {
  console.log(req.user);
  var genre = await Genre.find();
  var user = req.user;

  res.render("genre/index", { genre, user });
});

router.get("/new", auth, admin, (req, res) => {
  var user = req.user;
  res.render("genre/new", { user });
});

router.get("/:name", auth, async (req, res) => {
  console.log(req.params.name);
  var novel = await Novel.find({ genre: req.params.name });
  console.log(novel);
  var user = req.user;
  res.render("genre/genre_stories", { novel, user });
});

router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  var genre = new Genre();
  genre.name = req.body.name;

  genre.image = result.secure_url;
  genre.cloudinary_id = result.public_id;
  await genre.save();

  res.redirect("/api/novels");
});

router.delete("/delete/:id", auth, admin, async (req, res) => {
  var gen = await Genre.findById(req.params.id);
  await cloudinary.uploader.destroy(gen.cloudinary_id);

  await gen.remove();
  res.redirect("/api/novels");
});

router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  var genre = await Genre.findById(req.params.id);
  genre.name = req.body.name;
  if (req.file) {
    await cloudinary.uploader.destroy(genre.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    genre.image = result.secure_url;
    genre.cloudinary_id = result.public_id;
  }
  await genre.save();
  res.redirect("/api/novels");
});

module.exports = router;
