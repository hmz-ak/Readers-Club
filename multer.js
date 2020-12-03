const multer = require("multer");

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

module.exports = upload;
