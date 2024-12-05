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
 * Validates the sign-up form and enables/disables the sign-up button.
 */
function validateSignUp() {
  const button = document.getElementById("signUpButton");
  const isValid = policyAccepted && passwordMatch && document.getElementById("signUpNameInput").value.trim() && document.getElementById("signUpMailInput").value.trim();

  button.classList[isValid ? "add" : "remove"]("enabled");
  button.style.opacity = isValid ? "1" : "0.1";
  button.style.pointerEvents = isValid ? "auto" : "none";
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
  const popup = document.querySelector(".signUpSuccessfulPopup");
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
