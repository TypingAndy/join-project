async function createLokalTasksArray() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  addFirebaseIDtoLokalTasksArray();
}
// is needed in script cause board use it too
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

function updateLokalTaskArrayStatus(newTaskStatus, taskID = currentDraggedElementID) {
  const task = lokalTasksArray.find((item) => item.ID === taskID);
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

function replaceTaskCardWithMoveToTemplate(taskID) {
  renderTaskCards();
  document.getElementById(`taskCard${taskID}`).innerHTML = taskCardMoveToTemplate(taskID);
}

function filterTasks() {
  const searchTerm = document.getElementById("findTaskInput").value.toLowerCase();
  return lokalTasksArray.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm));
}

function calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength) {
  return subtasksArrayLength === 0 ? 0 : (subtasksDone / subtasksArrayLength) * 100;
}

// hold to move logic
function startHold(e, taskID) {
  // Only prevent context menu, not all default behavior
  if (e.type === "contextmenu") {
    e.preventDefault();
  }
  window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  touchStartTime = new Date().getTime();
  isTouchMoving = false;

  setTimeout(() => {
    if (!isTouchMoving) {
      document.getElementById(`taskCard${taskID}`).classList.add("growing");
    }
  }, 200);

  touchTimer = setTimeout(() => {
    const currentTime = new Date().getTime();
    if (!isTouchMoving && currentTime - touchStartTime >= 600) {
      e.preventDefault();
      replaceTaskCardWithMoveToTemplate(taskID);
    }
  }, 700);
}

function checkScroll(e) {
  isTouchMoving = true;
}

function clearHold() {
  touchStartTime = 0;
  clearTimeout(touchTimer);

  // Restore context menu after short delay
  setTimeout(() => {
    window.oncontextmenu = null;
  }, 100);
}

// drag n drop logic

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

async function moveTo(newTaskStatus, taskID = currentDraggedElementID) {
  try {
    const currentCardElement = document.getElementById("taskCard" + taskID);
    if (currentCardElement) {
      currentCardElement.remove();
    }
    updateLokalTaskArrayStatus(newTaskStatus, taskID);
    renderTaskCards();
    await putNewTaskStatus(newTaskStatus, taskID);
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

function openBoardTaskPopup(taskID) {
  let popupBackgroundElement = document.getElementById("boardPopupBackground");
  let popupElement = document.getElementById("boardTaskPopup");

  renderBoardTaskPopupContent(taskID);
  renderBoardTaskPopupContentUsers(taskID);
  renderBoardTaskPopupSubtasks(taskID);
  popupElement.style.display = "flex";
  popupBackgroundElement.style.display = "flex";
  popupElement.addEventListener("click", stopPropagation);
  document.body.classList.add("no-scroll");
}

function createBoardTaskPopupForNewTask(taskStatus) {
  subtasks.splice(0, subtasks.length);
  openBoardTaskPopupForAddTask();
  fillBoardTaskPopupWithAddTask(taskStatus);
}

function openBoardTaskPopupForAddTask() {
  let popupBackgroundElement = document.getElementById("boardPopupBackground");
  let popupElement = document.getElementById("boardTaskPopup");
  popupElement.innerHTML = boardTaskPopupTemplateEmpty();
  popupElement.style.display = "flex";
  popupBackgroundElement.style.display = "flex";
  popupElement.addEventListener("click", stopPropagation);
}

function fillBoardTaskPopupWithAddTask(taskStatus) {
  let titleAcceptTaskButton = "Create Task";
  let postOrPatchFunction = "postTaskData";
  let wrapper = document.getElementById("boardTaskPopupContentWrapper");
  wrapper.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, (id = ""), (fetchStatus = ""), postOrPatchFunction);
  fillUserDropdown();
  insertUserIconsInsideAssign();
  fillCategoryDropdown();
}

function closeBoardTaskPopup(event) {
  let popupBackgroundElement = document.getElementById("boardPopupBackground");
  let popupElement = document.getElementById("boardTaskPopup");
  document.body.classList.remove("no-scroll");

  if (!event || event.target === popupBackgroundElement) {
    popupElement.style.display = "none";
    popupBackgroundElement.style.display = "none";
    popupElement.removeEventListener("click", stopPropagation);
    renderTaskCards();
  }
}

function renderBoardTaskPopupContent(taskID) {
  let popupElement = document.getElementById("boardTaskPopup");

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

function stopPropagation(event) {
  event.stopPropagation();
}

function renderTaskFormEdit(taskID) {
  // openBoardTaskPopupForAddTask();
  let titleAcceptTaskButton = "Ok";
  let fetchStatus = "PATCH";
  let taskStatus = allUnsortedTasks[taskID].taskStatus;
  let taskForm = document.getElementById("boardTaskPopupContentWrapper");
  let postOrPatchFunction = "updateTaskData";
  taskForm.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, taskID, fetchStatus, postOrPatchFunction);
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
  toggleTaskCurrentUserInTaskFormEdit(taskId);
  dateInput.value = allUnsortedTasks[taskId].taskDate;
  setTaskPrio(allUnsortedTasks[taskId].taskPrio);
  categoryInput.value = allUnsortedTasks[taskId].taskCategory;
  fillSubtaskListInTaskFormEdit(taskId);
}

function toggleTaskCurrentUserInTaskFormEdit(taskId) {
  for (let i = 0; i < allUnsortedTasks[taskId].taskAssignedUsersIds.length; i++) {
    toggleUserInTaskForm(allUnsortedTasks[taskId].taskAssignedUsersIds[i]);
  }
}

function fillSubtaskListInTaskFormEdit(taskId) {
  let subtaskList = document.getElementById("taskFormSubtaskList");
  subtaskList.innerHTML = "";
  subtasks = allUnsortedTasks[taskId].taskSubtasks;
  for (let i = 0; i < allUnsortedTasks[taskId].taskSubtasks.length; i++) {
    subtaskList.innerHTML += subtaskTemplate(i);
  }
}

function focusOnSearchBar() {
  let inputElement = document.getElementById("findTaskInput");

  inputElement.focus();
}

document.addEventListener(
  "click",
  function () {
    if (document.getElementById("boardTaskPopup")) {
      setTimeout(() => {
        let dropdown = document.getElementById("userDropdown");

        if (dropdown) {
          dropdown.addEventListener("mousedown", function (event) {
            event.preventDefault();
          });
        }
      }, 100);
    }
  },
  true
);


// document.addEventListener(
//   "click",
//   () => {
//     if (document.getElementById("boardTaskPopup")) {
//       setTimeout(() => {
//         let subtaskBox = document.getElementById("taskFormSubtaskList");

//         if (subtaskBox) {
//           document.addEventListener(
//             "mousedown",
//             function (event) {
//               if (!subtaskBox.contains(event.target)) {
//                     renderSubtasksToList();
//               }
//             },
//             true
//           );
//         }
//       }, 100);
//     }
//   },
//   true
// );
