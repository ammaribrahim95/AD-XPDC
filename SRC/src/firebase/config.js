import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjOXPlypNVC6cDqDA8azZ_7HsGMt7Pb-4",
  authDomain: "sims-e02dc.firebaseapp.com",
  projectId: "sims-e02dc",
  storageBucket: "sims-e02dc.firebasestorage.app",
  messagingSenderId: "782175512315",
  appId: "1:782175512315:web:be2fb5883bd3191d32325e",
  measurementId: "G-NTWRQF93YV"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
