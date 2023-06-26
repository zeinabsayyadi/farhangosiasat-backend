

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  authorName: { type: String, required: true },
  authorSurname: { type: String, required: true },
  theme: { type: [String] },
  releasedate: { type: Date, default: new Date().getFullYear() },
  coverimagelink: { type: String },
  contentlink: { type: String, required: true },
});

const ArticleModle = mongoose.model("User", schema);

module.exports = ArticleModle;
