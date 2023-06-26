const multer = require("multer");
const path = require("path");

//set up file storage engine
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "articleContent") {
      cb(null, "../../../uploadedFiles/article/contents");
    } else if (file.fieldname === "articleCoverImage") {
      cb(null, "../../../uploadedFiles/article/coverImage");
    } else {
      const error = { message: "file filedname is not valid" };
      cb(error, null); //it get error as first parameter and a destiniation string as second parameter
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "articleContent") {
      cb(null, file.filename + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "articleCoverImage") {
      cb(null, file.filename + Date.now() + path.extname(file.originalname));
    } else {
      const error = { message: "file filedname is not valid" };
      cb(error, null); //it get error as first parameter and a destiniation string as second parameter
    }
  },
});

module.exports = multer({
  storage: fileStorageEngine,
}).fields([
  {
    name: "articleContent",
    maxCount: 1,
  },
  {
    name: "articleCoverImage",
    maxCount: 1,
  },
]);

//to do : if it was needed to limit the allowed types, add a function to check types
