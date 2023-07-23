const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file here", file);
    if (file.fieldname === "articleContent") {
      cb(null, "uploadedFiles/article/contents/");
    } else if (
      file.fieldname === "articleImageTop" ||
      file.fieldname === "articleImageMiddle" ||
      file.fieldname === "articleImageEnd"
    ) {
      console.log("file", file);
      cb(null, "uploadedFiles/article/image/");
    } else {
      console.log("file out of condition: ", file);
    }
    //cb(null, "uploadedFiles/article/contents/");
  },
  filename: (req, file, cb) => {
    console.log("file name", file);
    if (file.fieldname === "articleContent") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (
      file.fieldname === "articleImageTop" ||
      file.fieldname === "articleImageMiddle" ||
      file.fieldname === "articleImageEnd"
    ) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else {
      console.log("file out of condition: ", file);
    }
    //cb(null, Date.now() + path.extname(file.originalname));
  },
});
module.exports = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 10,
  // },
  // fileFilter: (req, file, cb) => {
  //   checkFileType(file, cb);
  // },
}).fields([
  {
    name: "articleContent",
    maxCount: 1,
  },
  {
    name: "articleImageTop",
    maxCount: 1,
  },
  {
    name: "articleImageMiddle",
    maxCount: 1,
  },
  {
    name: "articleImageEnd",
    maxCount: 1,
  },
]);

function checkFileType(file, cb) {
  if (file.fieldname === "certificate") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "natid" || file.fieldname === "profile") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      fiel.mimetype === "image/gif"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
}

//to do : if it was needed to limit the allowed types, add a function to check types
