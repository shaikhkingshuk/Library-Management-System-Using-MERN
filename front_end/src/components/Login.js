import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      navigate("/user");
    } catch (error) {
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="login-container">
        <div className="login-box">
          <div className="icon-container">
            <i className="fas fa-user-tie"></i>{" "}
            {/* Font Awesome Manager Icon */}
          </div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="inner-div">
              <label>Manager Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter manager name"
                required
              />
            </div>

            <div className="inner-div">
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
