import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./form.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Access passed state
  const [userValues, setUserValues] = useState(state || {});

  const handleChanges = (e) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(userValues);
      const response = await axios.put(
        `http://localhost:5000/updateUser/${id}`,
        userValues
      );
      if (response.status === 200) {
        navigate("/"); // after updating it will take to the userList page
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="page-view">
      <Sidebar />
      <div className="form-container">
        <h1>Edit User</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userValues.name}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={userValues.email}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              value={userValues.phone}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userValues.address}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
