// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV5fqc29jcNFDJRmTA-mIwWJChAB6iGjQ",
  authDomain: "ordering-system-5e268.firebaseapp.com",
  projectId: "ordering-system-5e268",
  storageBucket: "ordering-system-5e268.firebasestorage.app",
  messagingSenderId: "1085705731990",
  appId: "1:1085705731990:web:2e36ad5d4e9019fb5867b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore database
export { db };