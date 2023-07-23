const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  authorName: { type: String, required: true },
  authorSurname: { type: String, required: true },
  theme: { type: [String] },
  releasedate: { type: Date, default: new Date().getFullYear() },
  coverimagelink: { type: [String] },
  contentlink: { type: String, required: true },
});
//schema.plugin(mongoosePaginate);
const ArticleModle = mongoose.model("Article", schema);

module.exports = ArticleModle;
