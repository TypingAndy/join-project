let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
let signUpData = {};
let responseToJson;
let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"]; //is needed
let policyAccepted = false;
let passwordMatch = false;

//addTaskGlobalArrays
let taskPrioInput = ""; //is needed
let taskFormCurrentUsersIds = []; //is needed
let categories = ["Cleaning", "Company Outing", "Cooking", "Meetings", "Others", "Technical Task", "User Story"]; //is needed
let subtasks = []; //is needed

//boardGlobalArrays
let sortedUsers = []; //is needed
let unsortedUsers = {};
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
  insertUserIconsInsideAssign();
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
  addUserToTaskToggleCss(userFirebaseId);
  toggleUserInTaskUsersArray(userFirebaseId);
  clearUserInputInsideTaskFrom();
}

function addUserToTaskToggleCss(userFirebaseId) {
  let check = document.getElementById(`check${userFirebaseId}`);
  let noCheck = document.getElementById(`noCheck${userFirebaseId}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown(${userFirebaseId})`);
  let userIcon = document.getElementById(`taskFormUserIcon${userFirebaseId}`);
  let userDropdown = document.getElementById("userDropdown");

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");
  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");
  userIcon.classList.toggle("displayNone");
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

function insertUserIconsInsideAssign() {
  let userIconContainer = document.getElementById("taskFormUserIcon");

  for (let i = 0; i < sortedUsers.length; i++) {
    userIconContainer.innerHTML += iconTemplate(sortedUsers[i].id);
  }
}

function userFilterFunction() {
  let input = document.getElementById("taskFormUserInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userId = sortedUsers[i].id;
    let userElement = document.getElementById(`userContainerInsideUserDropdown(${userId})`);

    if (userElement) { // Sicherheitsüberprüfung
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
let userProfileDropdown = document.getElementById('userProfileDropdown');
userProfileDropdown.classList.remove('displayNone');
}


function logOut() {
  window.location.href='landingpage_login.html'
}

addEventListener('click', (event) =>  {
  let userProfileButton = document.getElementById('userPorfileButton');
  let userProfileDropdown = document.getElementById('userProfileDropdown');
if (!userProfileButton.contains(event.target)) {
  userProfileDropdown.classList.add('displayNone')
}
});



