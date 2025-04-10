// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgc78t0Ou6szzfEOjzTKCZwoEn_U9CEo0",
  authDomain: "porlacoca-60fbc.firebaseapp.com",
  projectId: "porlacoca-60fbc",
  storageBucket: "porlacoca-60fbc.firebasestorage.app",
  messagingSenderId: "152007550753",
  appId: "1:152007550753:web:b0329582837173b9a30060",
  measurementId: "G-64S9HTDY5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);