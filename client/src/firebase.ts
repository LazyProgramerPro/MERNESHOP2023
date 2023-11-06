import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDdKdYvECL9KYU43ciqp6yIDg180drMOg",
  authDomain: "eshop-3d342.firebaseapp.com",
  projectId: "eshop-3d342",
  storageBucket: "eshop-3d342.appspot.com",
  messagingSenderId: "238305717580",
  appId: "1:238305717580:web:a24e51a6b7186e077233e9",
  measurementId: "G-4RE4TNVR6W",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, googleAuthProvider };
