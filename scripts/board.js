async function createLokalTasksArray() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  addFirebaseIDtoLokalTasksArray();
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
  let filteredLokalTasksArray = filterTasks();
  let allUsers = await loadUserDataFromFirebase();
  clearAllTaskCardWrappers();
  for (let taskIndex = 0; taskIndex < filteredLokalTasksArray.length; taskIndex++) {
    let currentElement = getElementByTaskStatus(filteredLokalTasksArray[taskIndex].taskStatus);
    let taskCardAllInitialsTemplate = returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray, allUsers);
    let subtasksDone = countCompletedSubtasks(filteredLokalTasksArray[taskIndex]);
    const subtasksArrayLength = filteredLokalTasksArray[taskIndex].taskSubtasks ? filteredLokalTasksArray[taskIndex].taskSubtasks.length : 0;
    let subtaskDonePercentage = calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength);

    currentElement.innerHTML += taskCardTemplate(taskIndex, filteredLokalTasksArray, taskCardAllInitialsTemplate, subtasksArrayLength, subtasksDone, subtaskDonePercentage);
  }
  fillEmptyTaskCategories();
}

function filterTasks() {
  let searchTerm = document.getElementById("findTaskInput").value;
  return lokalTasksArray.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()));
}

function calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength) {
  return (subtasksDone / subtasksArrayLength) * 100;
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

function clearAllTaskCardWrappers() {
  const wrappers = ["inProgressContentWrapper", "toDoSectionContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];
  wrappers.forEach((wrapperId) => {
    const wrapper = document.getElementById(wrapperId);
    wrapper.innerHTML = "";
  });
}

function returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray, allUsers) {
  let taskCardAllInitialsTemplate = "";
  let userIdAmountInCurrentTask = filteredLokalTasksArray[taskIndex].taskAssignedUsersIds.length;
  for (let userIndex = 0; userIndex < userIdAmountInCurrentTask; userIndex++) {
    let currentUserID = filteredLokalTasksArray[taskIndex].taskAssignedUsersIds[userIndex];
    taskCardAllInitialsTemplate += taskCardSingleInitialsTemplate(allUsers, currentUserID);
  }
  return taskCardAllInitialsTemplate;
}

function clearAllTaskWrappers() {
  const containers = ["toDoSectionContentWrapper", "inProgressContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];

  containers.forEach((containerId) => {
    document.getElementById(containerId).innerHTML = "";
  });
}

function countCompletedSubtasks(task) {
  let completedCount = 0;
  for (let subtask of task.taskSubtasks) {
    if (subtask.subtaskDone === true) {
      completedCount++;
    }
  }
  return completedCount;
}

function startDragging(id) {
  currentDraggedElementID = id;
  setDraggingStateForCardStyle(id, "floating");
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(newTaskStatus) {
  await putNewTaskStatus(newTaskStatus);
  renderTaskCards();
  setDraggingStateForCardStyle(id, "landed");
}

function setDraggingStateForCardStyle(id, state) {
  let currentDraggingCardState = state;
  console.log(currentDraggingCardState);
  return currentDraggingCardState;
}

function styleCardBasedOnDraggingState() {}

let popupElement = document.getElementById("boardTaskPopup");
let popupBackgroundELement = document.getElementById("boardPopupBackground");

function openBoardTaskPopup(taskID) {
  renderBoardTaskPopupContent(taskID);
  renderBoardTaskPopupContentUsers(taskID);
  renderBoardTaskPopupSubtasks(taskID);
  popupElement.style.display = "flex";
  popupBackgroundELement.style.display = "flex";
  popupElement.addEventListener("click", stopPropagation);
}

function closeBoardTaskPopup() {
  popupElement.style.display = "none";
  popupBackgroundELement.style.display = "none";
  popupElement.removeEventListener("click", stopPropagation);
  renderTaskCards();
}

function renderBoardTaskPopupContent(taskID) {
  popupElement.innerHTML = boardTaskPopupTemplate(taskID);
}

function renderBoardTaskPopupContentUsers(taskID) {
  let popupUsersElement = document.getElementById("boardTaskPopupContentAssignedToUserWrapper");
  popupUsersElement.innerHTML = "";
  let usersAmount = allUnsortedTasks[taskID].taskAssignedUsersIds.length;
  let currentUserId = "";

  for (let usersIndex = 0; usersIndex < usersAmount; usersIndex++) {
    currentUserId = allUnsortedTasks[taskID].taskAssignedUsersIds[usersIndex];
    popupUsersElement.innerHTML += popupUserTemplate(currentUserId);
  }
}

function renderBoardTaskPopupSubtasks(taskID) {
  let popupSubtasksElement = document.getElementById("boardTaskPopupContentSubtasksList");
  popupSubtasksElement.innerHTML = "";
  for (let subtasksIndex = 0; subtasksIndex < allUnsortedTasks[taskID].taskSubtasks.length; subtasksIndex++) {
    popupSubtasksElement.innerHTML += popupSubtaskTemplate(subtasksIndex, taskID);
    if (allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone) {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "../images/icons/checked.png";
    } else {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "../images/icons/unchecked.png";
    }
  }
}

function boardTaskPopupChangeSubtaskStatus(subtasksIndex, taskID) {
  allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].done = !allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].done;
  setSubtaskDonetoTrueOrFalseOnFirebase(subtasksIndex, taskID);
  renderBoardTaskPopupSubtasks(taskID);
}

function setSubtaskDonetoTrueOrFalseOnFirebase(subtasksIndex, taskID) {
  let taskStatus = allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].done;
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

function renderTaskFormEdit(taskID) {
  console.log(allUnsortedTasks[taskID]);
  

}
