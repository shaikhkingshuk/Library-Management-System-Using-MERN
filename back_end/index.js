const express = require("express");
const mongoose = require("mongoose");
const app = express();
const allRoutes = require("./routes/allRoutes");
const cors = require("cors");
const session = require("express-session");

app.use(express.json());

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, /// must add or else frontend part can't get the session-cookie access
  })
);

app.listen(5000);

console.log("abc");
mongoose
  .connect("mongodb://localhost:27017/library_management")
  .then(() => console.log("Connected with mongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/", allRoutes);
