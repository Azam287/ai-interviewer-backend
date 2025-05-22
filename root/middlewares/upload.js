const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      const err = new Error("Only PDFs are allowed.");
      err.status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

module.exports = {upload};
