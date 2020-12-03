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
  cloudinary_id: String,

  title: String,
  content: String,
});

var chapterModel = mongoose.model("Chapter", chapterSchema);

module.exports = chapterModel;
