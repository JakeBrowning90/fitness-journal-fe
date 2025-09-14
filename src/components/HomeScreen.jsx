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
        console.log(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <h1>Home Screen</h1>
      <form action="">
        <h2>Add Session</h2>
        <label htmlFor="">Date:</label>
        <input type="text" />
        <label htmlFor="">Exercise:</label>
        <input type="text" />

        <label htmlFor="">Duration:</label>
        <input type="text" />

        <label htmlFor="">Distance:</label>
        <input type="text" />
        <label htmlFor="">Notes:</label>
        <input type="text" />
      </form>
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
    </>
  );
}

export default HomeScreen;
