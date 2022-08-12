import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5xCFfxBtIlmXUmUe4OikenOf4E5-YYUM",
  authDomain: "flickist-54ac6.firebaseapp.com",
  projectId: "flickist-54ac6",
  storageBucket: "flickist-54ac6.appspot.com",
  messagingSenderId: "753962303343",
  appId: "1:753962303343:web:e821ce0f2801e5d899f29a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
