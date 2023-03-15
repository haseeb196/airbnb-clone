const express = require("express");
const db = require("./connections/db");
const cors = require("cors");

const app = express();

const cookieParser = require("cookie-parser");

const Routes = require('./Routes/Routes')

app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

Routes(app);

app.listen(3000);
