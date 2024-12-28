import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./list.css";

const Manager = ({ newManager }) => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allManager", {
        withCredentials: true,
      });
      setManagers(response.data); // Set managers state with API response
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch managers.");
      setLoading(false);
    }
  };

  //////////----> To show newly added data in the top of the list
  useEffect(() => {
    if (newManager) {
      setManagers((prevManagers) => [newManager, ...prevManagers]);
    }
  }, [newManager]);

  //////////----> To fetch data by calling 'fetchManagers'
  useEffect(() => {
    // Fetch data from the API
    fetchManagers();
  }, []);

  const navigate = useNavigate();

  const deleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteManager/${id}`, {
        withCredentials: true,
      });
      setManagers((prevManagers) =>
        prevManagers.filter((manager) => manager._id !== id)
      ); ///use to update the data instantly in the webpage without reloading the whole page
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table className="all-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {managers.map((manager, index) => (
          <tr key={index}>
            <td>{manager.name}</td>
            <td>{manager.email}</td>
            <td>{manager.phone}</td>
            <td>{manager.address}</td>
            <td>
              <button onClick={() => deleteManager(manager._id)}>Delete</button>
              <button
                onClick={() =>
                  navigate(`/manager/edit/${manager._id}`, {
                    state: {
                      name: manager.name,
                      email: manager.email,
                      phone: manager.phone,
                      address: manager.address,
                    },
                  })
                }
              >
                Edit
              </button>
            </td>
          </tr> ////must use backtick while sending data in params
        ))}
      </tbody>
    </table>
  );
};

export default Manager;
