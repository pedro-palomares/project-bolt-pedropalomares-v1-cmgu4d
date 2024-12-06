import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Se define el componente App como una función que retorna JSX.
// Se especifica el tipo de retorno como JSX.Element para mayor claridad.
const App: React.FC<{}> = (): JSX.Element => {
  return (
    <div>
      <Login />
      <Dashboard />
    </div>
  );
};

export default App;
