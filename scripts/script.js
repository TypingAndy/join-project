let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
let signUpData = {};
let responseToJson;
let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"]; //is needed
let policyAccepted = false;
let passwordMatch = false;

//addTaskGlobalArrays
let taskPrioInput = "";
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
