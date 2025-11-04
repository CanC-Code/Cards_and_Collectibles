// js/main.js

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// === Firebase Config ===
// For GitHub Pages, the API key is exposed in JS
// Make sure it is restricted in Firebase to your domain and needed APIs only
const firebaseConfig = {
  apiKey: "AIzaSyBn0lIS4b2RcEFguiMeXQEIs4HbW1pyhD4", // restricted key
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

// Firebase services can now be used safely within your site