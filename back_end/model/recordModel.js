const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  book: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  due_date: {
    type: Date,
    required: true,
  },
});

const borrower = mongoose.model("borrower", borrowingSchema);

module.exports = borrower;
