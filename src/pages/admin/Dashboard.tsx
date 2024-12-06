import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase"; // Asegúrate de que la ruta sea correcta
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Define el tipo de automatización
type Automation = {
  name: string;
  status: string;
  platform: string;
};

// Define el tipo de usuario
type User = {
  name: string;
  email: string;
  automations?: Automation[];
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [automations, setAutomations] = useState<Automation[]>([]);

  // Obtiene los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User; // Asegura el tipo correcto
          setUser(userData);
          setAutomations(userData.automations || []);
        } else {
          console.warn("No se encontraron datos para el usuario.");
        }
      } else {
        console.warn("Usuario no autenticado.");
      }
    };

    fetchUserData();
  }, []);

  // Añade una nueva automatización
  const addAutomation = async () => {
    if (!auth.currentUser) {
      console.error("El usuario no está autenticado.");
      return;
    }

    const newAutomation: Automation = {
      name: "Nueva Automatización",
      status: "inactive",
      platform: "Make",
    };

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const updatedAutomations = [...automations, newAutomation];

      // Actualiza Firestore con la nueva lista de automatizaciones
      await updateDoc(userDocRef, { automations: updatedAutomations });

      // Actualiza el estado local
      setAutomations(updatedAutomations);
    } catch (error) {
      console.error("Error al añadir una automatización:", error);
    }
  };

  return (
    <div style={styles.container}>
      {user ? (
        <>
          <h1>Bienvenido, {user.name}</h1>
          <h2>Tus Automatizaciones</h2>
          <ul>
            {automations.map((automation, index) => (
              <li key={index}>
                <strong>{automation.name}</strong> - {automation.status}
              </li>
            ))}
          </ul>
          <button onClick={addAutomation} style={styles.button}>
            Añadir Automatización
          </button>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

// Estilos en línea
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Dashboard;
