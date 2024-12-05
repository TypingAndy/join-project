let BASE_URL = "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";

//signUpGlobalArrays.tst
let signUpData = {};
let responseToJson;
let userColorsPreset = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
let policyAccepted = false;
let passwordMatch = false;

//logInArrays
let loggedUserInitials = "G";

//addTaskGlobalArrays
let taskPrioInput = "";
let taskFormCurrentUsersIds = [];
let categories = ["Cleaning", "Company Outing", "Cooking", "Meetings", "Others", "Technical Task", "User Story"];
let categoriesColors = ["#0038FF", "#FF7A00", "#FF4646", "#FFC701", "#FC71FF", "#1FD7C1", "#9327FF"];
let categoryData;
let subtasks = [];

//boardGlobalArrays
let sortedUsers = [];
let unsortedUsers = {};
let lokalTasksArray = [];
let allUnsortedTasks = [];
let currentDraggedElementID;
let globalTaskStatus = new URLSearchParams(window.location.search).get("status") || "to do";
let globalRenderLocation;

//contactGlobalArray
let allContacts = [];
let contactIndices = [];
let renderedContact = [];
let contactId;
let selectedCardId = null;

/**
 * Stops the propagation of the current event, preventing it from bubbling up the DOM.
 *
 * @param {Event} event - The event object that triggered the propagation.
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Asynchronously fills the sorted users object by fetching and sorting user data.
 */
async function fillSortedUsersObject() {
  sortedUsers = await sortUserData();
}

/**
 * Redirects the user to the "board.html" page after a brief delay.
 */
function redirectToBoard() {
  setTimeout(() => {
    window.location.href = "board.html";
  }, 100);
}

/**
 * Defines the Location where the taskForm should render in
 */
function setGlobalRenderLocation() {
  if (window.location.href.includes("board.html")) {
    globalRenderLocation = "boardTaskPopupContentWrapper";
  }

  if (window.location.href.includes("add_task.html")) {
    globalRenderLocation = "taskFormAddTask";
  }
}

/**
 * Renders the task form by fetching sorted user data, rendering the task form template,
 * and filling dropdowns for users, categories, and subtasks.
 *
 * @param {string} taskStatus - The status of the task to be rendered.
 * @param {string} renderLocation - The location where the task form should be rendered.
 */
async function renderTaskForm(taskStatus, renderLocation) {
  await fillSortedUsersObject();
  renderTaskFormTemplate(taskStatus, renderLocation);
  fillUserDropdown();
  fillCategoryDropdown();
  renderSubtasksToList();
}

/**
 * Renders the task form template with the provided task status and render location.
 *
 * @param {string} taskStatus - The status of the task (e.g., "To Do", "In Progress").
 * @param {string} renderLocation - The DOM element ID where the form should be rendered.
 */
function renderTaskFormTemplate(taskStatus, renderLocation) {
  let taskForm = document.getElementById(renderLocation);
  titleAcceptTaskButton = "Create Task";
  let fetchStatus = "POST";
  let postOrPatchFunction = "postTaskData";
  taskForm.innerHTML = taskFormTemplate(globalTaskStatus, titleAcceptTaskButton, renderLocation, fetchStatus, postOrPatchFunction);
}

/**
 * Fills the user dropdown by populating it with user based on the sorted users array.
 */
function fillUserDropdown() {
  let userDropdown = document.getElementById("userDropdown");
  for (let i = 0; i < sortedUsers.length; i++) {
    userDropdown.innerHTML += nameListTemplate(sortedUsers[i].id);
  }
}

/**
 * Toggles the user in the task form by updating the task users array and altering the CSS.
 *
 * @param {string} userFirebaseId - The Firebase ID of the user to be toggled in the task form.
 */
function toggleUserInTaskForm(userFirebaseId) {
  toggleUserInTaskUsersArray(userFirebaseId);
  addUserToTaskToggleCss(userFirebaseId);
  clearUserInputInsideTaskFrom();
  renderIconsInTaskForm(userFirebaseId);
}

/**
 * Renders the user icons in the task form, showing a maximum of 4 user icons.
 */
function renderIconsInTaskForm() {
  let userIconContainer = document.getElementById("taskFormUserIcon");
  let plusUserIcons = document.getElementById("plusUserIcons");
  let numberUserIcons = document.getElementById("numberUserIcons");
  let maxIconsToShow = 4;
  userIconContainer.innerHTML = "";
  for (let i = 0; i < taskFormCurrentUsersIds.length && i < maxIconsToShow; i++) {
    userIconContainer.innerHTML += iconTemplate(taskFormCurrentUsersIds[i]);
  }
  if (taskFormCurrentUsersIds.length <= maxIconsToShow) {
    plusUserIcons.classList.add("displayNone");
    numberUserIcons.textContent = "";
  } else {
    plusUserIcons.classList.remove("displayNone");
    numberUserIcons.textContent = taskFormCurrentUsersIds.length - maxIconsToShow;
  }
}

/**
 * Toggles the CSS classes for the user in the task form to mark them as added or removed.
 *
 * @param {string} userFirebaseId - The Firebase ID of the user whose CSS should be toggled.
 */
function addUserToTaskToggleCss(userFirebaseId) {
  let check = document.getElementById(`check${userFirebaseId}`);
  let noCheck = document.getElementById(`noCheck${userFirebaseId}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown(${userFirebaseId})`);
  let userDropdown = document.getElementById("userDropdown");

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");
  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");
  userDropdown.classList.remove("maxHeight200");
}

/**
 * Toggles the presence of a user in the task users array.
 *
 * @param {string} userFirebaseId - The Firebase ID of the user to be added or removed.
 */
function toggleUserInTaskUsersArray(userFirebaseId) {
  let i = taskFormCurrentUsersIds.indexOf(userFirebaseId);

  if (i === -1) {
    taskFormCurrentUsersIds.push(userFirebaseId);
  } else {
    taskFormCurrentUsersIds.splice(i, 1);
  }
}

/**
 * Clears all users from the task users array.
 */
function toggleUserInTaskUsersArraySpliceAll() {
  taskFormCurrentUsersIds.splice(0, taskFormCurrentUsersIds.length);
}

/**
 * Filters the users based on the input value in the task form user input field.
 *
 * @param {Event} event - The input event triggered by the user in the user input field.
 */
function userFilterFunction() {
  let input = document.getElementById("taskFormUserInput");
  let filter = input.value.toUpperCase();
  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userId = sortedUsers[i].id;
    let userElement = document.getElementById(`userContainerInsideUserDropdown(${userId})`);
    if (userElement) {
      if (userName.includes(filter)) {
        userElement.classList.remove("displayNone");
      } else {
        userElement.classList.add("displayNone");
      }
    }
  }
}

/**
 * Filters the categories based on the input value in the task form category input field.
 *
 * @param {Event} event - The input event triggered by the user in the category input field.
 */
function categoryFilterFunction() {
  let input = document.getElementById("taskFormCategoryInput");
  let filter = input.value.toUpperCase();
  for (let i = 0; i < categories.length; i++) {
    let categoriesUpperCase = categories[i].toUpperCase();
    let categorieElement = document.getElementById(`categoriesDropdown${i}`);
    if (categoriesUpperCase.includes(filter)) {
      categorieElement.classList.remove("displayNone");
    } else {
      categorieElement.classList.add("displayNone");
    }
  }
}

/**
 * Validates the task form to ensure that all required fields are filled.
 */
function validateTaskForm() {
  let title = document.getElementById("taskTitleInput").value.trim();
  let dueDate = document.getElementById("dateInput").value.trim();
  let category = document.getElementById("taskFormCategoryInput").value.trim();
  let allValid = title !== "" && dueDate !== "" && category !== "";
  let button = document.getElementById("createTaskButton");
  if (allValid) {
    button.classList.remove("disabled");
  } else {
    button.classList.add("disabled");
  }
}

/**
 * Opens the signed-in user dropdown by removing the sliding class.
 */
function openSignedUserDropdown() {
  let userProfileDropdown = document.getElementById("userProfileDropdown");
  userProfileDropdown.classList.remove("userProfileDropdownSlider");
}

/**
 * Logs the user out by removing their information from localStorage and redirecting to the login page.
 */
function logOut() {
  localStorage.removeItem("loggedUserInitials");
  window.location.href = "../index.html";
}

/**
 * Event listener for clicking outside the user profile dropdown to close it.
 *
 * @param {Event} event - The click event on the document.
 */
addEventListener("click", (event) => {
  if (!window.location.href.includes("index") && !window.location.href.includes("landingpage")) {
    let userProfileButton = document.getElementById("userPorfileButton");
    let userProfileDropdown = document.getElementById("userProfileDropdown");
    if (!userProfileButton.contains(event.target)) {
      userProfileDropdown.classList.add("userProfileDropdownSlider");
    }
  }
});


/**
 * Renders the profile button template and sets the user initials based on the logged-in user.
 */
function renderProfileButtonTemplate() {
  let profileButtonBox = document.querySelector(".profileButtonBox");
  let loggedUserInitials = localStorage.getItem("loggedUserInitials");
  profileButtonBox.innerHTML = profileButtonTemplate();

  if (loggedUserInitials) {
    document.getElementById("profileInitials").innerHTML = loggedUserInitials;
  } else {
    document.getElementById("profileInitials").innerHTML = "G";
  }
}
