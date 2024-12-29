import React, { useState } from "react";
import axios from "axios";
import "./list.css";

const AddUser = ({ onUserAdded }) => {
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //console.log(userValues);
    try {
      const response = await axios.post(
        "http://localhost:5000/addUser",
        userValues,
        {
          withCredentials: true,
        }
      );
      onUserAdded(response.data);
      //console.log(response);
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <h1>Add User</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleChanges(e)}
          required
        ></input>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChanges(e)}
          required
        ></input>
        <input
          type="number"
          placeholder="Phone"
          name="phone"
          onChange={(e) => handleChanges(e)}
          required
        ></input>
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={(e) => handleChanges(e)}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddUser;
