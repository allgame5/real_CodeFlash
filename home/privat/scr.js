// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPaCoQok9rzOQ5VdpS6RZhQhrCQfo8fFs",
  authDomain: "anmeldung-privat.firebaseapp.com",
  projectId: "anmeldung-privat",
  storageBucket: "anmeldung-privat.firebasestorage.app",
  messagingSenderId: "872288544833",
  appId: "1:872288544833:web:575a27c01c16f5dba03ec0",
  measurementId: "G-104ZMHXX4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
