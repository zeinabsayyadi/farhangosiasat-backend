const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, unique: true },
  email: { type: String },
  role: { type: String, required: true, default: "user" },
  password: { type: String, required: this.role === "admin" },
  active: { type: Boolean, default: false },
  isStudent: { type: Boolean, default: false },
});

schema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    name: this.name,
    role: this.role,
  };

  return jwt.sign(data, config.get("jwtPrivateKey"));
};

const UserModel = mongoose.model("User", schema);

module.exports = UserModel;
