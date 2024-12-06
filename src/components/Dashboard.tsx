import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

type Automation = {
  name: string;
  status: string;
  platform: string;
};

type User = {
  name: string;
  email: string;
  automations?: Automation[];
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
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

      await updateDoc(userDocRef, { automations: updatedAutomations });

      setAutomations(updatedAutomations);
    } catch (error) {
      console.error("Error al añadir una automatización:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h1>Bienvenido, {user.name}</h1>
          <ul>
            {automations.map((automation, index) => (
              <li key={index}>
                {automation.name} - {automation.status}
              </li>
            ))}
          </ul>
          <button
            onClick={addAutomation}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Añadir Automatización
          </button>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default Dashboard;
