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

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      {/* <h1>Home Screen</h1> */}
      {/* Render list of dates w/ sessions */}
      <section className="homeListSection">
        {" "}
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
                            <a
                              href={`/session/${session.id}`}
                              className="sessionLI"
                            >
                              <span>{session.exercise[0].name}</span>

                              {/* Conditionally render time */}
                              {session.durationmin && (
                                <span> - {session.durationmin} min</span>
                              )}

                              {/* Conditionally render distance */}
                              {session.distancek && (
                                <span>- {session.distancek} K</span>
                              )}
                              {/* <span>{session.notes}</span> */}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <section>
        <a href="/newsession">New Session</a>
      </section>
    </>
  );
}

export default HomeScreen;
