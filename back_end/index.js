const express = require("express");
const mongoose = require("mongoose");
const app = express();
const allRoutes = require("./routes/allRoutes");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.listen(5000);

console.log("abc");
mongoose
  .connect("mongodb://localhost:27017/library_management")
  .then(() => console.log("Connected with mongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/", allRoutes);
