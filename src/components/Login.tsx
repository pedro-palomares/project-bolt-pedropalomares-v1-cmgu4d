import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase"; // Cambia la ruta según la ubicación de firebase.ts

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Usuario autenticado:", result.user);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
