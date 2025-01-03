import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./form.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Access passed state
  const [bookValues, setBookValues] = useState(state || {});
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setBookValues({ ...bookValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      //console.log(bookValues);
      const response = await axios.put(
        `http://localhost:5000/updateBook/${id}`,
        bookValues,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate("/book"); // after updating it will take to the bookList page
      }
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div className="page-view">
      <Sidebar />
      <div className="form-container">
        <h1>Edit Book</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={bookValues.name}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={bookValues.author}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={bookValues.quantity}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default EditBook;
