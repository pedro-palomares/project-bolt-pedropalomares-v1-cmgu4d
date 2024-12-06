import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null); // Estado para almacenar al usuario autenticado

  // Escucha los cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado con el usuario actual
    });
    return unsubscribe; // Limpia la suscripción cuando el componente se desmonte
  }, []);

  // Función para manejar el inicio de sesión con Google
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
      alert(`Bienvenido, ${result.user.displayName}`);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("No se pudo iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al cerrar la sesión.");
    }
  };

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.userInfo}>
          <h1>Hola, {user.displayName}</h1>
          <img src={user.photoURL} alt="Avatar" style={styles.avatar} />
          <button onClick={handleLogout} style={styles.logoutButton}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div style={styles.loginContainer}>
          <h1>Bienvenido a mi aplicación</h1>
          <button onClick={handleLogin} style={styles.loginButton}>
            Iniciar sesión con Google
          </button>
        </div>
      )}
    </div>
  );
};

// Estilos en línea para simplificar el ejemplo
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    margin: "20px 0",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginButton: {
    padding: "10px 20px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default App;
