import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginWithGoogle from "./components/LoginWithGoogle";
import Dashboard from "./components/Dashboard"; // Debes crear este componente
import PrivateRoute from "./components/PrivateRoute"; // Debes crear este componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWithGoogle />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
