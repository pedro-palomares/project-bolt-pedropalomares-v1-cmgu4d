import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <div>
      <Login />
      <Dashboard />
    </div>
  );
};

export default App;
