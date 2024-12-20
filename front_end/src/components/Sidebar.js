import React from "react";
import "./list.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>User</h2>
      <ul>
        <li>
          <Link to="/" className="no-underline">
            Add User
          </Link>
        </li>
        <li>
          <Link to="/search" className="no-underline">
            Search User
          </Link>
        </li>
      </ul>
      <h2>Manager</h2>
      <ul>
        <li>
          <Link to="/manager" className="no-underline">
            Add Manager
          </Link>
        </li>
        <li>
          <Link to="/search/manager" className="no-underline">
            Search Manager
          </Link>
        </li>
      </ul>
      <h2>Book</h2>
      <ul>
        <li>
          <Link to="/book" className="no-underline">
            Add Book
          </Link>
        </li>
        <li>
          <Link to="/search/book" className="no-underline">
            Search Book
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
