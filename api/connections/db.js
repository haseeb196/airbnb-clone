const mongoose = require("mongoose");
require('dotenv').config()
const db = mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = db;

