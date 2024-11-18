async function createLokalTasksArray() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  addFirebaseIDtoLokalTasksArray();
}

function convertUnsortedTasksObjectToArray() {
  lokalTasksArray = Object.values(allUnsortedTasks);
}

function addFirebaseIDtoLokalTasksArray() {
  lokalTasksArray = lokalTasksArray.map((item, index) => ({
    ...item,
    ID: Object.keys(allUnsortedTasks)[index],
  }));
}

async function initializeBoard() {
  await createLokalTasksArray();
  await loadUserDataFromFirebase();
  renderTaskCards();
}

function updateLokalTaskArrayStatus(newTaskStatus) {
  const task = lokalTasksArray.find((item) => item.ID === currentDraggedElementID);
  task.taskStatus = newTaskStatus;
}

async function handleSearchInput() {
  clearAllTaskWrappers();
  await renderTaskCards();
}

async function renderTaskCards() {
  let filteredLokalTasksArray = filterTasks();
  clearAllTaskCardWrappers();

  for (let taskIndex = 0; taskIndex < filteredLokalTasksArray.length; taskIndex++) {
    let currentElement = getElementByTaskStatus(filteredLokalTasksArray[taskIndex].taskStatus);
    let taskCardAllInitialsTemplate = returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray);
    let subtasksDone = countCompletedSubtasks(filteredLokalTasksArray[taskIndex]);
    const subtasksArrayLength = filteredLokalTasksArray[taskIndex].taskSubtasks?.length || 0;
    let subtaskDonePercentage = calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength);

    currentElement.innerHTML += taskCardTemplate(taskIndex, filteredLokalTasksArray, taskCardAllInitialsTemplate, subtasksArrayLength, subtasksDone, subtaskDonePercentage);
  }
  fillEmptyTaskCategories();
}

function filterTasks() {
  const searchTerm = document.getElementById("findTaskInput").value.toLowerCase();
  return lokalTasksArray.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm));
}

function calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength) {
  return subtasksArrayLength === 0 ? 0 : (subtasksDone / subtasksArrayLength) * 100;
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("dragend", handleDragEnd);
  document.addEventListener("drop", handleInvalidDrop);
  initializeDropZoneEffects();
});

function initializeDropZoneEffects() {
  const dropZones = document.querySelectorAll("[ondrop]");
  dropZones.forEach((zone) => {
    zone.addEventListener("dragenter", handleDragEnter);
    zone.addEventListener("dragleave", handleDragLeave);
  });
}

function handleDragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drop-zone-active");
  const noTaskContainer = e.currentTarget.querySelector(".noTasksContainer");
  if (noTaskContainer) {
    noTaskContainer.classList.add("no-tasks-dragging");
  }
}

function handleDragLeave(e) {
  if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
    e.currentTarget.classList.remove("drop-zone-active");
    const noTaskContainer = e.currentTarget.querySelector(".noTasksContainer");
    if (noTaskContainer) {
      noTaskContainer.classList.remove("no-tasks-dragging");
    }
  }
}

function startDragging(id) {
  currentDraggedElementID = id;
  setDraggingStateForCardStyle("floating");
}

function handleDragEnd() {
  const dropZones = document.querySelectorAll("[ondrop]");
  dropZones.forEach((zone) => {
    zone.classList.remove("drop-zone-active");
    const noTaskContainer = zone.querySelector(".noTasksContainer");
    if (noTaskContainer) {
      noTaskContainer.classList.remove("no-tasks-dragging");
    }
  });
  setDraggingStateForCardStyle("landed");
}

function handleInvalidDrop(event) {
  event.preventDefault();
  const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
  if (currentCardElement) {
    currentCardElement.classList.remove("hidden");
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(newTaskStatus) {
  try {
    const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
    if (currentCardElement) {
      currentCardElement.remove();
    }
    updateLokalTaskArrayStatus(newTaskStatus);
    renderTaskCards();
    await putNewTaskStatus(newTaskStatus);
    await createLokalTasksArray();
  } catch (error) {
    console.error("Error updating task status:", error);
  } finally {
    const dropZones = document.querySelectorAll("[ondrop]");
    dropZones.forEach((zone) => {
      zone.classList.remove("drop-zone-active");
      const noTaskContainer = zone.querySelector(".noTasksContainer");
      if (noTaskContainer) {
        noTaskContainer.classList.remove("no-tasks-dragging");
      }
    });
  }
}

function setDraggingStateForCardStyle(state) {
  const currentCardElement = document.getElementById("taskCard" + currentDraggedElementID);
  if (!currentCardElement) return;

  if (state === "floating") {
    currentCardElement.classList.add("hidden");
  } else {
    currentCardElement.classList.remove("hidden");
  }
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
    document.getElementById(wrapperId).innerHTML = "";
  });
}

function returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray) {
  let taskCardAllInitialsTemplate = "";
  const userIds = filteredLokalTasksArray[taskIndex].taskAssignedUsersIds;

  for (let userIndex = 0; userIndex < userIds.length; userIndex++) {
    const currentUserID = userIds[userIndex];
    taskCardAllInitialsTemplate += taskCardSingleInitialsTemplate(currentUserID);
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
  if (!task.taskSubtasks) return 0;
  return task.taskSubtasks.reduce((count, subtask) => (subtask.subtaskDone ? count + 1 : count), 0);
}

let popupElement = document.getElementById("boardTaskPopup");
let popupBackgroundElement = document.getElementById("boardPopupBackground");

function openBoardTaskPopup(taskID) {
  renderBoardTaskPopupContent(taskID);
  renderBoardTaskPopupContentUsers(taskID);
  renderBoardTaskPopupSubtasks(taskID);
  popupElement.style.display = "flex";
  popupBackgroundElement.style.display = "flex";
  popupElement.addEventListener("click", stopPropagation);
}

function closeBoardTaskPopup(event) {
  if (!event || event.target === popupBackgroundElement) {
    popupElement.style.display = "none";
    popupBackgroundElement.style.display = "none";
    popupElement.removeEventListener("click", stopPropagation);
    renderTaskCards();
  }
}

function renderBoardTaskPopupContent(taskID) {
  popupElement.innerHTML = boardTaskPopupTemplate(taskID);
}

function renderBoardTaskPopupContentUsers(taskID) {
  const popupUsersElement = document.getElementById("boardTaskPopupContentAssignedToUserWrapper");
  popupUsersElement.innerHTML = "";
  const userIds = allUnsortedTasks[taskID].taskAssignedUsersIds;

  userIds.forEach((userId) => {
    popupUsersElement.innerHTML += popupUserTemplate(userId);
  });
}

function renderBoardTaskPopupSubtasks(taskID) {
  const popupSubtasksElement = document.getElementById("boardTaskPopupContentSubtasksList");
  popupSubtasksElement.innerHTML = "";

  allUnsortedTasks[taskID].taskSubtasks?.forEach((subtask, index) => {
    popupSubtasksElement.innerHTML += popupSubtaskTemplate(index, taskID);
    const iconSrc = subtask.subtaskDone ? "../images/icons/checked.png" : "../images/icons/unchecked.png";
    document.getElementById(`boardTaskPopupContentSubtaskIcon${index}`).src = iconSrc;
  });
}

async function toggleSubtaskStatus(subtasksIndex, taskID) {
  allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone = !allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone;
  let newSubtaskStatus = allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone;

  renderBoardTaskPopupSubtasks(taskID);
  await toggleSubtaskStatusOnFirebase(subtasksIndex, taskID, newSubtaskStatus);
}

function toggleBoardTaskForm() {
  document.getElementById("taskFormBoardContainer").classList.toggle("displayNone");
}

function stopPropagation(event) {
  event.stopPropagation();
}

function renderTaskFormEdit(taskID) {
  let titleAcceptTaskButton = "Ok";
  let taskStatus = allUnsortedTasks[taskID].taskStatus;
  let taskForm = document.getElementById("taskFormBoard");
  taskForm.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton);
  fillUserDropdown();
  insertUserIconsInsideAssign();
  fillCategoryDropdown();
  renderSubtasksToList();
}

function fillTaskFormEdit(taskId) {
  let titleInput = document.getElementById("taskTitleInput");
  let descriptionInput = document.getElementById("taskDescriptionInput");
  let dateInput = document.getElementById("dateInput");
  let categoryInput = document.getElementById("taskFormCategoryInput");

  titleInput.value = allUnsortedTasks[taskId].taskTitle;
  descriptionInput.value = allUnsortedTasks[taskId].taskDescription;
  dateInput.value = allUnsortedTasks[taskId].taskDate;
  categoryInput.value = allUnsortedTasks[taskId].taskCategory;
}
