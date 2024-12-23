// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-43836.firebaseapp.com",
  projectId: "mern-blog-43836",
  storageBucket: "mern-blog-43836.firebasestorage.app",
  messagingSenderId: "1072279937884",
  appId: "1:1072279937884:web:85c964cbbf06bde35dd799"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);