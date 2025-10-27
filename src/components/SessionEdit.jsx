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

  const [dates, setDates] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");

  const [submissionError, setSubmissionError] = useState(true);
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
      .then((response) => populateInputs(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  function populateInputs(response) {
    setDate(response.date[0].date);
    setExercise(response.exercise[0].name);
    setDuration(response.durationmin);
    setDistance(response.distancek);
    setNotes(response.notes);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleExercise(e) {
    setExercise(e.target.value);
  }

  function handleDuration(e) {
    setDuration(e.target.value);
  }

  function handleDistance(e) {
    setDistance(e.target.value);
  }

  function handleNotes(e) {
    setNotes(e.target.value);
  }

  async function submitSessionEdit(e) {
    e.preventDefault();
    console.log(date, exercise, duration, distance, notes);
    const response = await fetch(apiSource + `session/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // TODO: Get user from logged-in token
        user: 1,
        date: date,
        exercise: exercise,
        duration: duration,
        distance: distance,
        notes: notes,
      }),
    });
    const sessionResponse = await response.json();
    console.log(sessionResponse);
    if (Array.isArray(sessionResponse.errors)) {
      setSubmissionError(true);
      setErrorMessages(sessionResponse.errors);
      // TODO: display error message
    } else {
      setSubmissionError(false);
      // TODO: Modal to verify clock-in?
      // Redirect to home
      window.location.href = `/`;
    }
  }

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <a href={`/session/${session.id}`}>Back to Detail</a>

      <form onSubmit={submitSessionEdit}>
        <h2>Edit Session</h2>
        {submissionError && (
          <ul>
            {errorMessages.map((error) => {
              return <li key={error.msg}>{error.msg}</li>;
            })}
          </ul>
        )}
        <div className="formLabelInput">
          <label htmlFor="dateInput">Date:</label>
          <input
            id="dateInput"
            type="date"
            value={date}
            onChange={handleDate}
          />
        </div>

        <div className="formLabelInput">
          <label htmlFor="exerciseSelect">Exercise:</label>
          <select id="exerciseSelect" onChange={handleExercise}>
            <option value="">-Select an exercise-</option>
            {/* {exercises.map((exercise) => {
              return (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              );
            })} */}
          </select>
        </div>

        <div className="formLabelInput">
          <label htmlFor="durationInput">Duration (Min):</label>
          <input
            id="durationInput"
            type="number"
            min="0"
            value={duration}
            onChange={handleDuration}
          />
        </div>

        <div className="formLabelInput">
          <label htmlFor="distanceInput">Distance (K):</label>
          <input
            id="distanceInput"
            type="number"
            min="0"
            step="0.1"
            value={distance}
            onChange={handleDistance}
          />
        </div>

        <div className="formLabelInput">
          <label htmlFor="notesInput">Notes:</label>
          <input
            id="notesInput"
            type="text"
            value={notes}
            onChange={handleNotes}
          />
        </div>
        <button>Save Edits TBA</button>
      </form>
    </>
  );
}

export default SessionEdit;
