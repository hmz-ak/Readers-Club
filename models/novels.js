const mongoose = require("mongoose");

var novelSchema = mongoose.Schema({
  name: String,
  genre: String,
  theme: String,
  image: {
    type: String,
    default: "placeholder.jpg",
  },
});

var novelModel = mongoose.model("Novel", novelSchema);

module.exports = novelModel;
