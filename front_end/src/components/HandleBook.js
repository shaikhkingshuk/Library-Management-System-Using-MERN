import { useState } from "react";
import Sidebar from "./Sidebar";
import AddBook from "./AddBook";
import Book from "./Book";

function HandleBook() {
  const [newBook, setNewBook] = useState(null);

  // Callback to receive the newly added book
  const handleBookAdded = (book) => {
    setNewBook(book);
  };
  return (
    <div className="page-view">
      <Sidebar />
      <div className="content">
        <AddBook onBookAdded={handleBookAdded} />
        <Book newBook={newBook} />
      </div>
    </div>
  );
}

export default HandleBook;
