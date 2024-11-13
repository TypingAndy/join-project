let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
let signUpData = {};
let responseToJson;

let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"]; //is needed
let policyAccepted = false;
let passwordMatch = false;

//addTaskGlobalArrays
let taskPrioInput = "";
let fullNameList = [];
let taskFormCurrentUsersIds = []; //is needed
let userUniqueId = [];
let categories = ["Cleaning", "Company Outing", "Cooking", "Meetings", "Others", "Technical Task", "User Story"]; //is needed
let subtasks = []; //is needed
let globalSubtaskId = "";

//boardGlobalArrays
let convertedTasks = []; //is needed
let allUnsortedTasks = [];
let toDoTasks = [];
let doneTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];
let currentDraggedElementID;
let currentNumberedID = "";

//contactGlobalArray
let allContacts = [];
let contactIndices = [];
let renderedContact = [];
let contactId;

//often Used functions

function stopPropagation(event) {
  event.stopPropagation();
}

function getColorFromUser(i) {
  return sortedUsers[i].color;
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
  taskForm.innerHTML = taskFormTemplate(taskStatus);
}

function renderTaskForm(taskStatus, id) {
  renderTaskFormTemplate(taskStatus, id), fillUserDropdown();
  insertUserIconsInsideAssign();
  fillCategoryDropdown();
  renderSubtasksToList();
}

async function fillUserDropdown() {
  let userDropdown = document.getElementById("userDropdown");
  sortedUsers = await sortUserData();
  console.log(sortedUsers);

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
