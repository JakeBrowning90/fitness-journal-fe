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
  const [dates, setDates] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");
  const [submissionError, setSubmissionError] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Functions
  useEffect(() => {
    fetch(apiSource + `date/home/`, {
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
        console.log(response[0]);
        setDates(response[0]);
        setExercises(response[1]);
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
      <h1>Home Screen</h1>
      {/* Render list of dates w/ sessions */}
      {dates.length == 0 ? (
        <span>No sessions found</span>
      ) : (
        <ul className="dateUL">
          {dates.map((calDate) => {
            let date = new Date(calDate.date);
            return (
              <li key={calDate.id} className="dateLI">
                <div className="dateHeader">
                  <span>{months[date.getMonth()]}</span>
                  <span>{date.getDate() + 1}</span>
                </div>

                {calDate.session.length == 0 ? (
                  <span>No sessions</span>
                ) : (
                  // TODO link to session detail with breakdown & edit/delete
                  <ul className="sessionUL">
                    {calDate.session.map((session) => {
                      return (
                        <li key={session.id}>
                          <a href={`/session/${session.id}`}>
                            <span>{session.exercise[0].name}</span>
                            <span>{session.durationmin} min</span>
                            <span>{session.distancek} K</span>
                            <span>{session.notes}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {/* <span>{session.exercise[0].name}</span>
                <span>Distance: {session.distancek}</span>
                <span>Time: {session.durationmin}</span> */}
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={submitSession}>
        <h2>Add Session</h2>
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
            {exercises.map((exercise) => {
              return (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              );
            })}
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
        <button>Submit</button>
      </form>
    </>
  );
}

export default HomeScreen;
