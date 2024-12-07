// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiXTDSMcwnlwki3jeiVPvbovsCtLJuBjE",
  authDomain: "pedropalomares-web-8bf6c.firebaseapp.com",
  projectId: "pedropalomares-web-8bf6c",
  storageBucket: "pedropalomares-web-8bf6c.firebasestorage.app",
  messagingSenderId: "412064606196",
  appId: "1:412064606196:web:a3eb1c8ae85684b62dfba1",
  measurementId: "G-SPXKZEEEBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);