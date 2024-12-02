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
  let searchTerm = document.getElementById("findTaskInput").value.toLowerCase();
  return lokalTasksArray.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm) || task.taskDescription.toLowerCase().includes(searchTerm));
}

function calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength) {
  return subtasksArrayLength === 0 ? 0 : (subtasksDone / subtasksArrayLength) * 100;
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
  let wrappers = ["inProgressContentWrapper", "toDoSectionContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];
  wrappers.forEach((wrapperId) => {
    document.getElementById(wrapperId).innerHTML = "";
  });
}

function returnUserInitialsForTaskCards(taskIndex, filteredLokalTasksArray) {
  let taskCardAllInitialsTemplate = "";

  if (!filteredLokalTasksArray[taskIndex].taskAssignedUsersIds) {
    return "";
  }
  const userIds = filteredLokalTasksArray[taskIndex].taskAssignedUsersIds;
  const userMaxLength = 4;
  const plusNumber = userIds.length - userMaxLength;

  for (let userIndex = 0; userIndex < (userIds.length > userMaxLength ? userMaxLength : userIds.length); userIndex++) {
    const currentUserID = userIds[userIndex];
    taskCardAllInitialsTemplate += taskCardSingleInitialsTemplate(currentUserID);
  }
  if (userIds.length > userMaxLength) {
    taskCardAllInitialsTemplate += taskCardSingleInitialsPlusTemplate(plusNumber);
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

  popupBackgroundElement.style.display = "flex";
  void popupElement.offsetWidth;
  popupElement.classList.add("active");
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
  popupBackgroundElement.style.display = "flex";
  void popupElement.offsetWidth;
  popupElement.classList.add("active");
  popupElement.addEventListener("click", stopPropagation);
  document.body.classList.add("no-scroll");
}

function fillBoardTaskPopupWithAddTask(taskStatus) {
  let titleAcceptTaskButton = "Create Task";
  let postOrPatchFunction = "postTaskData";
  let wrapper = document.getElementById("boardTaskPopupContentWrapper");
  wrapper.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, (id = ""), (fetchStatus = ""), postOrPatchFunction);
  fillUserDropdown();
  fillCategoryDropdown();
}

function closeBoardTaskPopup(event) {
  let popupBackgroundElement = document.getElementById("boardPopupBackground");
  let popupElement = document.getElementById("boardTaskPopup");

  if (!event || event.target === popupBackgroundElement) {
    popupElement.classList.remove("active");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      popupBackgroundElement.style.display = "none";
      popupElement.removeEventListener("click", stopPropagation);
      renderTaskCards();
      toggleUserInTaskUsersArraySpliceAll();
    }, 300);
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
  if (userIds) {
    userIds.forEach((userId) => {
      popupUsersElement.innerHTML += popupUserTemplate(userId);
    });
  }
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
  let titleAcceptTaskButton = "Ok";
  let fetchStatus = "PATCH";
  let taskStatus = allUnsortedTasks[taskID].taskStatus;
  let taskForm = document.getElementById("boardTaskPopupContentWrapper");
  let postOrPatchFunction = "updateTaskData";
  taskForm.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, taskID, fetchStatus, postOrPatchFunction);
  fillUserDropdown();
  fillCategoryDropdown();
  renderSubtasksToList();
  validateTaskForm();
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
  categoryInput.value = allUnsortedTasks[taskId].taskCategory.category;
  fillSubtaskListInTaskFormEdit(taskId);
  validateTaskForm();
}

function toggleTaskCurrentUserInTaskFormEdit(taskId) {
  if (allUnsortedTasks[taskId].taskAssignedUsersIds) {
    for (let i = 0; i < allUnsortedTasks[taskId].taskAssignedUsersIds.length; i++) {
      toggleUserInTaskForm(allUnsortedTasks[taskId].taskAssignedUsersIds[i]);
    }
  }
}

function fillSubtaskListInTaskFormEdit(taskId) {
  let subtaskList = document.getElementById("taskFormSubtaskList");
  subtaskList.innerHTML = "";
  let task = allUnsortedTasks[taskId];
  if (!task.taskSubtasks) {
    return;
  }
  subtasks = task.taskSubtasks;
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.innerHTML += subtaskTemplate(i);
  }
}

function deleteTask(taskFirebaseID) {
  deleteTaskFromFirebase(taskFirebaseID);
  redirectToBoard();
}

function editTaskInputData(taskStatus) {
  let taskTitleInput = document.getElementById("taskTitleInput").value;
  let taskDescriptionInput = document.getElementById("taskDescriptionInput").value;
  let taskDateInput = document.getElementById("dateInput").value;
  let createTaskData = {
    taskTitle: taskTitleInput,
    taskDescription: taskDescriptionInput,
    taskAssignedUsersIds: taskFormCurrentUsersIds,
    taskDate: taskDateInput,
    taskPrio: taskPrioInput,
    taskStatus: taskStatus,
    taskCategory: categoryData,
    taskSubtasks: subtasks,
  };
  return createTaskData;
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
