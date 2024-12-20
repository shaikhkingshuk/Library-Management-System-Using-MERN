import React, { useState } from "react";
import axios from "axios";
import "./list.css";

const AddManager = ({ onManagerAdded }) => {
  const [managerValues, setManagerValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setManagerValues({ ...managerValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(managerValues);
    try {
      const response = await axios.post(
        "http://localhost:5000/addManager",
        managerValues
      );
      onManagerAdded(response.data);
      //console.log(response);
    } catch (error) {
      setError("Failed to submit data. Please try again later.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <h1>Add Manager</h1>
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
          type="password"
          placeholder="Password"
          name="password"
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

export default AddManager;
