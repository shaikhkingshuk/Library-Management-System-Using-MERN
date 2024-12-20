import React, { useState } from "react";
import axios from "axios";
import "./list.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/searchUser", {
        params: { q: query }, // Send search query as a parameter
      });
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to search users. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`);
      setSearchResults((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      ); ///use to update the data instantly in the webpage without reloading the whole page
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="page-view">
      <Sidebar />
      <div className="content">
        <div className="add-form">
          <h1>Search User</h1>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter name to search"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {loading && <p>Loading...</p>}

        <div>
          <h1>Search Results</h1>

          {searchResults.length > 0 ? (
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
                {searchResults.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <button onClick={() => deleteUser(user._id)}>
                        Delete
                      </button>
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
          ) : (
            !loading && <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
