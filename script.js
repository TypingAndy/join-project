let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays
let signUpData = {};
let responseToJson;
let sortedUsers = [];
let allUserInitials = [];
let allUserColors = [];
let userColorsPreset = ['#FF7A00', '#FF5EB3','#6E52FF','#9327FF','#00BEE8','#1FD7C1','#FF745E','#FFA35E','#FC71FF','#FFC701','#0038FF','#C3FF2B','#FFE62B','#FF4646','#FFBB2B'];

let policyAccepted = false;
let passwordMatch = false;
// let userData = {};

//addTaskGlobalArrays
let taskPrioInput = "";
let fullNameList = [];
let addTaskCurrentUser = [];
let categories = ['Cleaning', 'Company Outing', 'Cooking', 'Meetings', 'Others', 'Technical Task', 'User Story'];
let subtasks = [];

//boardGlobalArrays
let convertedTasks = [];
let allUnsortedTasks = [];
let toDoTasks = [];
let doneTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];


function getSignUpInputData(signUpData, confirmPasswordInput) {
  let nameInput = document.getElementById("signUpNameInput");
  let mailInput = document.getElementById("signUpMailInput");
  let passwordInput = document.getElementById("signUpPasswordInput");
  confirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  signUpData = { name: nameInput.value, email: mailInput.value, password: passwordInput.value };
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
  // userData = { users: responseToJson };
  sortUsersByName(responseToJson);
  createUserInitials();
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

//functions Board

async function loadAllTasks(path = "tasks") {
  let response = await fetch(BASE_URL + path + ".json");
  console.log(response);
  
  allUnsortedTasks = await response.json();
  console.log(allUnsortedTasks);
  convertUnsortedTasksToArray();



  sortAllTasks();
  renderTasks();
}

function sortAllTasks() {
  toDoTasks = convertedTasks.filter(t => t.taskStatus == 'to do');
  doneTasks = convertedTasks.filter(t => t.taskStatus == 'done');
  inProgressTasks = convertedTasks.filter(t => t.taskStatus == 'work in progress');
  awaitFeedbackTasks = convertedTasks.filter(t => t.taskStatus == 'await feedback');
  console.log(toDoTasks);
  
}



async function convertUnsortedTasksToArray() {

    convertedTasks = Object.values(allUnsortedTasks);
    console.log(convertedTasks);

}


function renderTasks() {
  let inProgressElement = document.getElementById('inProgressContentWrapper');
  let toDoElement = document.getElementById('inProgressContentWrapper');
  let awaitFeedbackElement = document.getElementById('inProgressContentWrapper');
  let doneElement = document.getElementById('inProgressContentWrapper');

  inProgressElement.innerHTML = "";
  toDoElement.innerHTML = "";
  awaitFeedbackElement.innerHTML = "";
  doneElement.innerHTML = "";

  for (let i = 0; i < toDoTasks.length; i++) {
    inProgressElement.innerHTML += /*html*/ `
                  <div class="taskCard">
                <div class="taskCardCategory">
                  <p>User Story</p>
                </div>
                <p class="taskCardTitle">Kochwelt Page & Recipe Recommender</p>
                <p class="taskCardDescription">Build start page with recipe recommendation...</p>
                <div class="taskCardSubtasksContainer">
                  <div class="taskCardSubtaskBarWrapper">
                    <div class="taskCardSubtaskBar"></div>
                  </div>
                  <p>1/2 Subtasks</p>
                </div>
                <div class="taskCardBottomContainer">
                  <div class="taskCardUserContainer">
                    <div class="taskCardUser"><p>AB</p></div>
                    <div class="taskCardUser"><p>AB</p></div>
                    <div class="taskCardUser"><p>AB</p></div>
                  </div>
                  <img src="./images/icons/prio_high_icon.png" alt="" />
                </div>
              </div>
    `
    
  }
  
}

// async function filterUnsortedTask() {
//   for (let i = 0; i < convertedTasks.length; i++) {
//     convertedTasks[i].taskStatus.filter(task => {
//     return task.status === 'to do'; 
//     });
//   }
// };

  // const gefilterteAufgaben = convertedTasks.filter(task => {
  //   // Bedingung, die du zum Filtern verwenden möchtest
  //   return task.status === 'unsorted'; // Beispielbedingung
  // });

//   // Mach etwas mit den gefilterten Aufgaben
//   console.log(gefilterteAufgaben);
// }

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
    taskPrio: taskPrioInput,
    taskStatus: 'to do'
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

function setTaskPrioButtonColorSwitch(priority) {
  buttonUrgent = document.getElementsByClassName("addTaskPrioButtonUrgent")[0];
  buttonMedium = document.getElementsByClassName("addTaskPrioButtonMedium")[0];
  buttonLow = document.getElementsByClassName("addTaskPrioButtonLow")[0];

  if (priority == "urgent") {
    buttonUrgent.classList.add("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
    buttonMedium.classList.remove("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
    buttonLow.classList.remove("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
  }

  if (priority == "medium") {
    buttonMedium.classList.add("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
    buttonUrgent.classList.remove("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
    buttonLow.classList.remove("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
  }

  if (priority == "low") {
    buttonLow.classList.add("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
    buttonUrgent.classList.remove("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
    buttonMedium.classList.remove("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
  }
}

function loadFullNameList() {
  let dropdown = document.getElementById("userNameDropDown");
  dropdown.innerHTML = "";

  for (let i = 0; i < sortedUsers.length; i++) {
    dropdown.innerHTML += /*html*/ `
    <div onclick="addUserToTask('${sortedUsers[i].name}', ${i})" class="addTaskDropDownSingleUserContainer">
      <div class="addTaskAllUserInitials">${allUserInitials[i]}</div>
      <div class="addTaskAddUserNameAndInitials">
        <div>${sortedUsers[i].name}</div>
      
      </div>
      <img id="noCheck${i}" src="images/mobile/addTaskMobile/checkButtonMobile.png" alt="">
      <img id="check${i}" class="addTaskButtonCheckImage displayNone" src="images/mobile/addTaskMobile/buttonChecked.png" alt="">
    </div>`;
  }
}

function addUserToTask(name, i) {
  if (!addTaskCurrentUser.includes(name)) {
    addTaskCurrentUser.push(name);
  } else {
    let i = addTaskCurrentUser.indexOf(name);
    if (i > -1) {
      addTaskCurrentUser.splice(i, 1);
    }
  }

  console.log(addTaskCurrentUser);

  document.getElementById(`noCheck${i}`).classList.toggle("displayNone");
  document.getElementById(`check${i}`).classList.toggle("displayNone");
}

function addTaskOpenUserDropDown() {
  document.getElementById("userNameDropDown").classList.toggle("show");
  document.getElementById("userNameDropDown").classList.toggle("displayNone");
  document.getElementById("addTaskAssignContactsButton").classList.toggle("displayNone");
  document.getElementById("dropDownSearchCloseButtonBox").classList.toggle("displayNone");
}

function stopPropagation(event) {
  event.stopPropagation();
}

function createUserInitials() {
  for (let i = 0; i < sortedUsers.length; i++) {
    let fullName = sortedUsers[i].name;
    let nameParts = fullName.split(" ");

    let initials = nameParts.map((part) => part.charAt(0)).join("");
    allUserInitials.push(initials);
  }
}


function addTaskChooseCategoryDropdown() {

  let categoryDropdown = document.getElementById("categoryListDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
   categoryDropdown += `${categories[i]}`
    
  }
  console.log(categoryDropdown);
}



function addTaskAddSubtask() {

}

//links to other pages

document.addEventListener("DOMContentLoaded", function () {
  let linkButtonDirectionString = ["summary", "board", "addTask", "contacts"];
  for (let i = 0; i < linkButtonDirectionString.length; i++) {
    document.getElementById(linkButtonDirectionString[i] + "Link").addEventListener("click", function () {
      window.location.href = linkButtonDirectionString[i] + ".html";
    });
  }
});


