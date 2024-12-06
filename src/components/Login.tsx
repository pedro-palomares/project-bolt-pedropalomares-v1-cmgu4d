import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const Login: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Inicia sesión</h1>
      <button onClick={handleLogin} style={styles.button}>
        Iniciar sesión con Google
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
