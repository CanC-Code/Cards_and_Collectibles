// js/main.js

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// === Firebase Config ===
// API key is loaded from environment variable at build time
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ccvo-users.firebaseapp.com",
  projectId: "ccvo-users",
  storageBucket: "ccvo-users.firebasestorage.app",
  messagingSenderId: "456061997176",
  appId: "1:456061997176:web:b501fdcfa10e8d18ea9d8d",
  measurementId: "G-YP49EXKWFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// You can now use Firebase services (Auth, Firestore, Storage, etc.) as needed