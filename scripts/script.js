let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
let signUpData = {};
let responseToJson;
let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"]; //is needed
let policyAccepted = false;
let passwordMatch = false;

//logInArrays
let loggedUserInitials = "G"; //is needed

//addTaskGlobalArrays
let taskPrioInput = ""; //is needed
let taskFormCurrentUsersIds = []; //is needed
let categories = ["Cleaning", "Company Outing", "Cooking", "Meetings", "Others", "Technical Task", "User Story"]; //is needed
let subtasks = []; //is needed

//boardGlobalArrays
let sortedUsers = []; //is needed
let unsortedUsers = {}; //is needed
let lokalTasksArray = []; //is needed. renamed from convertedTasks
let allUnsortedTasks = []; //is needed
let currentDraggedElementID;

//contactGlobalArray
let allContacts = [];
let contactIndices = [];
let renderedContact = [];
let contactId;

//often Used functions

function stopPropagation(event) {
  event.stopPropagation();
}

async function fillSortedUsersObject() {
  sortedUsers = await sortUserData();
}

// navigation

function redirectToBoard() {
  setTimeout(() => {
    window.location.href = "board.html";
  }, 100);
}

//taskForm render function

async function renderTaskForm(taskStatus, renderLocation) {
  await fillSortedUsersObject();
  renderTaskFormTemplate(taskStatus, renderLocation);
  fillUserDropdown();
  fillCategoryDropdown();
  renderSubtasksToList();
}

function renderTaskFormTemplate(taskStatus, renderLocation) {
  let taskForm = document.getElementById(renderLocation);
  titleAcceptTaskButton = "Create Task";
  let fetchStatus = "POST";
  let postOrPatchFunction = "postTaskData";
  taskForm.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, renderLocation, fetchStatus, postOrPatchFunction);
}

function fillUserDropdown() {
  let userDropdown = document.getElementById("userDropdown");
  for (let i = 0; i < sortedUsers.length; i++) {
    userDropdown.innerHTML += nameListTemplate(sortedUsers[i].id);
  }
}

function toggleUserInTaskForm(userFirebaseId) {
  toggleUserInTaskUsersArray(userFirebaseId);
  addUserToTaskToggleCss(userFirebaseId);
  clearUserInputInsideTaskFrom();
  renderIconsInTaskForm(userFirebaseId);
}

function renderIconsInTaskForm() {
  let userIconContainer = document.getElementById("taskFormUserIcon");
  let plusUserIcons = document.getElementById("plusUserIcons");
  let numberUserIcons = document.getElementById("numberUserIcons");
  userIconContainer.innerHTML = "";

  let maxIconsToShow = 4;
  for (let i = 0; i < taskFormCurrentUsersIds.length && i < maxIconsToShow; i++) {
    userIconContainer.innerHTML += iconTemplate(taskFormCurrentUsersIds[i]);
  }

  if (taskFormCurrentUsersIds.length <= maxIconsToShow) {
    plusUserIcons.classList.add("displayNone");
    numberUserIcons.textContent = ""; // Entferne die Anzeige, wenn nicht benötigt
  } else {
    plusUserIcons.classList.remove("displayNone");
    numberUserIcons.textContent = taskFormCurrentUsersIds.length - maxIconsToShow; // Aktualisiere die Anzahl
  }
}


function addUserToTaskToggleCss(userFirebaseId) {
  let check = document.getElementById(`check${userFirebaseId}`);
  let noCheck = document.getElementById(`noCheck${userFirebaseId}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown(${userFirebaseId})`);
  let userDropdown = document.getElementById("userDropdown");

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");
  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");
  userDropdown.classList.remove("maxHeight200");
}

function toggleUserInTaskUsersArray(userFirebaseId) {
  let i = taskFormCurrentUsersIds.indexOf(userFirebaseId);

  if (i === -1) {
    taskFormCurrentUsersIds.push(userFirebaseId);
  } else {
    taskFormCurrentUsersIds.splice(i, 1);
  }
}

function toggleUserInTaskUsersArraySpliceAll() {
  taskFormCurrentUsersIds.splice(0, taskFormCurrentUsersIds.length);
}

function userFilterFunction() {
  let input = document.getElementById("taskFormUserInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userId = sortedUsers[i].id;
    let userElement = document.getElementById(`userContainerInsideUserDropdown(${userId})`);

    if (userElement) {
      // Sicherheitsüberprüfung
      if (userName.includes(filter)) {
        userElement.classList.remove("displayNone");
      } else {
        userElement.classList.add("displayNone");
      }
    } else {
      console.warn(`Element mit ID userContainerInsideUserDropdown(${userId}) nicht gefunden.`);
    }
  }
}

function categoryFilterFunction() {
  let input = document.getElementById("taskFormCategoryInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let categories = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`categoriesDropdown${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

function editTaskInputData(taskStatus) {
  let taskTitleInput = document.getElementById("taskTitleInput").value;
  let taskDescriptionInput = document.getElementById("taskDescriptionInput").value;
  let taskDateInput = document.getElementById("dateInput").value;
  let chosenCategory = document.getElementById("taskFormCategoryInput").value;
  let createTaskData = {
    taskTitle: taskTitleInput,
    taskDescription: taskDescriptionInput,
    taskAssignedUsersIds: taskFormCurrentUsersIds,
    taskDate: taskDateInput,
    taskPrio: taskPrioInput,
    taskStatus: taskStatus,
    taskCategory: chosenCategory,
    taskSubtasks: subtasks,
  };
  return createTaskData;
}

//open signedUserDropdown

function openSignedUserDropdown() {
  let userProfileDropdown = document.getElementById("userProfileDropdown");
  userProfileDropdown.classList.remove("displayNone");
}

function logOut() {
  localStorage.removeItem("loggedUserInitials");
  window.location.href = "landingpage_login.html";
}

addEventListener("click", (event) => {
  if (!window.location.href.includes("landingpage")) {
    let userProfileButton = document.getElementById("userPorfileButton");
    let userProfileDropdown = document.getElementById("userProfileDropdown");
    if (!userProfileButton.contains(event.target)) {
      userProfileDropdown.classList.add("displayNone");
    }
  }
});

//profile Button

function renderProfileButtonTemplate() {
  let profileButtonBox = document.querySelector(".profileButtonBox");
  let loggedUserInitials = localStorage.getItem("loggedUserInitials");
  profileButtonBox.innerHTML = profileButtonTemplate();

  if (loggedUserInitials) {
    document.getElementById("profileInitials").innerHTML = loggedUserInitials;
  } else {
    document.getElementById("profileInitials").innerHTML = "G";
  }
}
