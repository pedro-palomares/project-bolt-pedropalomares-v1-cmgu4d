import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userData = await getDoc(userDoc);
        setUser(userData.data());
        setAutomations(userData.data()?.automations || []);
      }
    };

    fetchUserData();
  }, []);

  const addAutomation = async () => {
    const newAutomation = {
      name: "Nueva Automatización",
      status: "inactive",
      platform: "Make",
    };

    const userDoc = doc(db, "users", auth.currentUser.uid);
    const updatedAutomations = [...automations, newAutomation];

    await updateDoc(userDoc, { automations: updatedAutomations });
    setAutomations(updatedAutomations);
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
                {automation.name} - {automation.status}
              </li>
            ))}
          </ul>
          <button onClick={addAutomation} style={styles.button}>
            Añadir Automatización
          </button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

const styles = {
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
