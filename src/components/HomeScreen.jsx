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
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  useEffect(() => {
    fetch(apiSource + `session/home`, {
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

  async function submitSession(e) {
    e.preventDefault();
    console.log(date, exercise, duration, distance, notes);
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
          <input
            id="exerciseSelect"
            type="text"
            value={exercise}
            onChange={handleExercise}
          />
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
        <button>Submit</button>
      </form>
    </>
  );
}

export default HomeScreen;
