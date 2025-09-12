import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function SessionScreen(
  {
    // Props
  }
) {
  // State declarations
  //   const [content, setContent] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  // Functions
  //   useEffect(() => {
  //     fetch(apiSource + `opportunity`, {
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status >= 400) {
  //           throw new Error("Fetch error");
  //         }
  //         return response.json();
  //       })
  //       .then((response) => setContent(response))
  //       .catch((error) => setError(error))
  //       .finally(() => setLoading(false));
  //   }, []);

  // Render
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <h1>Session Manager</h1>
    </>
  );
}

export default SessionScreen
