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

function clickAcceptPolicy() {
  acceptPrivacyPolicyCheck();
  validateSignUp();
}

function validateSignUp() {
  let button = document.getElementById("signUpButton");
  let nameValue = document.getElementById("signUpNameInput").value.trim();
  let emailValue = document.getElementById("signUpMailInput").value.trim();

  if (policyAccepted && passwordMatch && nameValue && emailValue) {
    button.classList.add("enabled");
    button.style.opacity = "1";
    button.setAttribute("onclick", "handleSignUpClick()");
    button.style.pointerEvents = "auto";
  } else {
    button.classList.remove("enabled"); 
    button.style.opacity = "0.1";
    button.removeAttribute("onclick");
    button.style.pointerEvents = "none";
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

function handleSignUpClick() {
  postUserDataToFirebase("user");
  acceptPrivacyPolicyCheck();
  clearSignUpInputField();
  showPopup();
}

function showPopup() {
  const popup = document.querySelector(".signUpSuccessfulPopup");
  popup.classList.add("active");

  setTimeout(() => {
    popup.classList.remove("active");
    window.location.href = "./landingpage_login.html";
  }, 1500);
}
