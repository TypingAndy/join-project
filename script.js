let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";
let signUpData = {};
let responseToJson;
let policyAccepted = false;
let passwordMatch = false;

async function postData() {
  console.log("test");

  let nameInput = document.getElementById("signUpNameInput").value;
  let mailInput = document.getElementById("signUpMailInput").value;
  let passwordInput = document.getElementById("signUpPasswordInput").value;
  signUpData = { name: nameInput, email: mailInput, password: passwordInput };

  await fetch(BASE_URL + `users/${nameInput}/.json`, {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });

  document.getElementById("signUpNameInput").value = "";
  document.getElementById("signUpMailInput").value = "";
  document.getElementById("signUpPasswordInput").value = "";
  document.getElementById("signUpConfirmPasswordInput").value = "";
  clickPolicy();
  loadData();
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

function clickPolicy() {
  policyAccepted = !policyAccepted;
  let img = document.getElementById("checkbox");
  if (!policyAccepted) {
    img.src = "images/mobile/signUpPage/checkButtonBlack.png";
  } else {
    img.src = "./images/icons/checked.png";
  }
  validateSignUp();
}

async function loadData(path = "users") {
  let response = await fetch(BASE_URL + path + ".json");
  responseToJson = await response.json();
  console.log(responseToJson);

  if (!responseToJson) {
    return;
  } else {
    Object.entries(responseToJson).forEach(([key, user]) => {
      console.log(user.name, user.email, user.password);

      //   dataOutputWrapper.innerHTML += `
      //   <div class="data">
      //     <div class="name">${user.name}</div>
      //     <div class="email">${user.email}</div>
      //     <div class="delete" onclick="deleteUser('${key}')">X</div>
      //   </div>
      // `;
    });
  }
}

// function deleteUser(userId) {
//   fetch(BASE_URL + `users/${userId}.json`, {
//     method: "DELETE",
//   }).then(() => loadData());
// }
