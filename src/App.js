import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginWithGoogle from "./components/LoginWithGoogle";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginWithGoogle />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<h1>Página Principal</h1>} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
