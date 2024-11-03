function getSignUpInputData(signUpData, confirmPasswordInput) {
  let nameInput = document.getElementById("signUpNameInput");
  let mailInput = document.getElementById("signUpMailInput");
  let passwordInput = document.getElementById("signUpPasswordInput");
  let userColor = signUpAddColorToUser();
  confirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  signUpData = { name: nameInput.value, email: mailInput.value, password: passwordInput.value, color: userColor };
  return { signUpData, nameInput, mailInput, passwordInput, confirmPasswordInput };
}

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

function validateSignUp() {
  let button = document.getElementById("signUpButton");
  let nameValue = document.getElementById("signUpNameInput").value.trim();
  let emailValue = document.getElementById("signUpMailInput").value.trim();
  if (policyAccepted && passwordMatch && nameValue && emailValue) {
    button.style.opacity = "1";
    button.disabled = false;
  } else {
    button.style.opacity = "0.1";
    button.disabled = true;
  }
}

function checkMatchingPasswords() {
  let passwordValue = document.getElementById("signUpPasswordInput").value;
  let confirmPassword = document.getElementById("signUpConfirmPasswordInput").value;

  passwordMatch = passwordValue === confirmPassword;

  if (!passwordMatch && confirmPassword !== "") {
    document.getElementById("signUpConfirmPasswordInput").style.border = "solid #ff2727 1px";
  } else {
    document.getElementById("signUpConfirmPasswordInput").style.border = "solid #d1d1d1 1px";
  }
}

function acceptPrivacyPolicyCheck() {
  policyAccepted = !policyAccepted;
  let img = document.getElementById("checkbox");
  if (!policyAccepted) {
    img.src = "../images/icons/unchecked.png";
  } else {
    img.src = "../images/icons/checked.png";
  }
}
