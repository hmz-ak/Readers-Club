const express = require("express");
const router = express.Router();
const Genre = require("../../models/genre");

router.get("/", async (req, res) => {
  var genre = await Genre.find();
  res.send(genre);
});

router.get("/new", (req, res) => {
  res.render("genre/new");
});

router.get("/:id", async (req, res) => {
  var genre = await Genre.findById(req.params.id);
  res.render({ genre });
});

router.post("/", async (req, res) => {
  var genre = new Genre();
  genre.name = req.body.name;
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
