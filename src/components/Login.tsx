import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
      alert(`Bienvenido, ${result.user.displayName}`);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <h1>Inicia sesión</h1>
      <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Login;
