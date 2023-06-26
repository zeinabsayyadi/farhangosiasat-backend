const multer = require("multer");

//set up file storage engine
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../uploadedFiles"); //it get error as first parameter and a destiniation string as second parameter
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

module.exports = multer({
  storage: fileStorageEngine,
});
