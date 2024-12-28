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
  loginManager,
  logoutManager,
} = require("../controllers/allControllers");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

/// Login/Logout Manager

router.post("/login", loginManager);

router.post("/logout", logoutManager);

/// Add Managers

router.post("/addManager", authMiddleware, addManager);

router.get("/allManager", authMiddleware, allManager);

router.delete("/deleteManager/:id", authMiddleware, deleteManager);

router.put("/updateManager/:id", authMiddleware, updateManager);

router.get("/searchManager", authMiddleware, findManager);

/// Add Users

router.post("/addUser", authMiddleware, addUser);

router.get("/allUser", authMiddleware, allUser);

router.delete("/deleteUser/:id", authMiddleware, deleteUser);

router.put("/updateUser/:id", authMiddleware, updateUser);

router.get("/searchUser", authMiddleware, findUser);

/// Add Books

router.post("/addBook", addBook);

router.get("/allBook", allBook);

router.delete("/deleteBook/:id", deleteBook);

router.put("/updateBook/:id", updateBook);

router.get("/searchBook", findBook);

module.exports = router;
