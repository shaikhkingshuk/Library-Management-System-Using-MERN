import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./form.css";

const EditManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Access passed state
  const [managerValues, setManagerValues] = useState(state || {});

  const handleChanges = (e) => {
    setManagerValues({ ...managerValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(managerValues);
      const response = await axios.put(
        `http://localhost:5000/updateManager/${id}`,
        managerValues
      );
      if (response.status === 200) {
        navigate("/manager"); // after updating it will take to the managerList page
      } else {
        console.error("Failed to update manager");
      }
    } catch (error) {
      console.error("Error updating manager:", error);
    }
  };

  return (
    <div className="page-view">
      <Sidebar />
      <div className="form-container">
        <h1>Edit Manager</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={managerValues.name}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={managerValues.email}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              value={managerValues.phone}
              onChange={(e) => handleChanges(e)}
              className="form-input"
            ></input>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={managerValues.address}
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

export default EditManager;
