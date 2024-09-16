let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";
let signUpData = {};
let responseToJson;
let policyAccepted = false;
let passwordMatch = false;


async function postSignUpData() {
  console.log("test");

  let nameInput = document.getElementById("signUpNameInput").value;
  let mailInput = document.getElementById("signUpMailInput").value;
  let passwordInput = document.getElementById("signUpPasswordInput").value;
  signUpData = { name: nameInput, email: mailInput, password: passwordInput };

  await fetch(BASE_URL + `users/.json`, {
    method: "POST",
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

//functions addTask---------------------------------------------------------------------

let taskPrioInput = "";
let fullNameList = [];
let addTaskCurrentUser = "";

async function postTaskData() {

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

 
  await fetch(BASE_URL + `.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTaskData),
  });
}

function setTaskPrio(priority) {
  taskPrioInput = priority; 

if (priority == 'urgent') {
  document.getElementsByClassName('addTaskPrioButtonUrgent')[0].classList.add('addTaskPrioButtonUrgentOnClick', 'addTaskPrioButtonUrgentIcon');
  document.getElementsByClassName('addTaskPrioButtonMedium')[0].classList.remove('addTaskPrioButtonMediumOnClick', 'addTaskPrioButtonMediumIcon');
  document.getElementsByClassName('addTaskPrioButtonLow')[0].classList.remove('addTaskPrioButtonLowOnClick', 'addTaskPrioButtonLowIcon');
}

  if (priority == 'medium') {
    document.getElementsByClassName('addTaskPrioButtonMedium')[0].classList.add('addTaskPrioButtonMediumOnClick', 'addTaskPrioButtonMediumIcon');
    document.getElementsByClassName('addTaskPrioButtonUrgent')[0].classList.remove('addTaskPrioButtonUrgentOnClick', 'addTaskPrioButtonUrgentIcon');
    document.getElementsByClassName('addTaskPrioButtonLow')[0].classList.remove('addTaskPrioButtonLowOnClick', 'addTaskPrioButtonLowIcon');
  }

  if (priority == 'low') {
  document.getElementsByClassName('addTaskPrioButtonLow')[0].classList.add('addTaskPrioButtonLowOnClick', 'addTaskPrioButtonLowIcon');
  document.getElementsByClassName('addTaskPrioButtonUrgent')[0].classList.remove('addTaskPrioButtonUrgentOnClick', 'addTaskPrioButtonUrgentIcon');
  document.getElementsByClassName('addTaskPrioButtonMedium')[0].classList.remove('addTaskPrioButtonMediumOnClick', 'addTaskPrioButtonMediumIcon');
  }
}

 async function loadFullNameList() {
  try {
    let response = await fetch(BASE_URL + "users" + ".json");
    let completeUserList = await response.json();
    fullNameList = Object.keys(completeUserList); 

    let dropdown = document.getElementById('userNameDropDown');
    dropdown.innerHTML = '';

    fullNameList.forEach(name => {
      let option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      dropdown.appendChild(option);
    });


    if (addTaskCurrentUser && fullNameList.includes(addTaskCurrentUser)) {
      dropdown.value = addTaskCurrentUser;
    }


    dropdown.addEventListener('change', function() {
      addTaskCurrentUser = dropdown.value;
      console.log(`User selected: ${addTaskCurrentUser}`);
    });

  } catch (error) {
    console.error('Error loading full name list:', error);
  }
}

window.onload = loadFullNameList;





//link zu den anderen Seiten

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('summaryLink').addEventListener('click', function() {
      window.location.href = 'summary.html';
  });

  document.getElementById('boardLink').addEventListener('click', function() {
      window.location.href = 'board.html';
  });

  document.getElementById('addTaskLink').addEventListener('click', function() {
      window.location.href = 'addTask.html';
  });

  document.getElementById('contactsLink').addEventListener('click', function() {
      window.location.href = 'contacts.html';
  });
});