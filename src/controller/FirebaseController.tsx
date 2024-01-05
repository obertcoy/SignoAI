// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPidhlavIZXZ9er1e1d7RakqDMFWTLU5o",
  authDomain: "signoai.firebaseapp.com",
  projectId: "signoai",
  storageBucket: "signoai.appspot.com",
  messagingSenderId: "218073046395",
  appId: "1:218073046395:web:df80b720da06479f1131de",
  measurementId: "G-9YJ69V7LPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
