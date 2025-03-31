// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyDOBx2RiDPUIg6LfGjoRQWzRKd-_oRik",
  authDomain: "duolearnlanding.firebaseapp.com",
  projectId: "duolearnlanding",
  storageBucket: "duolearnlanding.firebasestorage.app",
  messagingSenderId: "289687749964",
  appId: "1:289687749964:web:8e47592bfaf47b5f833be9",
  measurementId: "G-FXQXZPDY6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);