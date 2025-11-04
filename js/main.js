// js/main.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// App Check (optional but recommended)
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'), // replace with your reCAPTCHA key
  isTokenAutoRefreshEnabled: true
});