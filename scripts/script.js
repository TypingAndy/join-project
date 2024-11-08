let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
let signUpData = {};
let responseToJson;

let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
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



function rednerTaskFormTemplate() {
  let taskForm = document.getElementById("taskForm");
  taskForm.innerHTML = taskFormTemplate();
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
