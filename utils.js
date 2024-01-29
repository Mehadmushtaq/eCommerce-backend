const multer = require("multer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtToken = (body) => {
  try {
    return jwt.sign(body, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return error;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/Profile"); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file as needed
  },
});

const upload = multer({ storage }).single("profile");

module.exports = { jwtToken, upload };
