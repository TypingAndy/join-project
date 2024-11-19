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
  console.log(sortedUsers);
}

// navigation

function redirectToBoard() {
  setTimeout(() => {
    window.location.href = "board.html";
  }, 100);
}

//taskForm render function

function renderTaskFormTemplate(taskStatus, id) {
  let taskForm = document.getElementById(id);
  titleAcceptTaskButton = "Create Task";
  taskForm.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton);
}

async function renderTaskForm(taskStatus, id) {
  await fillSortedUsersObject();
  renderTaskFormTemplate(taskStatus, id);
  fillUserDropdown();
  insertUserIconsInsideAssign();
  fillCategoryDropdown();
  renderSubtasksToList();
}

function fillUserDropdown() {
  let userDropdown = document.getElementById("userDropdown");
  for (let i = 0; i < sortedUsers.length; i++) {
    userDropdown.innerHTML += nameListTemplate(i, sortedUsers);
  }
}

function toggleUserInTaskForm(i, sortedUsersID) {
  addUserToTaskToggleCss(i);
  toggleUserInTaskUsersArray(sortedUsersID);
  clearUserInputInsideTaskFrom();

}

function addUserToTaskToggleCss(i) {
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown${i}`);
  let userIcon = document.getElementById(`taskFormUserIcon${i}`);
  let userDropdown = document.getElementById("userDropdown");

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");
  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");
  userIcon.classList.toggle("displayNone");
  userDropdown.classList.toggle("maxHeight200");
}

function toggleUserInTaskUsersArray(userIndex) {
  let index = taskFormCurrentUsersIds.indexOf(userIndex);

  if (index === -1) {
    taskFormCurrentUsersIds.push(userIndex);
  } else {
    taskFormCurrentUsersIds.splice(index, 1);
  }
}

function insertUserIconsInsideAssign() {
  let userIconContainer = document.getElementById("taskFormUserIcon");

  for (let i = 0; i < sortedUsers.length; i++) {
    userIconContainer.innerHTML += iconTemplate(i, sortedUsers);
  }
}

function userFilterFunction() {
  let input = document.getElementById("taskFormUserInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`userContainerInsideUserDropdown${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

function categoryFilterFunction() {
  let input = document.getElementById("taskFormCategoryInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < categories.length; i++) {
    let categoriesUpperCase = categories[i].toUpperCase();
    let categoryElement = document.getElementById(`categoriesDropdown${i}`);

    if (categoriesUpperCase.includes(filter)) {
      categoryElement.classList.remove("displayNone");
    } else {
      categoryElement.classList.add("displayNone");
    }
  }
}

//taskForm edit functions

// function editTaskInputData(taskStatus) {
//   let taskTitleInput = document.getElementById("editPopupTitleInput").value;
//   let taskDescriptionInput = document.getElementById("editPopupDescriptionInput").value;
//   let taskDateInput = document.getElementById("editPopupDateInput").value;
//   let createTaskData = {
//     taskTitle: taskTitleInput,
//     taskDescription: taskDescriptionInput,
//     taskAssignedUser: addTaskCurrentUser,
//     taskDate: taskDateInput,
//     taskPrio: taskPrioInput,
//     taskStatus: taskStatus,
//     taskCategory: chosenCategory,
//     taskSubtasks: subtasks,
//   };
//   return createTaskData;
// }
