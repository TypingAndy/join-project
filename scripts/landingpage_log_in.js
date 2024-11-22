let rememberBoolean;

function checkUserPasswortMatch() {
  let emailInput = document.getElementById("logInMailInput").value;
  let passwordInput = document.getElementById("logInPasswordInput").value;
  let userFound = false;

  Object.entries(unsortedUsers).forEach(([id, user]) => {
    if (user.email === emailInput && user.password === passwordInput) {
      userFound = true;
      let loggedUserInitials = unsortedUsers[id].initials;
      fillLocalStorageWithRememberedUserData(id)
      localStorage.setItem("loggedUserInitials", loggedUserInitials);
      window.location.href = "summary.html";
    }
  });

  if (!userFound) {
    document.getElementById("loginFalseMessage").innerHTML = "Check your email and password. Please try again.";
  }
}

function fillLocalStorageWithRememberedUserData(id) {
  let loggedUserName = unsortedUsers[id].name;
  let loggedUserPassword = unsortedUsers[id].password;

  if (rememberBoolean) {
    localStorage.setItem("rememberedUserName", loggedUserName);
    localStorage.setItem("rememberedUserPassword", loggedUserPassword);
  }
}

function fillInputsAtLoginWithRememberedUser() {
  let emailInput = document.getElementById("logInMailInput");
  let passwordInput = document.getElementById("logInPasswordInput");

  emailInput.value = localStorage.getItem("rememberedUserName");
  passwordInput.value = localStorage.getItem("rememberedUserPassword");
}

function validateLogin() {
  let button = document.getElementById("logInButton");
  let emailValue = document.getElementById("logInMailInput").value.trim();
  let passwordValue = document.getElementById("logInPasswordInput").value.trim();

  if (passwordValue && emailValue) {
    button.style.cursor = "pointer";
    button.style.opacity = "1";
    button.disabled = false;
  } else {
    button.style.opacity = "0.1";
    button.disabled = true;
    button.style.cursor = "default";
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
