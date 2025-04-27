const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

// Umschalten zur SignUp-Ansicht
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};

// Umschalten zur Login-Ansicht
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

// Umschalten, wenn der Link "Create A New" geklickt wird
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
