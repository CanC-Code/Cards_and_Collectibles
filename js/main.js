import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// App Check (replace YOUR_RECAPTCHA_SITE_KEY)
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
  isTokenAutoRefreshEnabled: true
});

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("site-nav");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-visible");
    });
  }
});
