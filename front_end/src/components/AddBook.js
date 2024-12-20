import React, { useState } from "react";
import axios from "axios";
import "./list.css";

const AddBook = ({ onBookAdded }) => {
  const [bookValues, setBookValues] = useState({
    name: "",
    author: "",
    quantity: "",
  });
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setBookValues({ ...bookValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(bookValues);
    try {
      const response = await axios.post(
        "http://localhost:5000/addBook",
        bookValues
      );
      onBookAdded(response.data);
      //console.log(response);
    } catch (error) {
      setError("Failed to submit data. Please try again later.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <h1>Add Book</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleChanges(e)}
        ></input>
        <input
          type="text"
          placeholder="Author"
          name="author"
          onChange={(e) => handleChanges(e)}
        ></input>
        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          onChange={(e) => handleChanges(e)}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBook;
