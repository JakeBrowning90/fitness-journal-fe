import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function SessionEdit(
  {
    // Props
  }
) {
  // State declarations
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const { sessionId } = useParams();
  useEffect(() => {
    fetch(apiSource + `session/${sessionId}`, {
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
      .then((response) => setSession(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <h1>Session Edit</h1>
      <a href={`/session/${session.id}`}>Back to Detail</a>

      <form action="">
        <span>{session.exercise[0].name}</span>
        <span>{session.date[0].date}</span>
        <span>{session.durationmin}</span>
        <span>{session.distancek}</span>
        <span>{session.notes}</span>
        <button>Save TBA</button>
      </form>
    </>
  );
}

export default SessionEdit;
