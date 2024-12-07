import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Has cerrado sesión correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  const user = auth.currentUser;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h1>Bienvenido, {user.displayName}</h1>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#d9534f",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default Dashboard; 