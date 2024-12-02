let rememberBoolean;

/**
 * Checks if the entered email and password match the stored user data.
 * If a user is found:
 * - Fills local storage with user data.
 * - Redirects the user to the "summary.html" page.
 * If no user is found:
 * - Displays an error message in the login form.
 */
function checkUserPasswortMatch() {
  let emailInput = document.getElementById("logInMailInput").value;
  let passwordInput = document.getElementById("logInPasswordInput").value;
  let userFound = false;

  Object.entries(unsortedUsers).forEach(([firebaseId, user]) => {
    if (user.email === emailInput && user.password === passwordInput) {
      userFound = true;
      fillLocalStorageWithRememberedUserData(firebaseId);
      fillStorageWithUserData(firebaseId);
      window.location.href = "summary.html";
    }
  });

  if (!userFound) {
    document.getElementById("loginFalseMessage").innerHTML = "Check your email and password. Please try again.";
  }
}

/**
 * Stores user data in local storage if "Remember Me" is checked.
 * @param {string} firebaseId - The Firebase ID of the user.
 */
function fillLocalStorageWithRememberedUserData(firebaseId) {
  let loggedUserEmail = unsortedUsers[firebaseId].email;
  let loggedUserPassword = unsortedUsers[firebaseId].password;

  if (rememberBoolean) {
    localStorage.setItem("rememberedUserEmail", loggedUserEmail);
    localStorage.setItem("rememberedUserPassword", loggedUserPassword);
  }
}

/**
 * Stores current user data (initials, Firebase ID, name) in local storage.
 * @param {string} firebaseId - The Firebase ID of the user.
 */
function fillStorageWithUserData(firebaseId) {
  let loggedUserInitials = unsortedUsers[firebaseId].initials;
  let loggedUserFirebaseId = firebaseId;
  let loggedUserName = unsortedUsers[firebaseId].name;
  localStorage.setItem("loggedUserInitials", loggedUserInitials);
  localStorage.setItem("loggedUserFirebaseId", loggedUserFirebaseId);
  localStorage.setItem("loggedUserName", loggedUserName);
}

/**
 * Removes user data from local storage.
 */
function deleteStorage() {
  localStorage.removeItem("loggedUserInitials");
  localStorage.removeItem("loggedUserFirebaseId");
  localStorage.removeItem("loggedUserName");
}

/**
 * Fills the login input fields with stored user data (if "Remember Me" was checked).
 * Then validates the login inputs.
 */
function fillInputsAtLoginWithRememberedUser() {
  let emailInput = document.getElementById("logInMailInput");
  let passwordInput = document.getElementById("logInPasswordInput");

  emailInput.value = localStorage.getItem("rememberedUserEmail");
  passwordInput.value = localStorage.getItem("rememberedUserPassword");
  validateLogin();
}

/**
 * Validates the login input fields:
 * - Enables the login button if the inputs are valid.
 * - Disables the login button if the inputs are invalid.
 */
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

/**
 * Activates or deactivates the "Remember Me" feature:
 * - Changes the appearance of the checkbox icon based on its status.
 * @param {boolean} remember - Indicates whether the "Remember Me" option is activated or deactivated.
 */
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
