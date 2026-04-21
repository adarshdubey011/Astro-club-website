
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCINgGT17jP0RQokxK0JULiDiGAbrbm2eA",
  authDomain: "the-astro-club-68317.firebaseapp.com",
  projectId: "the-astro-club-68317",
  storageBucket: "the-astro-club-68317.firebasestorage.app",
  messagingSenderId: "22846913555",
  appId: "1:22846913555:web:caf7b8670fe71db14613e6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
