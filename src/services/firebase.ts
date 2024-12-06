// Importa las funciones necesarias desde los SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBiXTDSMcwnlwki3jeiVPvbovsCtLJuBjE",
  authDomain: "pedropalomares-web-8bf6c.firebaseapp.com",
  projectId: "pedropalomares-web-8bf6c",
  storageBucket: "pedropalomares-web-8bf6c.appspot.com", // Corrige "app" por "appspot.com"
  messagingSenderId: "412064606196",
  appId: "1:412064606196:web:a3eb1c8ae85684b62dfba1",
  measurementId: "G-SPXKZEEEBZ",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás en el proyecto
export const auth = getAuth(app); // Para autenticación
export const db = getFirestore(app); // Para Firestore
