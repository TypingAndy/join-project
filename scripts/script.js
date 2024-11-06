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

function insertMinSelectableDate() {
  document.getElementById("dateInput").setAttribute("min", getCurrentDate());
}

function getCurrentDate() {
  let currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
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

function editTaskInputData() {
  let taskTitleInput = document.getElementById("editPopupTitleInput").value;
  let taskDescriptionInput = document.getElementById("editPopupDescriptionInput").value;
  let taskDateInput = document.getElementById("editPopupDateInput").value;
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
