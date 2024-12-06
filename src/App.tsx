import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Navbar from "./components/Navbar";
// Importación de componentes
import Login from "./components/Login.tsx"; // Especificamos la extensión .tsx
import Dashboard from "./components/Dashboard";
interface User {
  id: string;
  name: string;
  email: string;
}

const App: React.FC = () => {
  // Se utiliza la interfaz 'User' para tipificar correctamente el estado 'user'.
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Se realiza una verificación para asegurar que currentUser es del tipo User o null antes de actualizar el estado.
      if (currentUser === null) {
        setUser(null);
      } else if (currentUser) {
        // Creamos un objeto User con los datos necesarios
        const userData: User = {
          id: currentUser.uid,
          name: currentUser.displayName || '',
          email: currentUser.email || ''
        };
        setUser(userData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/" element={<h1>Página Principal</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
