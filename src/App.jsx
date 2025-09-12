import { useState } from "react";
// import "./App.css";
import "./reset.css";
import "./style.css";
import { Routes, Route, Link, useNavigate } from "react-router";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <>
      <header>Nav</header>
      <main>
        <Routes>
          {/* <Route path="" element={} /> */}
          <Route path="login" element={<LoginScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <footer>App by Jake Browning, 2025</footer>
    </>
  );
}

export default App;
