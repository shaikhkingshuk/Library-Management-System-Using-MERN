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
    setError("");

    e.preventDefault();
    //console.log(managerValues);
    try {
      const response = await axios.post(
        "http://localhost:5000/addManager",
        managerValues,
        {
          withCredentials: true,
        }
      );
      onManagerAdded(response.data);
      //console.log(response);
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <h1>Add Manager</h1>
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
          type="password"
          placeholder="Password"
          name="password"
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

export default AddManager;
