import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function SessionDelete(
  {
    // Props
  }
) {
  // State declarations
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [submissionError, setSubmissionError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

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

  async function submitSessionDelete(e) {
    e.preventDefault();
    const response = await fetch(apiSource + `session/` + sessionId, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteResponse = await response.json();
    if (Array.isArray(deleteResponse.errors)) {
      setSubmissionError(true);
      setErrorMessages(sessionResponse.errors);
      // TODO: display error message
    } else {
      setSubmissionError(false);
      // Redirect to home
      window.location.href = `/`;
    }
  }

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <h1>Session Delete</h1>
      <a href={`/session/${session.id}`}>Back to Detail</a>

      <form onSubmit={submitSessionDelete}>
        <span>{session.exercise[0].name}</span>
        <span>{session.date[0].date}</span>
        <span>{session.durationmin}</span>
        <span>{session.distancek}</span>
        <span>{session.notes}</span>
        <button>Delete TBA</button>
      </form>
    </>
  );
}

export default SessionDelete;
