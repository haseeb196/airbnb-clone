const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const userModel = model("User", UserSchema);

module.exports = userModel;
