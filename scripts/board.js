/**
 * Creates the local tasks array by loading tasks from Firebase, converting them to an array, and adding Firebase IDs.
 * @returns {Promise<void>} A promise indicating that the process is complete.
 */
async function createLokalTasksArray() {
  await loadTasksObjectFromFirebase();
  convertUnsortedTasksObjectToArray();
  addFirebaseIDtoLokalTasksArray();
}

/**
 * Converts the unsorted tasks object into an array.
 */
function convertUnsortedTasksObjectToArray() {
  if (allUnsortedTasks) {
    lokalTasksArray = Object.values(allUnsortedTasks);
  }
}

/**
 * Adds the Firebase ID to the tasks in the local array.
 */
function addFirebaseIDtoLokalTasksArray() {
  lokalTasksArray = lokalTasksArray.map((item, index) => ({
    ...item,
    ID: Object.keys(allUnsortedTasks)[index],
  }));
}

/**
 * Initializes the board by creating the local tasks array and loading user data from Firebase.
 * @returns {Promise<void>} A promise indicating that the process is complete.
 */
async function initializeBoard() {
  await createLokalTasksArray();
  await loadUserDataFromFirebase();
  renderTaskCards();
  highlightBoardInNavbar();
}

/**
 * Highlights the Board NavLink
 */

function highlightBoardInNavbar() {
  let navLink = document.getElementById("boardLink");
  navLink.classList.add("currentNavLinkBackground");
}

/**
 * Updates the status of a task in the local tasks array.
 * @param {string} newTaskStatus - The new status of the task (e.g., "to do", "in progress").
 * @param {string} [taskID=currentDraggedElementID] - The ID of the task to update. Defaults to the currently dragged element ID.
 */
function updateLokalTaskArrayStatus(newTaskStatus, taskID = currentDraggedElementID) {
  const task = lokalTasksArray.find((item) => item.ID === taskID);
  task.taskStatus = newTaskStatus;
}

/**
 * Handles the search input and renders the filtered tasks.
 * @returns {Promise<void>} A promise indicating that the process is complete.
 */
async function handleSearchInput() {
  clearAllTaskWrappers();
  await renderTaskCards();
}

/**
 * Renders task cards based on the filtered local tasks array.
 * @returns {Promise<void>} A promise indicating that the process is complete.
 */
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

/**
 * Replaces the task card with a "Move To" template to move it to another location.
 * @param {string} taskID - The ID of the task whose card should be replaced.
 */
function replaceTaskCardWithMoveToTemplate(taskID) {
  renderTaskCards();
  document.getElementById(`taskCard${taskID}`).innerHTML = taskCardMoveToTemplate(taskID);
}

/**
 * Filters the local tasks array based on the search term.
 * @returns {Array} A filtered array of tasks that include the search term.
 */
function filterTasks() {
  let searchTerm = document.getElementById("findTaskInput").value.toLowerCase();
  return lokalTasksArray.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm) || task.taskDescription.toLowerCase().includes(searchTerm));
}

/**
 * Calculates the percentage of completed subtasks.
 * @param {number} subtasksDone - The number of completed subtasks.
 * @param {number} subtasksArrayLength - The total length of the subtasks array.
 * @returns {number} The percentage of completed subtasks.
 */
function calculateSubtaskDonePercentage(subtasksDone, subtasksArrayLength) {
  return subtasksArrayLength === 0 ? 0 : (subtasksDone / subtasksArrayLength) * 100;
}

/**
 * Returns the HTML element corresponding to the task's status.
 * @param {string} taskStatus - The status of the task (e.g., "to do", "in progress").
 * @returns {HTMLElement} The element corresponding to the given status.
 */
function getElementByTaskStatus(taskStatus) {
  const statusElements = {
    "to do": "toDoSectionContentWrapper",
    "in progress": "inProgressContentWrapper",
    "await feedback": "awaitFeedbackContentWrapper",
    done: "doneContentWrapper",
  };
  return document.getElementById(statusElements[taskStatus]);
}

/**
 * Fills empty task categories with a default message if no tasks are present.
 */
function fillEmptyTaskCategories() {
  const wrappers = ["inProgressContentWrapper", "toDoSectionContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];
  wrappers.forEach((wrapperId) => {
    const wrapper = document.getElementById(wrapperId);

    if (wrapper.innerHTML === "") {
      wrapper.innerHTML = noTaskTemplate();
    }

  });
}

/**
 * Clears the content of all task card wrappers.
 */
function clearAllTaskCardWrappers() {
  let wrappers = ["inProgressContentWrapper", "toDoSectionContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];
  wrappers.forEach((wrapperId) => {
    document.getElementById(wrapperId).innerHTML = "";
  });
}

/**
 * Returns the user initials for the task cards based on the assigned user IDs.
 * If there are more than 4 users, it shows a "+" indicating additional users.
 * @param {number} taskIndex - The index of the task in the filtered tasks array.
 * @param {Array} filteredLokalTasksArray - The array of tasks to which the task belongs.
 * @returns {string} A string of user initials, with a "+" if there are more than 4 users.
 */
function returnUserInitialsForTaskCards(taskIndex, filteredTasks) {
  const users = filteredTasks[taskIndex].taskAssignedUsersIds;
  if (!users) return "";

  const maxUsers = 4;
  let initials = "";
  for (let i = 0; i < Math.min(users.length, maxUsers); i++) {
    initials += taskCardSingleInitialsTemplate(users[i]);
  }
  if (users.length > maxUsers) {
    const extraUsers = users.length - maxUsers;
    initials += taskCardSingleInitialsPlusTemplate(extraUsers);
  }
  return initials;
}

/**
 * Clears the content of all task wrappers on the board.
 */
function clearAllTaskWrappers() {
  const containers = ["toDoSectionContentWrapper", "inProgressContentWrapper", "awaitFeedbackContentWrapper", "doneContentWrapper"];
  containers.forEach((containerId) => {
    document.getElementById(containerId).innerHTML = "";
  });
}

/**
 * Counts the number of completed subtasks for a given task.
 * @param {Object} task - The task object to check for completed subtasks.
 * @returns {number} The number of completed subtasks.
 */
function countCompletedSubtasks(task) {
  if (!task.taskSubtasks) return 0;
  return task.taskSubtasks.reduce((count, subtask) => (subtask.subtaskDone ? count + 1 : count), 0);
}

/**
 * Opens the board task popup and displays the content, users, and subtasks for a given task.
 * @param {string} taskID - The ID of the task to display in the popup.
 */
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

/**
 * Handles the click event for adding a new task through the "+" button.
 * Depending on the screen width, it either opens a popup or redirects to a new page.
 *
 * @param {string} newGlobalTaskStatus - The status of the new global task to be added.
 *    This value determines the initial state of the task being created.
 */
function handleAddTaskPlusClicks(newGlobalTaskStatus) {
  globalTaskStatus = newGlobalTaskStatus;

  if (window.innerWidth >= 1024) {
    createBoardTaskPopupForNewTask(globalTaskStatus);
  } else {
    window.location.href = `add_task.html?status=${newGlobalTaskStatus}`;
  }
}

/**
 * Creates a new board task popup for adding a task and pre-fills it with default data.
 * @param {string} taskStatus - The status of the task to be created.
 */
function createBoardTaskPopupForNewTask(taskStatus) {
  subtasks.splice(0, subtasks.length);
  openBoardTaskPopupForAddTask();
  fillBoardTaskPopupWithAddTask(taskStatus);
}

/**
 * Opens the board task popup for adding a new task with an empty template.
 */
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

/**
 * Fills the task popup with the form to add a new task, including the task status and dropdown options.
 * @param {string} taskStatus - The status of the task to be created.
 */
function fillBoardTaskPopupWithAddTask(taskStatus) {
  let titleAcceptTaskButton = "Create Task";
  let postOrPatchFunction = "postTaskData";
  let wrapper = document.getElementById("boardTaskPopupContentWrapper");
  wrapper.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, (id = ""), (fetchStatus = ""), postOrPatchFunction);
  fillUserDropdown();
  fillCategoryDropdown();
  setTaskPrio("medium");
}

/**
 * Closes the task popup when clicking on the background or cancel button.
 * @param {Event} [event] - The event that triggered the close action (optional).
 */
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

/**
 * Renders the content for the task popup based on the provided task ID.
 * @param {string} taskID - The ID of the task to render the popup for.
 */
function renderBoardTaskPopupContent(taskID) {
  let popupElement = document.getElementById("boardTaskPopup");
  popupElement.innerHTML = boardTaskPopupTemplate(taskID);
}

/**
 * Renders the users assigned to the task inside the popup.
 * @param {string} taskID - The ID of the task whose assigned users should be rendered.
 */
function renderBoardTaskPopupContentUsers(taskID) {
  let popupUsersElement = document.getElementById("boardTaskPopupContentAssignedToUserWrapper");
  popupUsersElement.innerHTML = "";
  let userIds = allUnsortedTasks[taskID].taskAssignedUsersIds;
  if (userIds) {
    userIds.forEach((userId) => {
      popupUsersElement.innerHTML += popupUserTemplate(userId);
    });
  }
}

/**
 * Renders the subtasks of a task inside the task popup.
 * @param {string} taskID - The ID of the task whose subtasks should be rendered.
 */
function renderBoardTaskPopupSubtasks(taskID) {
  let popupSubtasksElement = document.getElementById("boardTaskPopupContentSubtasksList");
  popupSubtasksElement.innerHTML = "";

  allUnsortedTasks[taskID].taskSubtasks?.forEach((subtask, index) => {
    popupSubtasksElement.innerHTML += popupSubtaskTemplate(index, taskID);
    let iconSrc = subtask.subtaskDone ? "../images/icons/checked.png" : "../images/icons/unchecked.png";
    document.getElementById(`boardTaskPopupContentSubtaskIcon${index}`).src = iconSrc;
  });
}

/**
 * Toggles the completion status of a subtask by updating its status in the `allUnsortedTasks` object.
 * Also updates the Firebase data and re-renders the subtasks in the task popup.
 * @param {number} subtasksIndex - The index of the subtask within the task.
 * @param {string} taskID - The ID of the task containing the subtask.
 */
async function toggleSubtaskStatus(subtasksIndex, taskID) {
  allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone = !allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone;
  let newSubtaskStatus = allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskDone;

  renderBoardTaskPopupSubtasks(taskID);
  await toggleSubtaskStatusOnFirebase(subtasksIndex, taskID, newSubtaskStatus);
}

/**
 * Deletes a task from Firebase and redirects to the board.
 * @param {string} taskFirebaseID - The Firebase ID of the task to be deleted.
 */
function deleteTask(taskFirebaseID) {
  deleteTaskFromFirebase(taskFirebaseID);
  redirectToBoard();
}

/**
 * Creates a task data object from the form inputs, which can be used to either create or update a task.
 * @param {string} taskStatus - The status of the task being created or updated.
 * @returns {Object} The task data object.
 */
function editTaskInputData(taskStatus) {
  return {
    taskTitle: document.getElementById("taskTitleInput").value,
    taskDescription: document.getElementById("taskDescriptionInput").value,
    taskDate: document.getElementById("dateInput").value,
    taskAssignedUsersIds: taskFormCurrentUsersIds,
    taskPrio: taskPrioInput,
    taskStatus: taskStatus,
    taskCategory: categoryData,
    taskSubtasks: subtasks,
  };
}

/**
 * Focuses the cursor on the task search input field.
 */
function focusOnSearchBar() {
  let inputElement = document.getElementById("findTaskInput");
  inputElement.focus();
}

/**
 * Prevents default behavior for a dropdown element when clicked on within a task popup.
 * Ensures that the dropdown behaves as intended within the context of a task popup.
 */
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