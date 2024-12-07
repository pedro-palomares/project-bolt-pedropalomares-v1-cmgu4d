import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Función para manejar el inicio de sesión con Google
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", auth.currentUser);
      navigate("/dashboard"); // Redirigir al Dashboard después del inicio de sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuario desconectado");
      navigate("/login"); // Redirigir a la página de inicio de sesión después del logout
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f4f4f4",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{ cursor: "pointer", color: "#333" }}
        onClick={() => navigate("/")}
      >
        Mi Aplicación
      </h1>
      <div>
        {/* Botones de Login y Logout */}
        {!currentUser ? (
          <button
            onClick={handleLogin}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF6347",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
