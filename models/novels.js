const mongoose = require("mongoose");

var novelSchema = mongoose.Schema({
  name: String,
  genre: String,
  theme: String,
  date: { type: Date, default: Date.now },
  image: {
    type: String,
    default: "placeholder.jpg",
  },
});

var novelModel = mongoose.model("Novel", novelSchema);

module.exports = novelModel;
