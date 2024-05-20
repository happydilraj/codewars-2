import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBmVAFj8EioN2PCv-8pQWqW0DgP3y96Xlw",
  authDomain: "codewars-2-2fd60.firebaseapp.com",
  projectId: "codewars-2-2fd60",
  storageBucket: "codewars-2-2fd60.appspot.com",
  messagingSenderId: "1036158317501",
  appId: "1:1036158317501:web:50d97e46aed5539ab818d4",
  measurementId: "G-MBDT87BXT2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
