import React, { useState } from "react";
import axios from "axios";
import "./list.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/searchBook", {
        params: { q: query }, // Send search query as a parameter
      });
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to search books. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteBook/${id}`);
      setSearchResults((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      ); ///use to update the data instantly in the webpage without reloading the whole page
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="page-view">
      <Sidebar />
      <div className="content">
        <div className="add-form">
          <h1>Search Book</h1>

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
                  <th>Author</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {searchResults.map((book, index) => (
                  <tr key={index}>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <button onClick={() => deleteBook(book._id)}>
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/book/edit/${book._id}`, {
                            state: {
                              name: book.name,
                              author: book.author,
                              quantity: book.quantity,
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
            !loading && <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
