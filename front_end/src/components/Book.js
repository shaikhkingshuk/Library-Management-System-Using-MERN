import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./list.css";

const Book = ({ newBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allBook");
      setBooks(response.data); // Set books state with API response
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch books.");
      setLoading(false);
    }
  };

  //////////----> To show newly added data in the top of the list
  useEffect(() => {
    if (newBook) {
      setBooks((prevBooks) => [newBook, ...prevBooks]);
    }
  }, [newBook]);

  //////////----> To fetch data by calling 'fetchBooks'
  useEffect(() => {
    // Fetch data from the API
    fetchBooks();
  }, []);

  const navigate = useNavigate();

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteBook/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); ///use to update the data instantly in the webpage without reloading the whole page
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
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
        {books.map((book, index) => (
          <tr key={index}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.quantity}</td>
            <td>
              <button onClick={() => deleteBook(book._id)}>Delete</button>
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
  );
};

export default Book;
