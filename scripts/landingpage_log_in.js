let rememberBoolean;

function checkUserPasswortMatch() {
  let emailInput = document.getElementById("logInMailInput").value;
  let passwordInput = document.getElementById("logInPasswordInput").value;
  let userFound = false;

  Object.entries(unsortedUsers).forEach(([firebaseId, user]) => {
    if (user.email === emailInput && user.password === passwordInput) {
      userFound = true;
      fillLocalStorageWithRememberedUserData(firebaseId);
      fillStorageWithUserData(firebaseId)
      window.location.href = "summary.html";
    }
  });

  if (!userFound) {
    document.getElementById("loginFalseMessage").innerHTML = "Check your email and password. Please try again.";
  }
}

function fillLocalStorageWithRememberedUserData(firebaseId) {
  let loggedUserEmail = unsortedUsers[firebaseId].email;
  let loggedUserPassword = unsortedUsers[firebaseId].password;

  if (rememberBoolean) {
    localStorage.setItem("rememberedUserEmail", loggedUserEmail);
    localStorage.setItem("rememberedUserPassword", loggedUserPassword);
  }
}

function fillStorageWithUserData(firebaseId) {
  let loggedUserInitials = unsortedUsers[firebaseId].initials;
  let loggedUserFirebaseId = firebaseId;
  let loggedUserName = unsortedUsers[firebaseId].name;
  localStorage.setItem("loggedUserInitials", loggedUserInitials);
  localStorage.setItem("loggedUserFirebaseId", loggedUserFirebaseId);
  localStorage.setItem("loggedUserName", loggedUserName);
}

function deleteStorage() {
  localStorage.removeItem("loggedUserInitials");
  localStorage.removeItem("loggedUserFirebaseId");
  localStorage.removeItem("loggedUserName");
}

function fillInputsAtLoginWithRememberedUser() {
  let emailInput = document.getElementById("logInMailInput");
  let passwordInput = document.getElementById("logInPasswordInput");

  emailInput.value = localStorage.getItem("rememberedUserEmail");
  passwordInput.value = localStorage.getItem("rememberedUserPassword");
  validateLogin();
}

function validateLogin() {
  let button = document.getElementById("logInButton");
  let emailValue = document.getElementById("logInMailInput").value.trim();
  let passwordValue = document.getElementById("logInPasswordInput").value.trim();

  if (passwordValue && emailValue) {
    button.classList.add("enabled"); 
    button.style.opacity = "1"; 
    button.style.cursor = "pointer";
    button.style.pointerEvents = "auto";
  } else {
    button.classList.remove("enabled"); 
    button.style.opacity = "0.1";
    button.style.cursor = "default"; 
    button.style.pointerEvents = "none"; 
  }
}


function toggleLoginRememberMe(remember) {
  rememberBoolean = remember;
  if (remember) {
    document.getElementById("logInCheckbox").classList.add("displayNone");
    document.getElementById("logInUncheckbox").classList.remove("displayNone");
  } else {
    document.getElementById("logInUncheckbox").classList.add("displayNone");
    document.getElementById("logInCheckbox").classList.remove("displayNone");
  }
}

