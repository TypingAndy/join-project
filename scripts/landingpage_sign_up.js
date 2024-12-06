/**
 * Clears the input fields of the sign-up form.
 */
function clearSignUpInputField() {
  let nameInput = document.getElementById("signUpNameInput");
  let mailInput = document.getElementById("signUpMailInput");
  let passwordInput = document.getElementById("signUpPasswordInput");
  let confirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  nameInput.value = "";
  mailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
}

/**
 * Checks if the privacy policy has been accepted and validates the sign-up form.
 */
function clickAcceptPolicy() {
  acceptPrivacyPolicyCheck();
  validateSignUp();
}

/**
 * Show or hide message if name is invalid.
 */

function toggleNameError() {
  let nameInput = document.getElementById("signUpNameInput").value;
  let errorMessage = document.getElementById("nameInputErrorText");

  if (nameInput) {
    errorMessage.classList.add("displayNone");
  } else {
    errorMessage.classList.remove("displayNone");
  }
}

/**
 * Show or hide message if email is invalid.
 */
function toggleEmailError() {
  let emailErrorElement = document.getElementById("emailInputWrong");

  if (isEmailValid()) {
    emailErrorElement.classList.add("displayNone");
  } else {
    emailErrorElement.classList.remove("displayNone");
  }
}

/**
 * Validates the sign-up form and enables/disables the sign-up button.
 */
// Funktion zur E-Mail-Validierung
function isEmailValid() {
  let email = document.getElementById("signUpMailInput").value;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Funktion, die die Gesamtvalidität prüft
function isFormValid() {
  let nameInput = document.getElementById("signUpNameInput").value.trim();
  let mailInput = document.getElementById("signUpMailInput").value.trim();

  return (
    policyAccepted && passwordMatch && nameInput && isEmailValid(mailInput) // E-Mail-Überprüfung wird hier aufgerufen
  );
}

// Hauptfunktion zum Aktivieren/Deaktivieren des Buttons
function validateSignUp() {
  let button = document.getElementById("signUpButton");
  let isValid = isFormValid(); // Gesamtvalidität prüfen

  // Button-Status basierend auf Validität setzen
  button.classList[isValid ? "add" : "remove"]("enabled");
  button.style.opacity = isValid ? "1" : "0.1";
  button.style.pointerEvents = isValid ? "auto" : "none";

  // onclick-Attribut verwalten
  isValid ? button.setAttribute("onclick", "handleSignUpClick()") : button.removeAttribute("onclick");
}

/**
 * Checks if the entered passwords match and changes the border color on errors.
 */
function checkMatchingPasswords() {
  let passwordValue = document.getElementById("signUpPasswordInput").value;
  let confirmPassword = document.getElementById("signUpConfirmPasswordInput").value;
  passwordMatch = passwordValue === confirmPassword;
  if (!passwordMatch && confirmPassword !== "") {
    document.getElementById("signUpConfirmPasswordInput").style.border = "solid #FF8190 1px";
    document.getElementById("passwordDontMatchText").classList.remove("displayNone");
  } else {
    document.getElementById("signUpConfirmPasswordInput").style.border = "solid #d1d1d1 1px";
    document.getElementById("passwordDontMatchText").classList.add("displayNone");
  }
}

/**
 * Checks and updates the status of the privacy policy acceptance.
 */
function acceptPrivacyPolicyCheck() {
  policyAccepted = !policyAccepted;
  let img = document.getElementById("checkbox");
  if (!policyAccepted) {
    img.src = "../images/icons/unchecked.png";
  } else {
    img.src = "../images/icons/checked.png";
  }
}

/**
 * Handles the click on the sign-up button:
 * - Sends user data to Firebase.
 * - Updates the privacy policy status.
 * - Clears the input fields.
 * - Displays a confirmation popup.
 */
function handleSignUpClick() {
  postUserDataToFirebase("user");
  acceptPrivacyPolicyCheck();
  clearSignUpInputField();
  showPopup();
  returnToLogin();
}

/**
 * Displays a popup upon successful registration after a short time.
 */
function showPopup() {
  let popup = document.querySelector(".signUpSuccessfulPopup");
  popup.classList.add("active");

  setTimeout(() => {
    popup.classList.remove("active");
  }, 1500);
}

/**
 * Redirects to the login page after a short time.
 */
function returnToLogin() {
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1500);
}
