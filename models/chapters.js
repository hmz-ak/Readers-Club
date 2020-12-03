var mongoose = require("mongoose");

var chapterSchema = mongoose.Schema({
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  novel_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
    },
  ],
  image: {
    type: String,
    default: "placeholder.jpg",
  },
  title: String,
  content: String,
  cloudinary_id: String,
});

var chapterModel = mongoose.model("Chapter", chapterSchema);

module.exports = chapterModel;
