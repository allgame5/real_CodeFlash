// Firebase initialisieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQGtRc6ku9YxIEhezn31GBJmvNaHvblQk",
  authDomain: "virtutrust-7a88a.firebaseapp.com",
  projectId: "virtutrust-7a88a",
  storageBucket: "virtutrust-7a88a.firebasestorage.app",
  messagingSenderId: "166266778192",
  appId: "1:166266778192:web:c66e91fafdd69ba50f5755",
  measurementId: "G-JG2QBY1SZ5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Funktion zur Prüfung des Authentifizierungsstatus mit Verzögerung für mobile Geräte
export function checkAuth() {
  function handleAuthStateChange() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "index.html"; // Umleitung zur Anmeldeseite
      }
    });
  }

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    setInterval(handleAuthStateChange, 200000); // Alle 20 Sekunden für Mobilgeräte
  } else {
    handleAuthStateChange(); // Sofort für andere Geräte
  }
}

// Prüft, ob der Benutzer eingeloggt ist und schützt die Seite
checkAuth();

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      window.alert("Success! Account created.");
    })
    .catch((error) => {
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "dashboard.html";
      localStorage.setItem('loggedIn', 'true');
    })
    .catch(() => {
      window.alert("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});
