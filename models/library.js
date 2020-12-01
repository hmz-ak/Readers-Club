var mongoose = require("mongoose");

var librarySchema = mongoose.Schema({
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
  date: { type: Date, default: Date.now },
});

var Library = mongoose.model("Library", librarySchema);

module.exports = Library;
