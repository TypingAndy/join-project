let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays
let signUpData = {};
let responseToJson;
let sortedUsers = [];
let allUserInitials = [];
let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
let userColors = [];
let policyAccepted = false;
let passwordMatch = false;
let chosenCategory = "";

//addTaskGlobalArrays
let taskPrioInput = "";
let fullNameList = [];
let addTaskCurrentUser = [];
let categories = ["Cleaning", "Company Outing", "Cooking", "Meetings", "Others", "Technical Task", "User Story"];
let subtasks = ["Cooking", "Cleaning", "Ironing"];

//boardGlobalArrays
let convertedTasks = [];
let allUnsortedTasks = [];
let toDoTasks = [];
let doneTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];

//often Used funtions

function stopPropagation(event) {
  event.stopPropagation();
}

//sign up data

function getSignUpInputData(signUpData, confirmPasswordInput) {
  let nameInput = document.getElementById("signUpNameInput");
  let mailInput = document.getElementById("signUpMailInput");
  let passwordInput = document.getElementById("signUpPasswordInput");
  let userColor = signUpAddColorToUser();
  confirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  signUpData = { name: nameInput.value, email: mailInput.value, password: passwordInput.value, color: userColor };
  return { signUpData, nameInput, mailInput, passwordInput, confirmPasswordInput };
}

function signUpAddColorToUser() {
  let randomNumber = Math.floor(Math.random() * 15);
  let userColor = userColorsPreset[randomNumber];
  return userColor;
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
  toDoTasks = convertedTasks.filter((t) => t.taskStatus == "to do");
  doneTasks = convertedTasks.filter((t) => t.taskStatus == "done");
  inProgressTasks = convertedTasks.filter((t) => t.taskStatus == "work in progress");
  awaitFeedbackTasks = convertedTasks.filter((t) => t.taskStatus == "await feedback");
  console.log(toDoTasks);
}

async function convertUnsortedTasksToArray() {
  convertedTasks = Object.values(allUnsortedTasks);
  console.log(convertedTasks);
}

function renderTasks() {
  let inProgressElement = document.getElementById("inProgressContentWrapper");
  let toDoElement = document.getElementById("inProgressContentWrapper");
  let awaitFeedbackElement = document.getElementById("inProgressContentWrapper");
  let doneElement = document.getElementById("inProgressContentWrapper");

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
    `;
  }
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
    taskPrio: taskPrioInput,
    taskStatus: "to do",
    taskCategory: chosenCategory,
    taskSubtasks: subtasks,
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

function addTaskGetColorFromUser(i) {
  return sortedUsers[i].color;
}

function loadFullNameList() {
  let dropdown = document.getElementById("userNameDropDown");
  dropdown.innerHTML = "";

  for (let i = 0; i < sortedUsers.length; i++) {
    let currentColor = addTaskGetColorFromUser(i);
    dropdown.innerHTML += /*html*/ `
    <div id="addTaskAssignUserId${i}" onclick="addUserToTask('${sortedUsers[i].name}', ${i})" class="addTaskDropDownSingleUserContainer">
      <div class="addTaskAllUserInitials" style="background-color: ${currentColor};">${allUserInitials[i]}</div>
      <div class="addTaskAddUserNameAndInitials">
        <div>${sortedUsers[i].name}</div>
      
      </div>
      <img id="noCheck${i}" src="images/mobile/addTaskMobile/checkButtonMobile.png" alt="">
      <img id="check${i}" class="addTaskButtonCheckImage displayNone" src="images/mobile/addTaskMobile/buttonChecked.png" alt="">
    </div>`;
  }
}

function addUserToTask(name, i) {
  let inputField = document.getElementById("addTaskContactsSearchArea");
  inputField.focus();

  if (!addTaskCurrentUser.includes(name)) {
    addTaskCurrentUser.push(name);

    document.getElementById(`check${i}`).classList.remove("displayNone");
    document.getElementById(`noCheck${i}`).classList.add("displayNone");
    document.getElementById(`addTaskAssignUserId${i}`).classList.add("addTaskNewBackgroundChecked");
  } else {
    let userIndex = addTaskCurrentUser.indexOf(name);
    if (userIndex > -1) {
      addTaskCurrentUser.splice(userIndex, 1);

      document.getElementById(`check${i}`).classList.add("displayNone");
      document.getElementById(`noCheck${i}`).classList.remove("displayNone");
      document.getElementById(`addTaskAssignUserId${i}`).classList.remove("addTaskNewBackgroundChecked");
    }
  }
}

function addTaskOpenUserDropDown() {
  let userNameDropDown = document.getElementById("userNameDropDown");
  let addTaskContactsDropdownLableBox = document.getElementById("addTaskContactsDropdownLableBox");
  let inputField = document.getElementById("addTaskContactsSearchArea");

  userNameDropDown.classList.toggle("show");
  userNameDropDown.classList.toggle("displayNone");
  document.getElementById("addTaskAssignContactsButton").classList.toggle("displayNone");
  document.getElementById("dropDownSearchCloseButtonBox").classList.toggle("displayNone");
  addTaskContactsDropdownLableBox.classList.toggle("addTaskContactsDropdownLableBoxClosed");
  addTaskContactsDropdownLableBox.classList.toggle("addTaskContactsDropdownLableBoxOpen");

  inputField.focus();
}

function addTaskFilterFunction() {
  let input = document.getElementById("addTaskContactsSearchArea");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`addTaskAssignUserId${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

function createUserInitials() {
  for (let i = 0; i < sortedUsers.length; i++) {
    let fullName = sortedUsers[i].name;
    let nameParts = fullName.split(" ");

    let initials = nameParts.map((part) => part.charAt(0)).join("");
    allUserInitials.push(initials);
  }
}

function addTaskRenderCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="chooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function chooseCategory(i) {
  chosenCategory = i;
  document.getElementById("addTaskChooseCategoryButton").innerHTML = /*html*/ `
      <div class="fontInboxAlign">${chosenCategory}</div>
      <img id="addTaskChooseCategoryDropdownImageDown" class="displayNone" src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
      <img id="addTaskChooseCategoryDropdownImageUp"  src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt=""/>
    `;
}

function addTaskOpenCloseCategoryDropDown() {
  document.getElementById("categoryDropDown").classList.toggle("show");
  document.getElementById("categoryDropDown").classList.toggle("displayNone");
  document.getElementById("addTaskChooseCategoryDropdownLableBox").classList.toggle("addTaskChooseCategoryDropdownLableBoxOpen");
  document.getElementById("addTaskChooseCategoryDropdownLableBox").classList.toggle("addTaskChooseCategoryDropdownLableBoxClosed");
  document.getElementById("addTaskChooseCategoryDropdownImageUp").classList.toggle("displayNone");
  document.getElementById("addTaskChooseCategoryDropdownImageDown").classList.toggle("displayNone");
}

function addTaskOpenAddSubtask() {
  let inputBox = document.getElementById("addSubtaskInputBox");
  let inputField = document.getElementById("addSubtaskInput");
  let addSubtask = document.getElementById("addSubtask");

  addSubtask.classList.add("displayNone");
  inputBox.classList.remove("displayNone");
  inputBox.classList.remove("displayNone");
  inputField.focus();
}

function addTaskAddSubtaskCancel() {
  document.getElementById("addSubtaskInput").value = "";
  document.getElementById("addSubtask").classList.remove("displayNone");
  document.getElementById("addSubtaskInputBox").classList.add("displayNone");
}

function addTaskAddSubtask() {
  let subtaskInput = document.getElementById("addSubtaskInput");
  subtasks.push(subtaskInput.value);
  subtaskInput.value = "";
  document.getElementById("addSubtask").classList.remove("displayNone");
  document.getElementById("addSubtaskInputBox").classList.add("displayNone");
  addTaskWriteSubtaskBoard();
}

function addTaskWriteSubtaskBoard() {
  let subtaskBoard = document.getElementById("subtaskBoard");
  subtaskBoard.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtaskBoard.innerHTML += /*html*/ `
    <li class="addTaskSingleListSubtask">
      <div id="taskBoardRewriteSubtaskInput${[i]}" class="addTaskRewriteSubtaskFlex displayNone">
        <input id="addTaskSubtaskRewriteInput${i}" class="taskBoardRewriteSubtaskInput" type="text">
        <div class="addTaskSubtaskIconBox">
          <img onclick="addTaskCancelRewriting(${i})" id="addTaskCancelRewriting${i}" class="img24px" src="images/mobile/addTaskMobile/trashcanBlack.png" alt="">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="addTaskAcceptRewriting(${i})" id="addTaskAcceptRewriting${i}" class="img24px" src="images/mobile/addTaskMobile/checkBlack.png" alt="">
        </div>
      </div>
      <div id="addTasksSubtask${[i]}" class="addTaskDisplayFlexer">
        <div>${subtasks[i]}</div>
        <div class="addTaskSubtaskIconBox">
          <img onclick="addTaskRewriteSubtask(${i})" class="img24px" src="images/mobile/addTaskMobile/pencilBlack.png">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="addTaskDeleteSubtaskFromBoard(${i})" class="img24px" src="images/mobile/addTaskMobile/trashcanBlack.png">
        </div>
      </div>
    </li>
    `;
  }
}

function addTaskRewriteSubtask(i) {
  let subtask = subtasks[i];
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  document.getElementById(`taskBoardRewriteSubtaskInput${[i]}`).value = subtask;
  document.getElementById(`taskBoardRewriteSubtaskInput${[i]}`).classList.toggle("displayNone");
  document.getElementById(`addTasksSubtask${[i]}`).classList.toggle("displayNone");
  rewriteInput.value = subtasks[i];
  rewriteInput.focus();
}

function addTaskDeleteSubtaskFromBoard(i) {
  subtasks.splice(i, 1);
  addTaskWriteSubtaskBoard();
}

function addTaskCancelRewriting(i) {
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  rewriteInput.value = subtasks[i];
  rewriteInput.focus();
}

function addTaskAcceptRewriting(i) {
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  subtasks.splice(i, 1, rewriteInput.value);
  document.getElementById(`taskBoardRewriteSubtaskInput${[i]}`).classList.toggle("displayNone");
  document.getElementById(`addTasksSubtask${[i]}`).classList.toggle("displayNone");
  addTaskWriteSubtaskBoard();
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
