const multer = require("multer");
const path = require("path");
//define storage for images

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (
      extension !== ".jpg" &&
      extension !== ".jpeg" &&
      extension !== ".png" &&
      extension !== ".webp"
    ) {
      cb(new Error("File Not Supported"), false);
      return;
    }
    cb(null, true);
  },
});

// const storage = multer.diskStorage({
//   //destination
//   destination: function (req, file, callback) {
//     callback(null, "./public/uploads/");
//   },

//   //filename
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// //upload parameters for multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 1024 * 1024 * 3,
//   },
// });

// module.exports = upload;
