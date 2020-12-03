var mongoose = require("mongoose");

var genreSchema = mongoose.Schema({
  name: String,
  image: {
    type: String,
    default: "placeholder.jpg",
  },
  cloudinary_id: String,
});

var Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
