/**
 * Highlights the AddTask NavLink
 */

function highlightAddTaskInNavbar() {
  let navLink = document.getElementById('addTaskLink');
  navLink.classList.add('currentNavLinkBackground');
}

//------------// open/close User Dropdown

/**
 * Opens the user dropdown menu and activates the associated UI elements.
 */
function openUserDropdown() {
  switchArrowInsideDropdown(true, "taskFormUserDropdownArrow");
  handleDropdown(true, "userDropdown");
  enableCursorPointerOnInput("taskFormUserInput");
}

/**
 * Closes the user dropdown menu, deactivates the UI elements, filters the user data, and clears the input field.
 */
function closeUserDropdown() {
  switchArrowInsideDropdown(false, "taskFormUserDropdownArrow", "userDropdown");
  handleDropdown(false, "userDropdown");
  userFilterFunction();
  clearUserInputInsideTaskFrom();
  disableCursorPointerOnInput("taskFormUserInput");
}

/**
 * Rotates the arrow icon inside the dropdown based on the open/closed status.
 * @param {boolean} isFocused - Indicates whether the dropdown is open or closed.
 * @param {string} currentImageID - The ID of the arrow icon to be rotated.
 */
function switchArrowInsideDropdown(isFocused, currentImageID) {
  let image = document.getElementById(currentImageID);

  if (isFocused) {
    image.style.transform = "rotate(180deg)";
    image.style.pointerEvents = "auto";
  } else {
    setTimeout(() => {
      image.style.transform = "none";
      image.style.pointerEvents = "none";
    }, 80);
  }
}

/**
 * Clears the content of the user input field in the task form.
 */
function clearUserInputInsideTaskFrom() {
  let userInput = document.getElementById("taskFormUserInput");
  userInput.value = "";
}

/**
 * Enables the pointer cursor for the input field of the dropdown.
 * @param {string} dropdownId - The ID of the input field.
 */
function enableCursorPointerOnInput(dropdownId) {
  let userInput = document.getElementById(dropdownId);
  userInput.classList.add("cursorUnset");
}

/**
 * Disables the pointer cursor for the input field of the dropdown.
 * @param {string} dropdownId - The ID of the input field.
 */
function disableCursorPointerOnInput(dropdownId) {
  let userInput = document.getElementById(dropdownId);
  userInput.classList.remove("cursorUnset");
}

/**
 * Controls the display of the dropdown (max height, border, scrollability).
 * @param {boolean} isFocused - Indicates whether the dropdown is open or closed.
 * @param {string} currentDropdownID - The ID of the dropdown element.
 */
function handleDropdown(isFocused, currentDropdownID) {
  let dropdown = document.getElementById(currentDropdownID);

  if (isFocused) {
    dropdown.style.maxHeight = "200px";
    dropdown.style.border = "2px #29abe2 solid";
    dropdown.style.borderTop = "none";
    dropdown.style.overflowY = "scroll";
  } else {
    setTimeout(() => {
      dropdown.style.maxHeight = "0";
      dropdown.style.border = "none";
      dropdown.style.overflow = "hidden";
    }, 80);
  }
}

// date

/**
 * Sets the minimum selectable date for the date input field to the current date.
 */
function insertMinSelectableDate() {
  document.getElementById("dateInput").setAttribute("min", getCurrentDate());
}

/**
 * Returns the current date in "YYYY-MM-DD" format.
 * @returns {string} The current date in ISO format.
 */
function getCurrentDate() {
  let currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
}

// priority

/**
 * Sets the priority of a task and changes the appearance of the buttons based on the selection.
 * @param {string} priority - The priority of the task (e.g., 'urgent', 'medium', 'low').
 */
function setTaskPrio(priority) {
  if (taskPrioInput === priority) {
    taskPrioInput = null;
    setTaskPrioButtonColorSwitch(null);
  } else {
    taskPrioInput = priority;
    setTaskPrioButtonColorSwitch(priority);
  }
}

/**
 * Changes the color of the priority buttons based on the selected priority.
 * @param {string|null} priority - The selected priority (e.g., 'urgent', 'medium', 'low') or null to remove the selection.
 */
function setTaskPrioButtonColorSwitch(priority) {
  let buttons = {
    urgent: document.getElementsByClassName("taskFormPrioButtonUrgent")[0],
    medium: document.getElementsByClassName("taskFormPrioButtonMedium")[0],
    low: document.getElementsByClassName("taskFormPrioButtonLow")[0],
  };

  Object.keys(buttons).forEach((prio) => {
    if (prio === priority) {
      buttons[prio].classList.add(`taskFormPrioButton${capitalize(prio)}OnClick`, `taskFormPrioButton${capitalize(prio)}Icon`);
    } else {
      buttons[prio].classList.remove(`taskFormPrioButton${capitalize(prio)}OnClick`, `taskFormPrioButton${capitalize(prio)}Icon`);
    }
  });
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string whose first letter is to be capitalized.
 * @returns {string} The string with the first letter capitalized.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// category

/**
 * Opens the category dropdown menu, displays it, and activates the associated UI elements.
 */
function openCategoryDropdown() {
  switchArrowInsideDropdown(true, "taskFormCategoryDropdownArrrow", "categoryDropdown");
  handleDropdown(true, "categoryDropdown");
  enableCursorPointerOnInput("taskFormCategoryInput");
}

/**
 * Closes the category dropdown menu, deactivates the UI elements, and clears the input field.
 */
function closeCategoryDropdown() {
  switchArrowInsideDropdown(false, "taskFormCategoryDropdownArrrow", "categoryDropdown");
  handleDropdown(false, "categoryDropdown");
  disableCursorPointerOnInput("taskFormCategoryInput");
  clearCategoryInsideTaskFrom();
}

/**
 * Clears the content of the category field in the task form.
 */
function clearCategoryInsideTaskFrom() {
  let categoryInput = document.getElementById("taskFormCategoryInput");
  categoryInput.value = "";
}

/**
 * Fills the dropdown menu with available categories and their corresponding colors.
 */
function fillCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropdown");

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div id="categoriesDropdown${i}" onclick="chooseCategory('${categories[i]}', '${categoriesColors[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

/**
 * Selects a category from the dropdown menu and sets the chosen category and its color.
 * @param {string} chosenCategory - The selected category.
 * @param {string} chosenCategoryColor - The color of the selected category.
 * @returns {object} The selected category and its color as an object.
 */
function chooseCategory(chosenCategory, chosenCategoryColor) {
  let inputElement = document.getElementById("taskFormCategoryInput");

  inputElement.value = chosenCategory;

  categoryData = {
    category: chosenCategory,
    color: chosenCategoryColor,
  };

  validateTaskForm("taskFormCategoryInput", "requiredCategoryInfo");

  return categoryData;
}

// subtask

/**
 * Sets focus on the subtask input field.
 */
function focusSubtaskInput() {
  let subtaskInput = document.getElementById("taskFormSubtaskInput");
  subtaskInput.focus();
}

/**
 * Shows or hides icons and lines based on the focus status of the subtask input field.
 * @param {boolean} isFocused - Indicates whether the input field is focused.
 */
function toggleSubtaskCheckOnFocus(isFocused) {
  let plusIcon = document.getElementById("plusIcon");
  let cancelIcon = document.getElementById("cancelIcon");
  let dividingLine = document.getElementById("dividingLine");
  let checkIcon = document.getElementById("checkIcon");

  if (isFocused) {
    plusIcon.style.display = "none";
    cancelIcon.style.display = "inline";
    dividingLine.style.display = "inline";
    checkIcon.style.display = "inline";
  } else {
    plusIcon.style.display = "inline";
    cancelIcon.style.display = "none";
    dividingLine.style.display = "none";
    checkIcon.style.display = "none";
  }
}

/**
 * Clears the content of the subtask input field.
 */
function clearSubtaskInput() {
  let subtaskInput = document.getElementById("taskFormSubtaskInput");
  subtaskInput.value = "";
}

/**
 * Adds the subtask from the input field to the list of subtasks.
 */
function addSubtaskToList() {
  let subtaskInput = document.getElementById("taskFormSubtaskInput").value;
  let subtaskObjekt = {
    subtaskName: subtaskInput,
    subtaskDone: false,
  };
  subtasks.push(subtaskObjekt);
}

/**
 * Renders the list of subtasks in the UI.
 * Updates the display of the subtasks in the list.
 */
function renderSubtasksToList() {
  let subtaskList = document.getElementById("taskFormSubtaskList");
  subtaskList.innerHTML = "";
  if (!subtasks) {
    return;
  }
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.innerHTML += subtaskTemplate(i);
  }
}

/**
 * Opens the input field for editing a specific subtask and re-renders the list.
 * @param {number} i - The index of the subtask in the list.
 */
function openRewriteInput(i) {
  renderSubtasksToList();
  toggleRewriteInputInsideSubtask(i);
  toggleButtonsInsideSubtask(i);
  toggleListMarkerInsideSubtask(i);
  focusOnInput(i);
}

/**
 * Toggles the visibility of the rewrite input for a specific subtask.
 * @param {number} i - The index of the subtask.
 */
function toggleRewriteInputInsideSubtask(i) {
  let subtaskTitle = document.getElementById(`taskFormSubtaskTitle(${i})`);
  let rewriteInput = document.getElementById(`taskFormSubtaskRewriteInput(${i})`);
  subtaskTitle.classList.toggle("displayNone");
  rewriteInput.classList.toggle("displayNone");
  rewriteInput.value = subtaskTitle.textContent;
}

/**
 * Toggles the visibility of the edit and delete buttons for a specific subtask.
 * @param {number} i - The index of the subtask.
 */
function toggleButtonsInsideSubtask(i) {
  let iconBox = document.getElementById(`subtaskIconBox(${i})`);
  let rewriteIconBox = document.getElementById(`subtaskRewriteIconBox(${i})`);

  iconBox.classList.toggle("displayNone");
  rewriteIconBox.classList.toggle("displayNone");
}

/**
 * Toggles the visibility of the marker for a specific subtask.
 * @param {number} i - The index of the subtask.
 */
function toggleListMarkerInsideSubtask(i) {
  let listMarker = document.getElementById(`subtaskSingleListContent(${i})`);
  listMarker.classList.toggle("no-marker");
}

/**
 * Sets the focus on the input field for editing a specific subtask.
 * @param {number} i - The index of the subtask.
 */
function focusOnInput(i) {
  let rewriteInput = document.getElementById(`taskFormSubtaskRewriteInput(${i})`);
  rewriteInput.focus();
}

/**
 * Saves the edited subtask and updates the corresponding entry in the list.
 * @param {number} i - The index of the subtask.
 */
function pushRewrittenSubtask(i) {
  let rewrittenSubtaskValue = document.getElementById(`taskFormSubtaskRewriteInput(${i})`).value;
  let rewrittenSubtask = {
    subtaskName: rewrittenSubtaskValue,
    subtaskDone: false,
  };
  subtasks.splice(i, 1, rewrittenSubtask);
}

/**
 * Deletes a specific subtask from the list.
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtaskFromList(i) {
  subtasks.splice(i, 1);
}

/**
 * Deletes all subtasks from the list.
 */
function deleteAllSubtaskFromList() {
  subtasks.splice(0, subtasks.length);
}

// task Form inputs

/**
 * Validates an input field and shows an error message if the field is empty.
 * @param {string} inputId - The ID of the input field to be validated.
 * @param {string} requiredInfoId - The ID of the element that contains the error message.
 */
function validateInput(inputId, requiredInfoId) {
  let inputElement = document.getElementById(inputId);
  let requiredInfoElement = document.getElementById(requiredInfoId);

  if (inputElement.value.trim() === "") {
    requiredInfoElement.classList.remove("displayNone");
  } else {
    requiredInfoElement.classList.add("displayNone");
  }
}

/**
 * Resets the task form to its default state and removes all subtasks.
 */
function clearTaskForm() {
  setGlobalRenderLocation();
  renderTaskForm(globalTaskStatus || "to do", globalRenderLocation);
  deleteAllSubtaskFromList();
  renderSubtasksToList();
}

/**
 * Checks the value of the date input field and adds or removes a class based on its state.
 */
function checkInputValue() {
  let input = document.getElementById("dateInput");
  if (input.value) {
    input.classList.remove("empty");
  } else {
    input.classList.add("empty");
  }
}

//create Task modal

/**
 * Executes all necessary functions to create a task, including displaying a modal and redirecting.
 */
function createTaskAllNeededFunctions() {
  if (window.location.href.endsWith("add_task.html")) {
    showCreateTaskModal();
    setTimeout(() => {
      redirectToBoard();
    }, 1500);
  } else {
    redirectToBoard();
  }
}

/**
 * Displays the modal when a task has been created.
 */
function showCreateTaskModal() {
  let modalBackground = document.getElementById("modalFullScreenContainer");
  let modal = document.getElementById("taskCreatedModal");

  modalBackground.style.display = "block";
  setTimeout(() => {
    modal.classList.add("taskCreatedModalShow");
  }, 10);
}

// collecting Data

/**
 * Collects all the necessary input data from the form to create a new task.
 * @param {string} taskStatus - The status of the task to be used during creation.
 * @returns {Object} An object containing the collected input data for the new task.
 */
function getNewTaskInputData(taskStatus) {
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

//listener

/**
 * Sets an event listener for clicks to ensure that dropdowns in "add_task.html" work correctly.
 */
document.addEventListener("click", function () {
  if (window.location.href.includes("add_task.html")) {
    setTimeout(() => {
      let dropdown = document.getElementById("userDropdown");

      if (dropdown) {
        dropdown.addEventListener("mousedown", function (event) {
          event.preventDefault();
        });
      }
    }, 100);
  }
});
