import React from "react";
import axios from "axios";
import "./list.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default behavior to avoid issues

    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {}, // Sending an empty object as the body
        {
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );
      console.log("Response:", response); // Log the server response for debugging
    } catch (err) {
      console.error("Error:", err.response || err); // Log any error encountered
    } finally {
      console.log("Logout attempt completed.");

      // Add a slight delay before navigation (for debugging, optional)
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 1000);
    }
  };
  return (
    <div className="btnn">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;
