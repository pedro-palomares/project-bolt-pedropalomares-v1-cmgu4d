import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * Guarda los datos del usuario en Firestore.
 * @param {Object} user - Objeto de usuario obtenido de Firebase Authentication.
 */
export const saveUserData = async (user) => {
  const userDoc = doc(db, "users", user.uid); // Crea una referencia al documento del usuario
  await setDoc(
    userDoc,
    {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(), // Fecha de creación
    },
    { merge: true } // Actualiza campos sin sobrescribir el documento completo
  );
};
