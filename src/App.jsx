import { useState } from "react";
// import "./App.css";
import "./reset.css";
import "./style.css";
import { Routes, Route, Link, useNavigate } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute";
//Test route - delete after
import LoggedInOnly from "./components/LoggedInOnly";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import SessionDetail from "./components/SessionDetail";
import SessionEdit from "./components/SessionEdit";
import SessionDelete from "./components/SessionDelete";
import SessionFormView from "./components/SessionFormView";

// import SessionScreen from "./components/SessionScreen";
// import ExerciseForm from "./components/ExerciseForm";
import ProfileScreen from "./components/ProfileScreen";

function App() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav>
          <Link to={`/profile`}>Profile</Link>

          {/* <Link to={`/`}>Home</Link> */}
          {localStorage.username ? (
            <>
              <a onClick={logout}>Log Out</a>
            </>
          ) : (
            <>
              {/* <Link to={`/signup`}>Sign Up</Link> */}
              <Link to={`/login`}>Log In</Link>
            </>
          )}
          <Link to={`/`}>Home</Link>
          <Link to={`/newsession`}>Sessions</Link>
          <Link to={`/protecttest`}>Protected</Link>
        </nav>
      </header>
      <main>
        <Routes>
          {/* <Route path="" element={} /> */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />

          <Route path="session/:sessionId" element={<SessionDetail />} />
          <Route path="session/:sessionId/edit" element={<SessionEdit />} />
          <Route path="session/:sessionId/delete" element={<SessionDelete />} />

          <Route path="newsession" element={<SessionFormView />} />
          {/* <Route path="editSession" element={SessionForm} />
          <Route path="newExercise" element={ExerciseForm} />
          <Route path="editExercise" element={ExerciseForm} /> */}
          <Route path="profile" element={<ProfileScreen />} />
          <Route
            path="protectTest"
            element={
              <ProtectedRoute>
                <LoggedInOnly />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <nav className="footerNav">
          <a href="">1</a>
          <a href="">2</a>
          <a href="">3</a>
          <a href="">4</a>
        </nav>

        <span>App by Jake Browning, 2025</span>
      </footer>
    </>
  );
}

export default App;
