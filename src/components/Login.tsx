import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión:", error.message);
      } else {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4285F4",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
