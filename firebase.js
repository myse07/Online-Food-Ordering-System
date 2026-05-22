<<<<<<< HEAD
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
=======
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

>>>>>>> 70e51723232f3c0a184b9c13fd7fd69504012052
const firebaseConfig = {
  apiKey: "AIzaSyC8W3iJL2Y3JA2rvOzecLsssEMby7ZHPsQ",
  authDomain: "online-ordering-system-7a05f.firebaseapp.com",
  projectId: "online-ordering-system-7a05f",
  storageBucket: "online-ordering-system-7a05f.firebasestorage.app",
  messagingSenderId: "1029089563464",
  appId: "1:1029089563464:web:0399698fc4103e9312d97d"
};

<<<<<<< HEAD
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore database
export { db };
=======

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
>>>>>>> 70e51723232f3c0a184b9c13fd7fd69504012052
