let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
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
let taskAssignedUserInitials = [];
let addTaskAssignedUserColors = [];
let addTaskAssignedUserFontColors = [];
let addTaskAssignedUserId = [];
let addTaskAssignedUserFirebaseIds = [];
let userUniqueId = [];
let categories = ["Cleaning", "Company Outing", "Cooking", "Meetings", "Others", "Technical Task", "User Story"];
let subtasks = [];
let globalSubtaskId = "";

//boardGlobalArrays
let convertedTasks = [];
let allUnsortedTasks = [];
let toDoTasks = [];
let doneTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];
let currentDraggedElementID;
let currentNumberedID = "";

//summaryGlobalArrays
let allUrgentTasksCount = 0;
let allUrgentTasks = [];

//oftenUsedGlobalArrays
let currentDate = "";

//contactGlobalArray
let allContacts = [];
let contactIndices = [];
let renderedContact = [];
let contactId;

//often Used functions

function stopPropagation(event) {
  event.stopPropagation();
}

function signUpAddColorToUser() {
  let randomNumber = Math.floor(Math.random() * 15);
  let userColor = userColorsPreset[randomNumber];
  return userColor;
}

function getColorFromUser(i) {
  return sortedUsers[i].color;
}

function getCurrentDate() {
  currentDate = new Date().toISOString().split("T")[0];
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

//functions Summary

async function summaryAddAllValuesToBoard() {
  await loadAllTasks();
  summaryShowMostUrgentDate();
  summaryCountUrgentTasks();
  summaryAddToDoValue();
  summaryAddDoneValue();
  summaryAddUrgentValue();
  summaryAddBoardValue();
  summaryAddProgressValue();
  summaryAddFeedbackValue();
}

function summaryCountUrgentTasks() {
  allUrgentTasksCount += allUrgentTasks.length;
}

function summaryAddToDoValue() {
  let toDoValue = document.getElementById("summaryToDoValue");
  toDoValue.innerHTML = toDoTasks.length;
}

function summaryAddDoneValue() {
  let doneValue = document.getElementById("summaryDoneValue");
  doneValue.innerHTML = doneTasks.length;
}

function summaryAddUrgentValue() {
  let urgentValue = document.getElementById("summaryUrgentValue");
  urgentValue.innerHTML = allUrgentTasksCount;
}

function summaryAddBoardValue() {
  let boardValue = document.getElementById("summaryBoardValue");
  boardValue.innerHTML = convertedTasks.length;
}

function summaryAddProgressValue() {
  let progressValue = document.getElementById("summaryProgressValue");
  progressValue.innerHTML = inProgressTasks.length;
}

function summaryAddFeedbackValue() {
  let feedbackValue = document.getElementById("summaryFeedbackValue");
  feedbackValue.innerHTML = awaitFeedbackTasks.length;
}

function summaryShowMostUrgentDate() {
  extractUrgentTasks();
  summaryAddUrgentDateValue();
}

function extractUrgentTasks() {
  pushToDoUrgentTasks();
  pushProgressUrgentTasks();
  pushFeedbackUrgentTasks();
}

function pushToDoUrgentTasks() {
  for (let i = 0; i < toDoTasks.length; i++) {
    if (toDoTasks[i].taskPrio == "urgent") {
      allUrgentTasks.push(toDoTasks[i]);
    }
  }
}

function pushProgressUrgentTasks() {
  for (let i = 0; i < inProgressTasks.length; i++) {
    if (inProgressTasks[i].taskPrio == "urgent") {
      allUrgentTasks.push(inProgressTasks[i]);
    }
  }
}

function pushFeedbackUrgentTasks() {
  for (let i = 0; i < awaitFeedbackTasks.length; i++) {
    if (awaitFeedbackTasks[i].taskPrio == "urgent") {
      allUrgentTasks.push(awaitFeedbackTasks[i]);
    }
  }
}

function summaryAddUrgentDateValue() {
  let urgentDateValue = document.getElementById("summaryDate");
  urgentDateValue.innerHTML = `<b>${filterLowestDate()}</b>`;
}

function filterLowestDate() {
  let allDates = [];
  for (let i = 0; i < allUrgentTasks.length; i++) {
    allDates.push(allUrgentTasks[i].taskDate);
  }

  allDates.sort((a, b) => new Date(a) - new Date(b));
  return allDates[0];
}

//functions Board

async function loadAllTasks(path = "tasks") {
  let isOnBoardPage = window.location.pathname.endsWith("board.html");
  let response = await fetch(BASE_URL + path + ".json");
  allUnsortedTasks = await response.json();
  convertUnsortedTasksToArray();
  addFirebaseIDtoConvertedTasksArray();
  addSimpleIdToTasks();
  sortAllTasks();
  if (isOnBoardPage) {
    renderTasks();
  }
}

async function convertUnsortedTasksToArray() {
  convertedTasks = Object.values(allUnsortedTasks);
}

function addFirebaseIDtoConvertedTasksArray() {
  let newArray = convertedTasks.map((item, index) => {
    let id = Object.keys(allUnsortedTasks)[index];
    return { ...item, ID: id };
  });
  convertedTasks = newArray;
}

function addSimpleIdToTasks() {
  for (let i = 0; i < convertedTasks.length; i++) {
    let newArray = convertedTasks.map((item, i) => {
      let id = [i];
      return { ...item, numberedID: id };
    });
    convertedTasks = newArray;
  }
}

function sortAllTasks() {
  toDoTasks = convertedTasks.filter((t) => t.taskStatus == "to do");
  doneTasks = convertedTasks.filter((t) => t.taskStatus == "done");
  inProgressTasks = convertedTasks.filter((t) => t.taskStatus == "in progress");
  awaitFeedbackTasks = convertedTasks.filter((t) => t.taskStatus == "await feedback");
}

function renderTasks() {
  let searchTerm = document.getElementById("findTaskInput").value;

  let inProgressElement = document.getElementById("inProgressContentWrapper");
  let toDoElement = document.getElementById("toDoSectionContentWrapper");
  let awaitFeedbackElement = document.getElementById("awaitFeedbackContentWrapper");
  let doneElement = document.getElementById("doneContentWrapper");

  let filteredInProgressTasks = filterTasks(inProgressTasks, searchTerm);
  let filteredToDoTasks = filterTasks(toDoTasks, searchTerm);
  let filteredAwaitFeedbackTasks = filterTasks(awaitFeedbackTasks, searchTerm);
  let filteredDoneTasks = filterTasks(doneTasks, searchTerm);

  renderInProgressTasks(inProgressElement, filteredInProgressTasks);
  renderToDoTasks(toDoElement, filteredToDoTasks);
  renderAwaitFeedbackTasks(awaitFeedbackElement, filteredAwaitFeedbackTasks);
  renderDoneElementTasks(doneElement, filteredDoneTasks);
}

function filterTasks(tasks, searchTerm) {
  return tasks.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()));
}

function renderToDoTasks(toDoElement, tasks) {
  if (tasks.length < 1) {
    toDoElement.innerHTML = noTaskTemplate();
  } else {
    toDoElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
            <div class="taskCardUser" style="background-color: ${backgroundColor};">
              <p style="color: ${fontColor};">
                ${tasks[i].taskAssignedUserInitials[index]}
              </p>
            </div>
          `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      toDoElement.innerHTML += toDoTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarToDoTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function renderInProgressTasks(inProgressElement, tasks) {
  if (tasks.length < 1) {
    inProgressElement.innerHTML = noTaskTemplate();
  } else {
    inProgressElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
            <div class="taskCardUser" style="background-color: ${backgroundColor};">
              <p style="color: ${fontColor};">
                ${tasks[i].taskAssignedUserInitials[index]}
              </p>
            </div>
          `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      inProgressElement.innerHTML += inProgressTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarInProgressTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function renderAwaitFeedbackTasks(awaitFeedbackElement, tasks) {
  if (tasks.length < 1) {
    awaitFeedbackElement.innerHTML = noTaskTemplate();
  } else {
    awaitFeedbackElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
            <div class="taskCardUser" style="background-color: ${backgroundColor};">
              <p style="color: ${fontColor};">
                ${tasks[i].taskAssignedUserInitials[index]}
              </p>
            </div>
          `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      awaitFeedbackElement.innerHTML += awaitFeedbackTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarAwaitFeedbackTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function renderDoneElementTasks(doneElement, tasks) {
  if (tasks.length < 1) {
    doneElement.innerHTML = noTaskTemplate();
  } else {
    doneElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
            <div class="taskCardUser" style="background-color: ${backgroundColor};">
              <p style="color: ${fontColor};">
                ${tasks[i].taskAssignedUserInitials[index]}
              </p>
            </div>
          `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      doneElement.innerHTML += doneTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarDoneTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function startDragging(id) {
  currentDraggedElementID = id;
  console.log(currentDraggedElementID);
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(taskStatus) {
  convertedTasks[currentDraggedElementID]["taskStatus"] = taskStatus;
  putNewTaskStatus();
  sortAllTasks();
  renderTasks();
}

async function putNewTaskStatus() {
  let taskID = convertedTasks[currentDraggedElementID].ID;
  let task = convertedTasks[currentDraggedElementID];

  await fetch(`${BASE_URL}tasks/${taskID}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

async function deleteTask(taskID) {
  await fetch(`${BASE_URL}tasks/${taskID}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  closeBoardTaskPopup();
  loadAllTasks();
}

//--------------------------------------------
//--------------------------------------------

async function renderPopupEditTaskContent(numberedID) {
  renderAddTaskToEditPopup(numberedID);
  await boardLoadEditPopUpUserData();
  editPopUpAddUserToTask(numberedID);

  setTaskPrio(`${convertedTasks[numberedID].taskPrio}`);
  currentNumberedID = numberedID;
}

function editPopUpAddUserToTask(numberedID) {
  for (let i = 0; i < convertedTasks[numberedID].taskAssignedUser.length; i++) {
    const currentUserFirebaseId = convertedTasks[numberedID].taskAssignedUserFirebaseIDs[i];
    const index = sortedUsers.findIndex((user) => user.id === currentUserFirebaseId);
    boardEditPopupAddUserToTaskToggle(convertedTasks[numberedID].taskAssignedUser[i], index);
    console.log(convertedTasks[numberedID].taskAssignedUser[i], i, currentUserFirebaseId, index);
  }
}

function boardEditPopUpInsertMinSelectableDate() {
  document.getElementById("boardEditPopUpTaskDateInput").setAttribute("min", currentDate);
}

function renderAddTaskToEditPopup(numberedID) {
  document.getElementById("boardTaskPopup").innerHTML = renderAddTaskToEditPopupTemplate(numberedID);
  boardEditPopUpInsertMinSelectableDate();
  document.querySelector(".addTaskSection").style.backgroundColor = "white";
  document.querySelector(".addTaskSection").style.setProperty("margin-top", "360px");
}

async function boardLoadEditPopUpUserData(path = "users") {
  let response = await fetch(BASE_URL + path + ".json");
  responseToJson = await response.json();
  sortUsersByName(responseToJson);
  createUserInitials();
  boardEditPopupLoadFullNameList();
  boardEditPopUpRenderCategoryDropdown();
  boardEditTaskRenderCategoryDropdown();
}

function boardEditPopupLoadFullNameList() {
  let dropdown = document.getElementById("boardEditPopUpUserNameDropDown");
  dropdown.innerHTML = "";

  for (let i = 0; i < sortedUsers.length; i++) {
    let currentColor = getColorFromUser(i);
    let blackWhite = addTaskAdaptFontColorToBackground(i);
    dropdown.innerHTML += nameListTemplate(i, sortedUsers, currentColor, blackWhite, allUserInitials, userUniqueId);
  }
}

function boardEditPopUpRenderCategoryDropdown() {
  let categoryDropdown = document.getElementById("boardEditCategoryDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="chooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function boardEditPopUpFilterFunction() {
  let input = document.getElementById("boardEditPopupContactsSearchArea");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`boardEditPopupAssignUserId${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

function boardEditPopupAddUserToTaskToggle(name, i) {
  let inputField = document.getElementById("boardEditPopupContactsSearchArea");
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let assignUserID = document.getElementById(`boardEditPopupAssignUserId${i}`);
  let blackWhite = addTaskAdaptFontColorToBackground(i);
  inputField.focus();

  if (!addTaskCurrentUser.includes(name)) addUserToTask(name, i, check, noCheck, assignUserID, blackWhite);
  else {
    let userIndex = addTaskCurrentUser.indexOf(name);
    if (userIndex > -1) {
      removeUserFromTask(check, noCheck, assignUserID, userIndex);
    }
  }
  addUserSymbolsToAssign();
}

document.addEventListener(
  "click",
  function (event) {
    let taskSection = document.getElementById("boardEditPopUpTaskSection");

    if (taskSection) {
      let contactsDropdown = document.getElementById("boardEditPopupContactsDropdownLableBox");
      let assignDropdownArrow = document.getElementById("boardEditPopupAssignDropdownArrow");
      let inputField = document.getElementById("boardEditPopupContactsSearchArea");
      let userNameDropDown = document.getElementById("boardEditPopUpUserNameDropDown");

      if (contactsDropdown.contains(event.target) && !assignDropdownArrow.contains(event.target)) {
        openEditPopupAssignDropdown(inputField, userNameDropDown, contactsDropdown);
      } else {
        closeEditPopUpAssignDropdown(userNameDropDown);
      }
    }
  },
  true
);

//                               open assign functions for EditPopup

function openEditPopupAssignDropdown(inputField, userNameDropDown, contactsDropdown) {
  addShowRemoveDisplayNoneToAssignDropdownEditPopUp(userNameDropDown);
  addOpenContactsRemoveClosedContactsEditPopUp(contactsDropdown);
  removeButtonBoxAddDropdownEditPopUp();
  inputField.focus();
}

function addShowRemoveDisplayNoneToAssignDropdownEditPopUp(userNameDropDown) {
  userNameDropDown.classList.add("show");
  userNameDropDown.classList.remove("displayNone");
}

function addOpenContactsRemoveClosedContactsEditPopUp(contactsDropdown) {
  contactsDropdown.classList.remove("addTaskContactsDropdownLableBoxClosed");
  contactsDropdown.classList.add("addTaskContactsDropdownLableBoxOpen");
}

function removeButtonBoxAddDropdownEditPopUp() {
  document.getElementById("boardEditPopupAssignContactsButton").classList.add("displayNone");
  document.getElementById("boardEditPopUpDropDownSearchCloseButtonBox").classList.remove("displayNone");
}

//                               close assign functions for EditPopup

function closeEditPopUpAssignDropdown(userNameDropDown) {
  removeShowAddDisplayNoneToAssignDropdownEditPopUp(userNameDropDown), removeOpenContactsAddClosedContactsEditPopUp(), addButtonBoxRemoveDropdownEditPopUp();
}

function removeShowAddDisplayNoneToAssignDropdownEditPopUp(userNameDropDown) {
  userNameDropDown.classList.remove("show");
  userNameDropDown.classList.add("displayNone");
}

function removeOpenContactsAddClosedContactsEditPopUp() {
  let contactsDropdownBox = document.getElementById("boardEditPopupContactsDropdownLableBox");
  contactsDropdownBox.classList.add("addTaskContactsDropdownLableBoxClosed");
  contactsDropdownBox.classList.remove("addTaskContactsDropdownLableBoxOpen");
}

function addButtonBoxRemoveDropdownEditPopUp() {
  document.getElementById("boardEditPopupAssignContactsButton").classList.remove("displayNone");
  document.getElementById("boardEditPopUpDropDownSearchCloseButtonBox").classList.add("displayNone");
}

// board Edit PopUp Category

function boardEditTaskRenderCategoryDropdown() {
  let categoryDropdown = document.getElementById("boardEditCategoryDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="boardEditTaskChooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function boardEditTaskChooseCategory(i) {
  chosenCategory = i;
  document.getElementById("boardEditPopupChooseCategoryButton").innerHTML = boardEditTaskCategoryTemplate(chosenCategory);
}

document.addEventListener(
  "click",
  function (event) {
    let taskSection = document.getElementById("boardEditPopUpTaskSection");
    if (taskSection) {
      let categoryDropdown = document.getElementById("boardEditCategoryDropDown");
      let dropdownLableBox = document.getElementById("boardEditPopUpChooseCategoryDropdownLableBox");

      if (dropdownLableBox.contains(event.target)) {
        toggleCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox);
      } else if (!categoryDropdown.contains(event.target)) {
        closeCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox);
      }
    }
  },
  true
);

function toggleCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox) {
  if (categoryDropdown.classList.contains("show")) {
    closeCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox);
  } else {
    openCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox);
  }
}

//                               open category functions for EditPopup

function openCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox) {
  showCategoryDropdownEditPopUp(categoryDropdown);
  addDropdownLableBoxEditPopUp(dropdownLableBox);
  switchAssignArrowToDownEditPopUp();
}

function showCategoryDropdownEditPopUp(categoryDropdown) {
  categoryDropdown.classList.add("show");
  categoryDropdown.classList.remove("displayNone");
}

function addDropdownLableBoxEditPopUp(dropdownLableBox) {
  dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxOpen");
  dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxClosed");
}

function switchAssignArrowToDownEditPopUp() {
  document.getElementById("boardEditPopUpChooseCategoryDropdownImageUp").classList.remove("displayNone");
  document.getElementById("boardEditPopUpChooseCategoryDropdownImageDown").classList.add("displayNone");
}

//                               close category functions for EditPopup

function closeCategoryDropdownEditPopUp(categoryDropdown, dropdownLableBox) {
  closeCategoryDropdownWindowEditPopUp(categoryDropdown);
  closeCategoryLableBoxEditPopUp(dropdownLableBox);
  switchCategoryArrowToUpEditPopUp();
}

function closeCategoryDropdownWindowEditPopUp(categoryDropdown) {
  categoryDropdown.classList.remove("show");
  categoryDropdown.classList.add("displayNone");
}

function closeCategoryLableBoxEditPopUp(dropdownLableBox) {
  dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxOpen");
  dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxClosed");
}

function switchCategoryArrowToUpEditPopUp() {
  document.getElementById("boardEditPopUpChooseCategoryDropdownImageUp").classList.add("displayNone");
  document.getElementById("boardEditPopUpChooseCategoryDropdownImageDown").classList.remove("displayNone");
}

//                        board Edit PupUp subTask

function boardEditPopUpOpenAddSubtask() {
  let inputBox = document.getElementById("boardEditPopUpAddSubtaskInputBox");
  let inputField = document.getElementById("boardEditPopUpAddSubtaskInput");
  let addSubtask = document.getElementById("boardEditPopUpaddSubtask");

  addSubtask.classList.add("displayNone");
  inputBox.classList.remove("displayNone");
  inputBox.classList.remove("displayNone");
  inputField.focus();
}

function boardEditPopUpAddSubtaskCancel() {
  document.getElementById("boardEditPopUpAddSubtaskInput").value = "";
  document.getElementById("boardEditPopUpaddSubtask").classList.remove("displayNone");
  document.getElementById("boardEditPopUpAddSubtaskInputBox").classList.add("displayNone");
}

function boardEditPopUpAddSubtask() {
  let subtaskInput = document.getElementById("boardEditPopUpAddSubtaskInput");
  subtasks.push({ subtask: subtaskInput.value, done: false });
  globalSubtaskId = 0;
  subtaskInput.value = "";
  document.getElementById("boardEditPopUpaddSubtask").classList.remove("displayNone");
  document.getElementById("boardEditPopUpAddSubtaskInputBox").classList.add("displayNone");
  boardEditPopUpWriteSubtaskBoard();
}

function boardEditPopUpWriteSubtaskBoard() {
  let subtaskBoard = document.getElementById("boardEditPopUpSubtaskBoard");
  subtaskBoard.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtaskBoard.innerHTML += subtaskTemplate(i);
  }
}

function boardEditPopUpRewriteSubtask(i) {
  boardEditPopUpWriteSubtaskBoard();

  let subtask = subtasks[i].subtask;
  let rewriteInput = document.getElementById(`boardEditPopUpSubtaskRewriteInput${i}`);
  let rewriteInputBox = document.getElementById(`boardEditPopUpSubtaskRewriteInputBox${[i]}`);
  rewriteInputBox.value = subtask;
  rewriteInputBox.classList.toggle("displayNone");
  document.getElementById(`boardEditPopUpSubtask${[i]}`).classList.toggle("displayNone");
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function boardEditPopUpDeleteSubtaskFromBoard(i) {
  subtasks.splice(i, 1);
  boardEditPopUpWriteSubtaskBoard();
}

function boardEditPopUpAcceptRewriting(i) {
  let rewriteInput = document.getElementById(`boardEditPopUpSubtaskRewriteInput${i}`);
  subtasks[i].subtask = rewriteInput.value;
  document.getElementById(`boardEditPopUpSubtaskRewriteInputBox${i}`).classList.toggle("displayNone");
  document.getElementById(`boardEditPopUpSubtask${i}`).classList.toggle("displayNone");
  boardEditPopUpWriteSubtaskBoard();
}

function boardEditPopUpCancelRewritingSubtask(i) {
  boardEditPopUpDeleteRewritingSubtask(i);
  boardEditPopUpAcceptRewriting(i);
}

function boardEditPopUpReadIdFromSubtask(id) {
  let fullId = id;
  let idNumber = fullId.slice(-1);
  globalSubtaskId = idNumber;
  console.log(idNumber);
}

document.addEventListener(
  "click",
  function (event) {
    let taskSection = document.getElementById("boardEditPopUpTaskSection");
    if (globalSubtaskId !== "" && taskSection) {
      let i = globalSubtaskId;
      let cancelRewriting = document.getElementById(`boardEditPopUpCancelRewritingSubtask${i}`);
      let acceptRewriting = document.getElementById(`boardEditPopUpAcceptRewritingSubtask${i}`);
      let subtaskRewriteBox = document.getElementById(`boardEditPopUpSubtaskRewriteInput${i}`);

      if (event.target !== cancelRewriting && event.target !== acceptRewriting && event.target !== subtaskRewriteBox) {
        if (document.body.contains(event.target)) {
          boardEditPopUpCancelRewritingSubtask(i);
        }
      }
    }
  },
  true
);

function boardEditPopUpDeleteRewritingSubtask(i) {
  let rewriteInput = document.getElementById(`boardEditPopUpSubtaskRewriteInput${i}`);
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function checkEnterKeyTrigger(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addTaskAddSubtask();
  }
}

//--------------------------------------------
//--------------------------------------------

const popupElement = document.getElementById("boardTaskPopup");
const popupBackgroundELement = document.getElementById("boardPopupBackground");

function openBoardTaskPopup(i, taskID, numberedID) {
  renderBoardTaskPopupContent(i, taskID, numberedID);
  renderBoardTaskPopupContentUsers(i, numberedID);
  renderBoardTaskPopupSubtasks(i, numberedID);
  popupElement.style.display = "flex";
  popupBackgroundELement.style.display = "flex";

  popupElement.addEventListener("click", stopPropagation);
}

function closeBoardTaskPopup() {
  popupElement.style.display = "none";
  popupBackgroundELement.style.display = "none";
  popupElement.removeEventListener("click", stopPropagation);
  editPopUpAddUserToTask(currentNumberedID);
}

function renderBoardTaskPopupContent(i, taskID, numberedID) {
  popupElement.innerHTML = boardTaskPopupTemplate(i, taskID, numberedID);
}

function renderBoardTaskPopupContentUsers(i, numberedID) {
  const popupUsersElement = document.getElementById("boardTaskPopupContentAssignedToUserWrapper");
  popupUsersElement.innerHTML = "";
  for (let usersIndex = 0; usersIndex < convertedTasks[numberedID].taskAssignedUser.length; usersIndex++) {
    popupUsersElement.innerHTML += popupUserTemplate(usersIndex, i, numberedID);
  }
}

function renderBoardTaskPopupSubtasks(i, numberedID) {
  const popupSubtasksElement = document.getElementById("boardTaskPopupContentSubtasksList");
  popupSubtasksElement.innerHTML = "";
  for (let subtasksIndex = 0; subtasksIndex < convertedTasks[numberedID].taskSubtasks.length; subtasksIndex++) {
    popupSubtasksElement.innerHTML += popupSubtaskTemplate(subtasksIndex, i, numberedID);
    if (convertedTasks[numberedID].taskSubtasks[subtasksIndex].done) {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "./images/icons/checked.png";
    } else {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "./images/icons/unchecked.png";
    }
  }
}

function boardTaskPopupChangeSubtaskStatus(subtasksIndex, i, taskFirebaseID, numberedID) {
  convertedTasks[numberedID].taskSubtasks[subtasksIndex].done = !convertedTasks[numberedID].taskSubtasks[subtasksIndex].done;
  setSubtaskDonetoTrueOrFalseOnFirebase(i, subtasksIndex, taskFirebaseID, numberedID);
  renderBoardTaskPopupSubtasks(i, numberedID);
}

function setSubtaskDonetoTrueOrFalseOnFirebase(i, subtasksIndex, taskFirebaseID, numberedID) {
  let taskStatus = convertedTasks[numberedID].taskSubtasks[subtasksIndex].done;
  if (taskStatus === true) {
    fetchSubtaskDoneToTrue(subtasksIndex, taskFirebaseID);
  }

  if (taskStatus === false) {
    fetchSubtaskDoneToFalse(subtasksIndex, taskFirebaseID);
  }
}

async function fetchSubtaskDoneToTrue(subtasksIndex, taskFirebaseID) {
  await fetch(`${BASE_URL}tasks/${taskFirebaseID}/taskSubtasks/${subtasksIndex}/done.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(true),
  });
}

async function fetchSubtaskDoneToFalse(subtasksIndex, taskFirebaseID) {
  await fetch(`${BASE_URL}tasks/${taskFirebaseID}/taskSubtasks/${subtasksIndex}/done.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(false),
  });
}

const findTaskInput = document.getElementById("findTaskInput");

if (findTaskInput) {
  function addInputListener() {
    findTaskInput.addEventListener("input", renderTasks);
  }

  function removeInputListener() {
    findTaskInput.removeEventListener("input", renderTasks);
  }

  findTaskInput.addEventListener("focus", addInputListener);
  findTaskInput.addEventListener("blur", removeInputListener);
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
    taskAssignedUserInitials: taskAssignedUserInitials,
    taskAssignedUserColors: addTaskAssignedUserColors,
    taskAssignedUserFontColors: addTaskAssignedUserFontColors,
    taskAssignedUserFirebaseIDs: addTaskAssignedUserFirebaseIds,
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

//functions addTask---------assign Contacts------------------------------------------------------------

function loadFullNameList() {
  let dropdown = document.getElementById("userNameDropDown");
  dropdown.innerHTML = "";

  for (let i = 0; i < sortedUsers.length; i++) {
    let currentColor = getColorFromUser(i);
    let blackWhite = addTaskAdaptFontColorToBackground(i);
    dropdown.innerHTML += nameListTemplate(i, sortedUsers, currentColor, blackWhite, allUserInitials);
  }
}

function addTaskAdaptFontColorToBackground(i) {
  let currentColor = getColorFromUser(i);
  currentColor = currentColor.replace(/#/, "");

  let r = parseInt(currentColor.substring(0, 2), 16);
  let g = parseInt(currentColor.substring(2, 4), 16);
  let b = parseInt(currentColor.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}

function addUserToTaskToggle(name, i) {
  let inputField = document.getElementById("addTaskContactsSearchArea");
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let assignUserID = document.getElementById(`addTaskAssignUserId${i}`);
  let blackWhite = addTaskAdaptFontColorToBackground(i);
  let userFirebaseId = sortedUsers[i].id;

  if (!addTaskCurrentUser.includes(name)) addUserToTask(name, i, check, noCheck, assignUserID, blackWhite, userFirebaseId);
  else {
    let userIndex = addTaskCurrentUser.indexOf(name);
    if (userIndex > -1) {
      removeUserFromTask(check, noCheck, assignUserID, userIndex, userFirebaseId);
    }
  }
  addUserSymbolsToAssign();
}

function addUserToTask(name, i, check, noCheck, assignUserID, blackWhite, userFirebaseId) {
  addTaskCurrentUser.push(name);
  taskAssignedUserInitials.push(allUserInitials[i]);
  addTaskAssignedUserColors.push(sortedUsers[i].color);
  addTaskAssignedUserFontColors.push(blackWhite);
  addTaskAssignedUserFirebaseIds.push(userFirebaseId);

  check.classList.remove("displayNone");
  noCheck.classList.add("displayNone");
  assignUserID.classList.add("addTaskNewBackgroundChecked");
}

function removeUserFromTask(check, noCheck, assignUserID, userIndex) {
  addTaskCurrentUser.splice(userIndex, 1);
  taskAssignedUserInitials.splice(userIndex, 1);
  addTaskAssignedUserColors.splice(userIndex, 1);
  addTaskAssignedUserFontColors.splice(userIndex, 1);
  addTaskAssignedUserFirebaseIds.splice(userIndex, 1);

  check.classList.add("displayNone");
  noCheck.classList.remove("displayNone");
  assignUserID.classList.remove("addTaskNewBackgroundChecked");
}

function addUserSymbolsToAssign() {
  let addUserSymbolsAssign = document.getElementById("addUserSymbolsAssign");
  addUserSymbolsAssign.innerHTML = "";

  for (let i = 0; i < addTaskCurrentUser.length; i++) {
    addUserSymbolsAssign.innerHTML += addUserSymbolTemplate(i);
  }
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

// addTask --------------------------- date

function insertMinSelectableDate() {
  document.getElementById("taskDateInput").setAttribute("min", currentDate);
}

// addTask --------------------------- priority

function setTaskPrio(priority) {
  taskPrioInput = priority;
  setTaskPrioButtonColorSwitch(priority);
}

function setTaskPrioButtonColorSwitch(priority) {
  buttonUrgent = document.getElementsByClassName("addTaskPrioButtonUrgent")[0];
  buttonMedium = document.getElementsByClassName("addTaskPrioButtonMedium")[0];
  buttonLow = document.getElementsByClassName("addTaskPrioButtonLow")[0];

  if (priority == "urgent") highlightPrioButtonUrgent();
  if (priority == "medium") highlightPrioButtonMedium();
  if (priority == "low") highlightPrioButtonLow();
}

function highlightPrioButtonUrgent() {
  buttonUrgent.classList.add("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
  buttonMedium.classList.remove("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
  buttonLow.classList.remove("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
}
function highlightPrioButtonMedium() {
  buttonMedium.classList.add("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
  buttonUrgent.classList.remove("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
  buttonLow.classList.remove("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
}
function highlightPrioButtonLow() {
  buttonLow.classList.add("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
  buttonUrgent.classList.remove("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
  buttonMedium.classList.remove("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
}

// addTask --------------------------- category

function addTaskRenderCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="chooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function chooseCategory(i) {
  chosenCategory = i;
  document.getElementById("addTaskChooseCategoryButton").innerHTML = categoryTemplate(chosenCategory);
}

// addTask --------------------------- subTask

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
  subtasks.push({ subtask: subtaskInput.value, done: false });
  globalSubtaskId = 0;
  subtaskInput.value = "";
  document.getElementById("addSubtask").classList.remove("displayNone");
  document.getElementById("addSubtaskInputBox").classList.add("displayNone");
  addTaskWriteSubtaskBoard();
}

function addTaskWriteSubtaskBoard() {
  let subtaskBoard = document.getElementById("subtaskBoard");
  subtaskBoard.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtaskBoard.innerHTML += subtaskTemplate(i);
  }
}

function addTaskRewriteSubtask(i) {
  addTaskWriteSubtaskBoard();

  let subtask = subtasks[i].subtask;
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  let rewriteInputBox = document.getElementById(`addTaskSubtaskRewriteInputBox${[i]}`);
  rewriteInputBox.value = subtask;
  rewriteInputBox.classList.toggle("displayNone");
  document.getElementById(`addTasksSubtask${[i]}`).classList.toggle("displayNone");
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function addTaskDeleteSubtaskFromBoard(i) {
  subtasks.splice(i, 1);
  addTaskWriteSubtaskBoard();
}

function addTaskAcceptRewriting(i) {
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  subtasks[i].subtask = rewriteInput.value;
  document.getElementById(`addTaskSubtaskRewriteInputBox${i}`).classList.toggle("displayNone");
  document.getElementById(`addTasksSubtask${i}`).classList.toggle("displayNone");
  addTaskWriteSubtaskBoard();
}

function addTaskCancelRewritingSubtask(i) {
  addTaskDeleteRewritingSubtask(i);
  addTaskAcceptRewriting(i);
}

function readIdFromSubtask(id) {
  let fullId = id;
  let idNumber = fullId.slice(-1);
  globalSubtaskId = idNumber;
  console.log(idNumber);
}

document.addEventListener("click", function (event) {
  if (globalSubtaskId !== "") {
    let i = globalSubtaskId;
    let cancelRewriting = document.getElementById(`addTaskCancelRewritingSubtask${i}`);
    let acceptRewriting = document.getElementById(`addTaskAcceptRewritingSubtask${i}`);
    let subtaskRewriteBox = document.getElementById(`addTaskSubtaskRewriteInput${i}`);

    if (event.target !== cancelRewriting && event.target !== acceptRewriting && event.target !== subtaskRewriteBox) {
      if (document.body.contains(event.target)) {
        addTaskCancelRewritingSubtask(i);
      }
    }
  }
});

function addTaskDeleteRewritingSubtask(i) {
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function checkEnterKeyTrigger(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addTaskAddSubtask();
  }
}

// addTask ---------------------------   Dropdown

// open close assign Dropdown

document.addEventListener("click", function (event) {
  let isOnAddTask = window.location.pathname.endsWith("addTask.html");
  if (isOnAddTask) {
    let contactsDropdown = document.getElementById("addTaskContactsDropdownLableBox");
    let assignDropdownArrow = document.getElementById("addTaskAssignDropdownArrow");
    let inputField = document.getElementById("addTaskContactsSearchArea");
    let userNameDropDown = document.getElementById("userNameDropDown");

    if (contactsDropdown.contains(event.target) && !assignDropdownArrow.contains(event.target)) {
      openAssignDropdown(inputField, userNameDropDown, contactsDropdown);
    } else {
      closeAssignDropdown(userNameDropDown);
    }
  }
});

//                               open assign functions

function openAssignDropdown(inputField, userNameDropDown, contactsDropdown) {
  addShowRemoveDisplayNoneToAssignDropdown(userNameDropDown);
  addOpenContactsRemoveClosedContacts(contactsDropdown);
  removeButtonBoxAddDropdown();
  inputField.focus();
}

function addShowRemoveDisplayNoneToAssignDropdown(userNameDropDown) {
  userNameDropDown.classList.add("show");
  userNameDropDown.classList.remove("displayNone");
}

function addOpenContactsRemoveClosedContacts(contactsDropdown) {
  contactsDropdown.classList.remove("addTaskContactsDropdownLableBoxClosed");
  contactsDropdown.classList.add("addTaskContactsDropdownLableBoxOpen");
}

function removeButtonBoxAddDropdown() {
  document.getElementById("addTaskAssignContactsButton").classList.add("displayNone");
  document.getElementById("dropDownSearchCloseButtonBox").classList.remove("displayNone");
}

//                               close assign functions

function closeAssignDropdown() {
  removeShowAddDisplayNoneToAssignDropdown(userNameDropDown), removeOpenContactsAddClosedContacts(), addButtonBoxRemoveDropdown();
}

function removeShowAddDisplayNoneToAssignDropdown(userNameDropDown) {
  userNameDropDown.classList.remove("show");
  userNameDropDown.classList.add("displayNone");
}

function removeOpenContactsAddClosedContacts() {
  let contactsDropdownBox = document.getElementById("addTaskContactsDropdownLableBox");
  contactsDropdownBox.classList.add("addTaskContactsDropdownLableBoxClosed");
  contactsDropdownBox.classList.remove("addTaskContactsDropdownLableBoxOpen");
}

function addButtonBoxRemoveDropdown() {
  document.getElementById("addTaskAssignContactsButton").classList.remove("displayNone");
  document.getElementById("dropDownSearchCloseButtonBox").classList.add("displayNone");
}

// open close Category Dropdown

document.addEventListener("click", function (event) {
  let isOnAddTask = window.location.pathname.endsWith("addTask.html");
  if (isOnAddTask) {
    let categoryDropdown = document.getElementById("categoryDropDown");
    let dropdownLableBox = document.getElementById("addTaskChooseCategoryDropdownLableBox");

    if (dropdownLableBox.contains(event.target)) {
      toggleCategoryDropdown(categoryDropdown, dropdownLableBox);
    } else if (!categoryDropdown.contains(event.target)) {
      closeCategoryDropdown(categoryDropdown, dropdownLableBox);
    }
  }
});

function toggleCategoryDropdown(categoryDropdown, dropdownLableBox) {
  if (categoryDropdown.classList.contains("show")) {
    closeCategoryDropdown(categoryDropdown, dropdownLableBox);
  } else {
    openCategoryDropdown(categoryDropdown, dropdownLableBox);
  }
}

function openCategoryDropdown(categoryDropdown, dropdownLableBox) {
  showCategoryDropdown(categoryDropdown);
  addDropdownLableBox(dropdownLableBox);
  switchAssignArrowToDown();
}

function showCategoryDropdown(categoryDropdown) {
  categoryDropdown.classList.add("show");
  categoryDropdown.classList.remove("displayNone");
}

function addDropdownLableBox(dropdownLableBox) {
  dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxOpen");
  dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxClosed");
}

function switchAssignArrowToDown() {
  document.getElementById("addTaskChooseCategoryDropdownImageUp").classList.remove("displayNone");
  document.getElementById("addTaskChooseCategoryDropdownImageDown").classList.add("displayNone");
}

function closeCategoryDropdown(categoryDropdown, dropdownLableBox) {
  closeCategoryDropdownWindow(categoryDropdown);
  closeCategoryLableBox(dropdownLableBox);
  switchCategoryArrowToUp();
}

function closeCategoryDropdownWindow(categoryDropdown) {
  categoryDropdown.classList.remove("show");
  categoryDropdown.classList.add("displayNone");
}

function closeCategoryLableBox(dropdownLableBox) {
  dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxOpen");
  dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxClosed");
}

function switchCategoryArrowToUp() {
  document.getElementById("addTaskChooseCategoryDropdownImageUp").classList.add("displayNone");
  document.getElementById("addTaskChooseCategoryDropdownImageDown").classList.remove("displayNone");
}

//functions addContacts---------------------------------------------------------------------

async function init() {
  await loadContactData();
}

async function postContact() {
  let { contactData } = getContactInputData();

  if (!contactData.name || !contactData.email || !contactData.phone) {
    return;
  }

  await fetch(BASE_URL + `users/.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  clearAddContactInput();
  navigateToContactInfo();
}

function getContactInputData(contactData) {
  let nameInput = document.getElementById("contactNameInput");
  let mailInput = document.getElementById("contactMailInput");
  let phoneInput = document.getElementById("contactPhoneInput");
  let userColor = signUpAddColorToUser();
  contactData = {
    name: nameInput.value,
    email: mailInput.value,
    phone: phoneInput.value,
    color: userColor,
  };
  return { contactData, nameInput, mailInput, phoneInput };
}

async function loadContactData(path = "users") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();

  if (responseToJson) {
    for (let key in responseToJson) {
      let contact = responseToJson[key];
      allContacts.push({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        color: contact.color,
      });
      renderedContact.push({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        color: contact.color,
        id: key,
      });
    }
  }
  renderContacts();
}

function clearAddContactInput() {
  // Zuerst das Element abrufen und dann den Wert leeren
  let nameInput = document.getElementById("contactNameInput");
  let mailInput = document.getElementById("contactMailInput");
  let phoneInput = document.getElementById("contactPhoneInput");

  // Dann den Wert auf leeren String setzen
  nameInput.value = "";
  mailInput.value = "";
  phoneInput.value = "";
}

function renderContacts() {
  let allContactsList = document.getElementById("allContactsList");
  allContactsList.innerHTML = "";
  allContacts.forEach((contact) => {
    allContactsList.innerHTML += `
      <div onclick="renderContactInfo('${contact.id}')" class="contactItem">
        <div class="contactsDiv3">
          <div class="assignContactColors" style="background-color: ${contact.color};"></div>
          <div class="contactsBox">
            <span>${contact.name}</span>
            <span>${contact.email}</span>
          </div>
        </div>
      </div>
    `;
  });
}

function navigateToContactInfo() {
  window.location.href = "contactInfo.html";
}

function findContactId(contactId) {
  return renderedContact.find((contact) => contact.id === contactId);
}

function renderContactInfo(contactId) {
  let currentContact = findContactId(contactId);

  if (currentContact) {
    let contactsDiv2 = document.getElementById("contactsDiv2");
    contactsDiv2.innerHTML = ``;
    contactsDiv2.innerHTML += renderContactInfoHTML(currentContact);
  }
  navigateToContactInfo();
}

function renderContactInfoHTML(currentContact) {
  return `<div id="contactId" class="displayFlex">
            <img class="logoWidth" src="/images/icons/Profile badge.png" alt="">
            <span class="spanConName">${currentContact.name}</span>
          </div>
    
          <div class="contactsBox2">
            <span class="spanConInfo">Contact Information</span>
            <span class="spanHeader">Email</span>
            <span class="spanEmailAdress">${currentContact.email}</span>
            <span class="spanHeader">Phone</span>
            <span class="spanPhone">${currentContact.phone}</span>
          </div>
        `;
}
