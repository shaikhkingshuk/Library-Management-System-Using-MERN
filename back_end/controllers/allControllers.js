const manager = require("../model/managerModel");
const user = require("../model/userModel");
const book = require("../model/bookModel");
const bcrypt = require("bcryptjs");
const borrower = require("../model/recordModel");

const addManager = async (req, res) => {
  const { name, password, email, phone, address } = req.body;
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
    console.log(delManager);
    res.status(200).send(delManager);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
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
  console.log(req.body);
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
    console.log(id);
    const delUser = await user.findByIdAndDelete(id);
    res.status(200).send(delUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await user.findByIdAndUpdate(id, req.body);
    res.status(200).send(updateUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const findUser = async (req, res) => {
  console.log(req.query);
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const findUser = await user.find({ name: { $regex: q, $options: "i" } });
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};

const addBook = async (req, res) => {
  const newBook = new book(req.body);
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
    console.log(id);
    const delBook = await book.findByIdAndDelete(id);
    res.status(200).send(delBook);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBooks = await book.findByIdAndUpdate(id, req.body);
    res.status(200).send(updateBooks);
  } catch (err) {
    res.status(400).send(err);
  }
};

const findBook = async (req, res) => {
  console.log(req.query);
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
};
