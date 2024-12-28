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
    } catch (error) {
      setError("Failed to submit data. Please try again later.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <h1>Add User</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleChanges(e)}
        ></input>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChanges(e)}
        ></input>
        <input
          type="number"
          placeholder="Phone"
          name="phone"
          onChange={(e) => handleChanges(e)}
        ></input>
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={(e) => handleChanges(e)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
