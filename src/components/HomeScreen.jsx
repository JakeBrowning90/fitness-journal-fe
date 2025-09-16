import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function HomeScreen(
  {
    // Props
  }
) {
  // State declarations
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  useEffect(() => {
    fetch(apiSource + `session`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Fetch error");
        }
        return response.json();
      })
      .then((response) => {
        setContent(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // function handleFormInput(e) {
  //   setFormInput(e.target.value);
  // }

  async function submitSession(e) {
    e.preventDefault();
    console.log("Submitted session");
  }

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <h1>Home Screen</h1>
      {/* Render list of dates w/ sessions */}
      {content.length == 0 ? (
        <span>No sessions found</span>
      ) : (
        <ul>
          {content.map((session) => {
            return (
              <li key={session.id}>
                <span>{session.date}</span>
                <span>{session.exercise[0].name}</span>
                <span>Distance: {session.distancek}</span>
                <span>Time: {session.durationmin}</span>
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={submitSession}>
        <h2>Add Session</h2>
        <div className="formLabelInput">
          <label htmlFor="">Date:</label>
          <input type="text" />
        </div>

        <div className="formLabelInput">
          <label htmlFor="">Exercise:</label>
          <input type="text" />
        </div>

        <div className="formLabelInput">
          <label htmlFor="">Duration:</label>
          <input type="text" />
        </div>

        <div className="formLabelInput">
          <label htmlFor="">Distance:</label>
          <input type="text" />
        </div>

        <div className="formLabelInput">
          <label htmlFor="">Notes:</label>
          <input type="text" />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default HomeScreen;
