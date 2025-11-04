# CCVO Hub

**Cards and Collectibles ? Cards, Collectibles, Videogames, and Oddities**

A Firebase-connected web app to manage collections, reviews, and local finds.

## Folder Structure

// main.js ? CCVO Core Script
// Firebase initialization, authentication, email verification, password reset

// === Firebase SDK Imports ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// === Firebase Config ===
const firebaseConfig = {
  apiKey: "AIzaSyDILbJo-na0NVz1KP0jJ_O0c5zmDSxiCTs",
  authDomain: "ccvo-4d07b.firebaseapp.com",
  projectId: "ccvo-4d07b",
  storageBucket: "ccvo-4d07b.firebasestorage.app",
  messagingSenderId: "603353158417",
  appId: "1:603353158417:web:29abb374cc55c93dc0f2b0",
  measurementId: "G-GH5FVJ3WCX"
};

// === Initialize Firebase ===
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// === Utility: Modal Creation ===
function createModal(contentHTML) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  overlay.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      ${contentHTML}
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add("visible"), 50);

  overlay.querySelector(".close-modal").addEventListener("click", () => {
    overlay.classList.remove("visible");
    setTimeout(() => overlay.remove(), 300);
  });

  return overlay;
}

// === Helper for showing feedback ===
function showMessage(modal, text, isError = false) {
  let msg = modal.querySelector(".msg");
  if (!msg) {
    msg = document.createElement("p");
    msg.classList.add("msg");
    modal.querySelector(".modal-content").appendChild(msg);
  }
  msg.textContent = text;
  msg.style.color = isError ? "#c33" : "#090";
  msg.style.fontWeight = "600";
}

// === Login Modal ===
function showLoginModal() {
  const modal = createModal(`
    <h2>Login to CCVO</h2>
    <input type="email" id="login-email" placeholder="Email" required>
    <input type="password" id="login-password" placeholder="Password" required>
    <button id="email-login">Login</button>
    <button id="google-login" class="google-btn">Login with Google</button>
    <a href="#" id="forgot-password" class="small-link">Forgot Password?</a>
    <p>Don?t have an account? <a id="switch-to-signup" href="#">Sign up</a></p>
  `);

  modal.querySelector("#email-login").addEventListener("click", () => handleEmailLogin(modal));
  modal.querySelector("#google-login").addEventListener("click", () => handleGoogleLogin(modal));
  modal.querySelector("#forgot-password").addEventListener("click", (e) => {
    e.preventDefault();
    modal.remove();
    showResetModal();
  });
  modal.querySelector("#switch-to-signup").addEventListener("click", (e) => {
    e.preventDefault();
    modal.remove();
    showSignupModal();
  });
}

// === Signup Modal ===
function showSignupModal() {
  const modal = createModal(`
    <h2>Create Your Account</h2>
    <input type="email" id="signup-email" placeholder="Email" required>
    <input type="password" id="signup-password" placeholder="Password (min 6 chars)" required>
    <button id="email-signup">Sign Up</button>
    <button id="google-signup" class="google-btn">Sign Up with Google</button>
    <p>Already have an account? <a id="switch-to-login" href="#">Login</a></p>
  `);

  modal.querySelector("#email-signup").addEventListener("click", () => handleEmailSignup(modal));
  modal.querySelector("#google-signup").addEventListener("click", () => handleGoogleLogin(modal));
  modal.querySelector("#switch-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    modal.remove();
    showLoginModal();
  });
}

// === Password Reset Modal ===
function showResetModal() {
  const modal = createModal(`
    <h2>Reset Your Password</h2>
    <input type="email" id="reset-email" placeholder="Enter your email" required>
    <button id="reset-btn">Send Reset Link</button>
    <p><a href="#" id="back-login">Back to Login</a></p>
  `);

  modal.querySelector("#reset-btn").addEventListener("click", async () => {
    const email = document.getElementById("reset-email").value.trim();
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage(modal, "Password reset email sent!", false);
    } catch (err) {
      showMessage(modal, err.message, true);
    }
  });

  modal.querySelector("#back-login").addEventListener("click", (e) => {
    e.preventDefault();
    modal.remove();
    showLoginModal();
  });
}

// === Auth Handlers ===
async function handleEmailLogin(modal) {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (!result.user.emailVerified) {
      await signOut(auth);
      showMessage(modal, "Please verify your email before logging in.", true);
      return;
    }
    showMessage(modal, "Welcome back!", false);
    setTimeout(() => modal.remove(), 1000);
  } catch (err) {
    showMessage(modal, err.message, true);
  }
}

async function handleEmailSignup(modal) {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(result.user);
    showMessage(modal, "Account created! Check your email for verification.", false);
  } catch (err) {
    showMessage(modal, err.message, true);
  }
}

async function handleGoogleLogin(modal) {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user.emailVerified || result.user.providerData[0].providerId === "google.com") {
      showMessage(modal, "Signed in with Google!", false);
      setTimeout(() => modal.remove(), 1000);
    } else {
      showMessage(modal, "Email not verified.", true);
      await signOut(auth);
    }
  } catch (err) {
    showMessage(modal, err.message, true);
  }
}

async function handleLogout() {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (err) {
    alert("Logout error: " + err.message);
  }
}

// === Navbar Management ===
const nav = document.querySelector("nav");

function updateNavbar(user) {
  nav.innerHTML = `
    <a href="index.html">Home</a>
    <a href="checklist.html">Checklist</a>
    <a href="reviews.html">Reviews</a>
    <a href="local-products.html">Local Products</a>
    ${user ? `
      <span class="user-info">Hello, ${user.email}</span>
      <button id="logout-btn" class="auth-btn">Logout</button>
    ` : `
      <button id="login-btn" class="auth-btn">Login</button>
      <button id="signup-btn" class="auth-btn">Sign Up</button>
    `}
  `;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", handleLogout);
  } else {
    document.getElementById("login-btn").addEventListener("click", showLoginModal);
    document.getElementById("signup-btn").addEventListener("click", showSignupModal);
  }
}

// === Auth State Listener ===
onAuthStateChanged(auth, (user) => {
  updateNavbar(user && user.emailVerified ? user : null);
  console.log(user ? `Logged in: ${user.email}` : "No active session");
});

console.log("? Firebase Auth + Verification + Reset loaded successfully");
