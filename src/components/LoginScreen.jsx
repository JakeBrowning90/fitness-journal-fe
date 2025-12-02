import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function LoginScreen(
  {
    // Props
  }
) {
  // State declarations
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState([]);
  const [invalidLogin, setInvalidLogin] = useState(false);

  // Functions
  async function submitLogin(e) {
    e.preventDefault();
    console.log(username, password);
    const response = await fetch(apiSource + "user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status != 200) {
      setInvalidLogin(true);
    } else {
      const loginResponse = await response.json();
      console.log(loginResponse);
      // localStorage.setItem("", loginResponse.);
      localStorage.setItem("username", loginResponse.username);
      localStorage.setItem("id", loginResponse.id);
      localStorage.setItem("token", `Bearer ${loginResponse.token}`);
      setInvalidLogin(false);
      // Redirect to dashboard
      window.location.href = "/";
    }
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // Render
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <form onSubmit={submitLogin}>
        <h1>Log In</h1>
        {invalidLogin && <p>Invalid login</p>}

        <div className="formLabelInput">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            id="usernameInput"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="formLabelInput">
          <label htmlFor="">Password:</label>
          <input
            type="password"
            id="passwordInput"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button>Submit</button>
      </form>
    </>
  );
}

export default LoginScreen;
