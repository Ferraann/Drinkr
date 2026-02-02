// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpFKtBteCn3Wq3M-IZTieJDQ5rl-O77Gg",
  authDomain: "drinkr-6cdbf.firebaseapp.com",
  projectId: "drinkr-6cdbf",
  storageBucket: "drinkr-6cdbf.firebasestorage.app",
  messagingSenderId: "610727541972",
  appId: "1:610727541972:web:eebe4f90eb400d175b8f41"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Inicializa Firebase Auth
export const auth = getAuth(app);

export default app;