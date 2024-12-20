import React, { useState } from "react";
import axios from "axios";
import "./list.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const SearchManager = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/searchManager", {
        params: { q: query }, // Send search query as a parameter
      });
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to search managers. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const deleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteManager/${id}`);
      setSearchResults((prevManagers) =>
        prevManagers.filter((manager) => manager._id !== id)
      ); ///use to update the data instantly in the webpage without reloading the whole page
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="page-view">
      <Sidebar />
      <div className="content">
        <div className="add-form">
          <h1>Search Manager</h1>

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
                {searchResults.map((manager, index) => (
                  <tr key={index}>
                    <td>{manager.name}</td>
                    <td>{manager.email}</td>
                    <td>{manager.phone}</td>
                    <td>{manager.address}</td>
                    <td>
                      <button onClick={() => deleteManager(manager._id)}>
                        Delete
                      </button>
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
          ) : (
            !loading && <p>No manager found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchManager;
