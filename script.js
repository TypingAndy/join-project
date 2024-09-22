let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays
let signUpData = {};
let responseToJson;
let sortedUsers = [];
let policyAccepted = false;
let passwordMatch = false;
// let userData = {};

//addTaskGlobalArrays
let taskPrioInput = "";
let fullNameList = [];
let addTaskCurrentUser = "";


function getSignUpInputData(signUpData, confirmPasswordInput) {
  let nameInput = document.getElementById("signUpNameInput");
  let mailInput = document.getElementById("signUpMailInput");
  let passwordInput = document.getElementById("signUpPasswordInput");
  confirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  signUpData = { name: nameInput.value, email: mailInput.value, password: passwordInput.value };
  return { signUpData, nameInput, mailInput, passwordInput, confirmPasswordInput };
}


async function postSignUpData() { 
  let {signUpData, confirmPasswordInput} = getSignUpInputData();

    await fetch(BASE_URL + `users/.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });

  clearSignUpInputField(nameInput, mailInput, passwordInput, confirmPasswordInput);
  allowignUpPrivacyPolicyCheck();
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


function allowignUpPrivacyPolicyCheck() {
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
  userData = { users: responseToJson };
  sortUsersByName(responseToJson);
  loadFullNameList();
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


//functions addTask---------------------------------------------------------------------

function getNewTaskInputData() {
  let taskTitleInput = document.getElementById("taskTitleInput").value;
  let taskDescriptionInput = document.getElementById("taskDescriptionInput").value;
  let taskDateInput = document.getElementById("taskDateInput").value;
 
  let createTaskData = {
    taskTitle: taskTitleInput,
    taskDescription: taskDescriptionInput,
    taskAssignedUser: addTaskCurrentUser,
    taskDate: taskDateInput,
    taskPrio: taskPrioInput
  };
  return createTaskData;
}


async function postTaskData() {

  let createTaskData = getNewTaskInputData();

   await fetch(BASE_URL + `/tasks.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTaskData),
  });


}


function setTaskPrio(priority) {
  taskPrioInput = priority;
  setTaskPrioButtonColorSwitch(priority); 
}


function setTaskPrioButtonColorSwitch (priority) {
  buttonUrgent = document.getElementsByClassName('addTaskPrioButtonUrgent')[0];
  buttonMedium = document.getElementsByClassName('addTaskPrioButtonMedium')[0];
  buttonLow = document.getElementsByClassName('addTaskPrioButtonLow')[0];

  if (priority == 'urgent') {
    buttonUrgent.classList.add('addTaskPrioButtonUrgentOnClick', 'addTaskPrioButtonUrgentIcon');
    buttonMedium.classList.remove('addTaskPrioButtonMediumOnClick', 'addTaskPrioButtonMediumIcon');
    buttonLow.classList.remove('addTaskPrioButtonLowOnClick', 'addTaskPrioButtonLowIcon');
  }

  if (priority == 'medium') {
    buttonMedium.classList.add('addTaskPrioButtonMediumOnClick', 'addTaskPrioButtonMediumIcon');
    buttonUrgent.classList.remove('addTaskPrioButtonUrgentOnClick', 'addTaskPrioButtonUrgentIcon');
    buttonLow.classList.remove('addTaskPrioButtonLowOnClick', 'addTaskPrioButtonLowIcon');
  }

  if (priority == 'low') {
    buttonLow.classList.add('addTaskPrioButtonLowOnClick', 'addTaskPrioButtonLowIcon');
    buttonUrgent.classList.remove('addTaskPrioButtonUrgentOnClick', 'addTaskPrioButtonUrgentIcon');
    buttonMedium.classList.remove('addTaskPrioButtonMediumOnClick', 'addTaskPrioButtonMediumIcon');
    }
}



function loadFullNameList() {
  let dropdown = document.getElementById("userNameDropDown");
  dropdown.innerHTML = "";

  for (let i = 0; i < sortedUsers.length; i++) {
    dropdown.innerHTML += /*html*/ `
    <div class="addTaskDropDownSingleUserContainer">
      <div>${sortedUsers[i].name}</div>
      <img src="images/mobile/addTaskMobile/checkButtonMobile.png" alt="">
    </div>`
  }
}


function addTaskOpenUserDropDown() {
  document.getElementById("userNameDropDown").classList.toggle("show");
  document.getElementById("userNameDropDown").classList.toggle("displayNone");
  document.getElementById("words").classList.toggle("displayNone");
  
}


//links to other pages

document.addEventListener('DOMContentLoaded', function() {
  let linkButtonDirectionString = ['summary', 'board', 'addTask', 'contacts'];
  for (let i = 0; i < linkButtonDirectionString.length; i++) {
    document.getElementById(linkButtonDirectionString[i] + 'Link').addEventListener('click', function() {
         window.location.href = linkButtonDirectionString[i] + '.html';
    });
  }
});