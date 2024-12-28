import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./list.css";

const User = ({ newUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allUser", {
        withCredentials: true,
      });
      setUsers(response.data); // Set users state with API response
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  //////////----> To show newly added data in the top of the list
  useEffect(() => {
    if (newUser) {
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    }
  }, [newUser]);

  //////////----> To fetch data by calling 'fetchUsers'
  useEffect(() => {
    // Fetch data from the API
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); ///use to update the data instantly in the webpage without reloading the whole page
    } catch (error) {
      console.error("Error deleting user:", error);
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
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
            <td>
              <button onClick={() => deleteUser(user._id)}>Delete</button>
              <button
                onClick={() =>
                  navigate(`/edit/${user._id}`, {
                    state: {
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      address: user.address,
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

export default User;
