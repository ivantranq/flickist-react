// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5xCFfxBtIlmXUmUe4OikenOf4E5-YYUM",
  authDomain: "flickist-54ac6.firebaseapp.com",
  projectId: "flickist-54ac6",
  storageBucket: "flickist-54ac6.appspot.com",
  messagingSenderId: "753962303343",
  appId: "1:753962303343:web:e821ce0f2801e5d899f29a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
