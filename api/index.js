const express = require("express");
const db = require("./connections/db");
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dg;algjm340jlkgnealknblnbdfknbdfb";

app.get("/test", (req, res) => res.json("Hello World!"));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    userDoc.save();
    res.json({ userDoc });
  } catch (e) {
    res.status(502).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
});

app.listen(3000, () => console.log(`App listening on port 3000`));
