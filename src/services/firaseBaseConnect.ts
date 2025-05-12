
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPTWrV-dAyT9MZEtbYImxhIyTZXGhRxwg",
  authDomain: "reactlinks-51ce3.firebaseapp.com",
  projectId: "reactlinks-51ce3",
  storageBucket: "reactlinks-51ce3.firebasestorage.app",
  messagingSenderId: "1094241602933",
  appId: "1:1094241602933:web:7ee318fdbbd2841e07573c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}