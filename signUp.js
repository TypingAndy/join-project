function getSignUpInputData(signUpData, confirmPasswordInput) {
    let nameInput = document.getElementById("signUpNameInput");
    let mailInput = document.getElementById("signUpMailInput");
    let passwordInput = document.getElementById("signUpPasswordInput");
    let userColor = signUpAddColorToUser();
    confirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
    signUpData = { name: nameInput.value, email: mailInput.value, password: passwordInput.value, color: userColor };
    return { signUpData, nameInput, mailInput, passwordInput, confirmPasswordInput };
  }
  
  async function postSignUpData() {
    let { signUpData, confirmPasswordInput } = getSignUpInputData();
    await fetch(BASE_URL + `users/.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    clearSignUpInputField(nameInput, mailInput, passwordInput, confirmPasswordInput);
    acceptPrivacyPolicyCheck();
    loadUserData();
  }
  
  function clearSignUpInputField(nameInput, mailInput, passwordInput, confirmPasswordInput) {
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
    validateSignUp();
  }
  
  function acceptPrivacyPolicyCheck() {
    policyAccepted = !policyAccepted;
    let img = document.getElementById("checkbox");
    if (!policyAccepted) {
      img.src = "images/mobile/signUpPage/checkButtonBlack.png";
    } else {
      img.src = "./images/icons/checked.png";
    }
    validateSignUp();
  }
  
  async function loadUserData(path = "users") {
    let response = await fetch(BASE_URL + path + ".json");
    responseToJson = await response.json();
    sortUsersByName(responseToJson);
    createUserInitials();
    loadFullNameList();
    addTaskRenderCategoryDropdown();
  }
  
  function sortUsersByName(userData) {
    let usersArray = [];
    for (let id in userData) {
      usersArray.push({ id: id, ...userData[id] });
    }
    sortedUsers = usersArray.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
  