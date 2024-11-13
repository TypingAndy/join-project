async function createLokalTasksArray() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  addFirebaseIDtoLokalTasksArray();
  console.log(lokalTasksArray);
}

function convertUnsortedTasksObjectToArray() {
  lokalTasksArray = Object.values(allUnsortedTasks);
}

function addFirebaseIDtoLokalTasksArray() {
  let newArray = lokalTasksArray.map((item, index) => {
    let id = Object.keys(allUnsortedTasks)[index];
    return { ...item, ID: id };
  });
  lokalTasksArray = newArray;
}

async function handleSearchInput() {
  clearAllTaskWrappers();
  await renderTaskCards();
}

async function renderTaskCards() {
  await createLokalTasksArray();
  let filteredLokalTasksArray = filterTasks(); //lokalArray muss dann mit filterTasks() getauscht werden
  let allUsers = await loadUserDataFromFirebase();

  for (let taskIndex = 0; taskIndex < filteredLokalTasksArray.length; taskIndex++) {
    let currentElement = getElementByTaskStatus(filteredLokalTasksArray[taskIndex].taskStatus);
    let taskCardAllInitialsTemplate = returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray, allUsers);

    currentElement.innerHTML += taskCardTemplate(taskIndex, filteredLokalTasksArray, taskCardAllInitialsTemplate);
  }
  fillEmptyTaskCategories();
}

function filterTasks() {
  let searchTerm = document.getElementById("findTaskInput").value;
  return lokalTasksArray.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()));
}

function getElementByTaskStatus(taskStatus) {
  const statusElements = {
    "to do": "toDoSectionContentWrapper",
    "in progress": "inProgressContentWrapper",
    "await feedback": "awaitFeedbackContentWrapper",
    done: "doneContentWrapper",
  };
  return document.getElementById(statusElements[taskStatus]);
}

function fillEmptyTaskCategories() {
  const wrappers = ["inProgressContentWrapper", "toDoSectionContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];
  wrappers.forEach((wrapperId) => {
    const wrapper = document.getElementById(wrapperId);
    if (wrapper.innerHTML === "") {
      wrapper.innerHTML = noTaskTemplate();
    }
  });
}

function returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray, allUsers) {
  let taskCardAllInitialsTemplate = "";
  let userIdAmountInCurrentTask = filteredLokalTasksArray[taskIndex].taskAssignedUsersIds.length;
  for (let userIndex = 0; userIndex < userIdAmountInCurrentTask; userIndex++) {
    let currentUserID = filteredLokalTasksArray[taskIndex].taskAssignedUsersIds[userIndex];
    taskCardAllInitialsTemplate += taskCardInitialTemplate(allUsers, currentUserID);
  }
  return taskCardAllInitialsTemplate;
}

function clearAllTaskWrappers() {
  const containers = ["toDoSectionContentWrapper", "inProgressContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];

  containers.forEach((containerId) => {
    document.getElementById(containerId).innerHTML = "";
  });
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

let popupElement = document.getElementById("boardTaskPopup");
let popupBackgroundELement = document.getElementById("boardPopupBackground");
function openBoardTaskPopup(i, taskID, numberedTaskID) {
  renderBoardTaskPopupContent(i, taskID, numberedTaskID);
  renderBoardTaskPopupContentUsers(i, numberedTaskID);
  renderBoardTaskPopupSubtasks(i, numberedTaskID);
  popupElement.style.display = "flex";
  popupBackgroundELement.style.display = "flex";
  popupElement.addEventListener("click", stopPropagation);
}

function closeBoardTaskPopup() {
  popupElement.style.display = "none";
  popupBackgroundELement.style.display = "none";
  popupElement.removeEventListener("click", stopPropagation);
  editPopUpAddUserToTask(currentNumberedID);
  loadAllTasks();
}

function renderBoardTaskPopupContent(i, taskID, numberedTaskID) {
  popupElement.innerHTML = boardTaskPopupTemplate(i, taskID, numberedTaskID);
}

function renderBoardTaskPopupContentUsers(i, numberedTaskID) {
  let popupUsersElement = document.getElementById("boardTaskPopupContentAssignedToUserWrapper");
  popupUsersElement.innerHTML = "";
  for (let usersIndex = 0; usersIndex < convertedTasks[numberedTaskID].taskAssignedUser.length; usersIndex++) {
    popupUsersElement.innerHTML += popupUserTemplate(usersIndex, i, numberedTaskID);
  }
}

function renderBoardTaskPopupSubtasks(i, numberedTaskID) {
  let popupSubtasksElement = document.getElementById("boardTaskPopupContentSubtasksList");
  popupSubtasksElement.innerHTML = "";
  for (let subtasksIndex = 0; subtasksIndex < convertedTasks[numberedTaskID].taskSubtasks.length; subtasksIndex++) {
    popupSubtasksElement.innerHTML += popupSubtaskTemplate(subtasksIndex, i, numberedTaskID);
    if (convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done) {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "./images/icons/checked.png";
    } else {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "./images/icons/unchecked.png";
    }
  }
}

function boardTaskPopupChangeSubtaskStatus(subtasksIndex, i, taskFirebaseID, numberedTaskID) {
  convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done = !convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done;
  setSubtaskDonetoTrueOrFalseOnFirebase(i, subtasksIndex, taskFirebaseID, numberedTaskID);
  renderBoardTaskPopupSubtasks(i, numberedTaskID);
}

function setSubtaskDonetoTrueOrFalseOnFirebase(i, subtasksIndex, taskFirebaseID, numberedTaskID) {
  let taskStatus = convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done;
  if (taskStatus === true) {
    fetchSubtaskDoneToTrue(subtasksIndex, taskFirebaseID);
  }
  if (taskStatus === false) {
    fetchSubtaskDoneToFalse(subtasksIndex, taskFirebaseID);
  }
}

// render TaskForm

function toggleBoardTaskForm() {
  let taskForm = document.getElementById("taskFormBoardContainer");
  taskForm.classList.toggle("displayNone");
}
