import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [userNameError, setuserNameError] = useState("");
  const [userPassError, setuserPassError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Resetting error message
    setErrorMessage("");
    setuserNameError("");
    setuserPassError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/user");
      }
    } catch (e) {
      const err = e.response.data.error;
      if (err === "username_mismatch") {
        setuserNameError("Username not found");
      } else if (err === "password_mismatch") {
        setuserPassError("Incorrect password");
      } else {
        setErrorMessage("Internal server error...");
      }
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
              {userNameError && <p style={{ color: "red" }}>{userNameError}</p>}
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
              {userPassError && <p style={{ color: "red" }}>{userPassError}</p>}
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
