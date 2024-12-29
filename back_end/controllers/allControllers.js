const manager = require("../model/managerModel");
const user = require("../model/userModel");
const book = require("../model/bookModel");
const bcrypt = require("bcryptjs");
const borrower = require("../model/recordModel");
const session = require("express-session");

const loginManager = async (req, res) => {
  try {
    const { name, password } = req.body;

    const logManager = await manager.findOne({ name });

    if (!logManager) {
      return res.status(400).json({ error: "username_mismatch" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      logManager.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "password_mismatch" });
    }
    req.session.userID = logManager._id;

    res.status(200).json({ message: "Login successful" }); // use this pattern to recognized by react js
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//res.json({ success: true, message: "Login successful" })

const logoutManager = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
};

const addManager = async (req, res) => {
  const { name, password, email, phone, address } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "use correct email format" });
  }

  const nameRegex = /^[a-zA-Z0-9]{5,}$/; // At least 5 characters, no symbols
  if (!nameRegex.test(name)) {
    return res
      .status(400)
      .json({ error: "username should contain more than 4 character" });
  }

  const phoneRegex = /^1\d{9}$/; // Starts with '1' and contains 10 digits
  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ error: "number should starts with '1' and have 10 digits" });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{9,12}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be between 9 and 12 characters long, include at least one digit(1,4,7) and one symbol(@,!,#).",
    });
  }

  const hashPassword = await bcrypt.hash(password, 11);
  const newManager = new manager({
    name,
    password: hashPassword,
    email,
    phone,
    address,
  });
  //console.log(newManager);
  await newManager.save();
  res.send(newManager);
};

const allManager = async (req, res) => {
  try {
    const users = await manager.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const delManager = await manager.findByIdAndDelete(id);
    //console.log(delManager);
    res.status(200).send(delManager);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateManager = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, password, email, phone } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "use correct email format" });
    }

    const nameRegex = /^[a-zA-Z0-9]{5,}$/; // At least 5 characters, no symbols
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ error: "username should contain more than 4 character" });
    }

    const phoneRegex = /^1\d{9}$/; // Starts with '1' and contains 10 digits
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ error: "number should starts with '1' and have 10 digits" });
    }

    const updateManager = await manager.findByIdAndUpdate(id, req.body);
    res.status(200).send(updateManager);
  } catch (err) {
    res.status(400).send(err);
  }
};

const findManager = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const findManager = await manager.find({
      name: { $regex: q, $options: "i" },
    });
    res.status(200).json(findManager);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};

const addUser = async (req, res) => {
  const newUser = new user(req.body);
  const { name, email, phone } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "use correct email format" });
  }

  const nameRegex = /^[a-zA-Z0-9]{5,}$/; // At least 5 characters, no symbols
  if (!nameRegex.test(name)) {
    return res
      .status(400)
      .json({ error: "username should contain more than 4 character" });
  }

  const phoneRegex = /^1\d{9}$/; // Starts with '1' and contains 10 digits
  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ error: "number should starts with '1' and have 10 digits" });
  }

  //console.log(req.body);
  await newUser.save();
  res.send(newUser);
};

const allUser = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const delUser = await user.findByIdAndDelete(id);
    res.status(200).send(delUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "use correct email format" });
    }

    const nameRegex = /^[a-zA-Z0-9]{5,}$/; // At least 5 characters, no symbols
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ error: "username should contain more than 4 character" });
    }

    const phoneRegex = /^1\d{9}$/; // Starts with '1' and contains 10 digits
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ error: "number should starts with '1' and have 10 digits" });
    }

    const updateUser = await user.findByIdAndUpdate(id, req.body);
    res.status(200).send(updateUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const findUser = async (req, res) => {
  //console.log(req.query);
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const findUser = await user.find({ name: { $regex: q, $options: "i" } });
    //console.log(findUser);
    res.status(200).json(findUser);
  } catch (error) {
    //console.log("failed");
    res.status(500).json({ message: "Error searching users", error });
  }
};

const addBook = async (req, res) => {
  const newBook = new book(req.body);
  const { quantity } = req.body;
  if (quantity < 0) {
    return res
      .status(400)
      .json({ error: "quantity should be '0' or greater than '0'" });
  }
  //console.log(req.body);
  //console.log(newBook);
  await newBook.save();
  res.send(newBook);
};

const allBook = async (req, res) => {
  try {
    const books = await book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const delBook = await book.findByIdAndDelete(id);
    res.status(200).send(delBook);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { quantity } = req.body;
    if (quantity < 0) {
      return res
        .status(400)
        .json({ error: "quantity should be '0' or greater than '0'" });
    }

    const updateBooks = await book.findByIdAndUpdate(id, req.body);
    res.status(200).send(updateBooks);
  } catch (err) {
    res.status(400).send(err);
  }
};

const findBook = async (req, res) => {
  //console.log(req.query);
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const findBook = await book.find({ name: { $regex: q, $options: "i" } });
    res.status(200).json(findBook);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};

module.exports = {
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
};
