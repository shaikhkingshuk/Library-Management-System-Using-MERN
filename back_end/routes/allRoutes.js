const express = require("express");
const {
  addManager,
  allManager,
  deleteManager,
  updateManager,
  findManager,
  addUser,
  allUser,
  deleteUser,
  updateUser,
  findUser,
  addBook,
  allBook,
  deleteBook,
  updateBook,
  findBook,
} = require("../controllers/allControllers");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("hellow world!...");
});

/// Add Managers

router.post("/addManager", addManager);

router.get("/allManager", allManager);

router.delete("/deleteManager/:id", deleteManager);

router.put("/updateManager/:id", updateManager);

router.get("/searchManager", findManager);

/// Add Users

router.post("/addUser", addUser);

router.get("/allUser", allUser);

router.delete("/deleteUser/:id", deleteUser);

router.put("/updateUser/:id", updateUser);

router.get("/searchUser", findUser);

/// Add Books

router.post("/addBook", addBook);

router.get("/allBook", allBook);

router.delete("/deleteBook/:id", deleteBook);

router.put("/updateBook/:id", updateBook);

router.get("/searchBook", findBook);

module.exports = router;
