// user assign

//------------// open/close User Dropdown

function openUserDropdown() {
  switchArrowInsideDropdown(true, "taskFormUserDropdownArrow");
  handleDropdown(true, "userDropdown");
  enableCursorPointerOnInput("taskFormUserInput");
}

function closeUserDropdown() {
  switchArrowInsideDropdown(false, "taskFormUserDropdownArrow", "userDropdown"), handleDropdown(false, "userDropdown");
  userFilterFunction();
  clearUserInputInsideTaskFrom();
  disableCursorPointerOnInput("taskFormUserInput");
}

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

function clearUserInputInsideTaskFrom() {
  let userInput = document.getElementById("taskFormUserInput");
  userInput.value = "";
}

function enableCursorPointerOnInput(dropdownId) {
  let userInput = document.getElementById(dropdownId);
  userInput.classList.add("cursorUnset");
}

function disableCursorPointerOnInput(dropdownId) {
  let userInput = document.getElementById(dropdownId);
  userInput.classList.remove("cursorUnset");
}

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

function insertMinSelectableDate() {
  document.getElementById("dateInput").setAttribute("min", getCurrentDate());
}

function getCurrentDate() {
  let currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
}

// priority

function setTaskPrio(priority) {
  if (taskPrioInput === priority) {
    taskPrioInput = null;
    setTaskPrioButtonColorSwitch(null);
  } else {
    taskPrioInput = priority;
    setTaskPrioButtonColorSwitch(priority);
  }
}

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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// category

function openCategoryDropdown() {
  switchArrowInsideDropdown(true, "taskFormCategoryDropdownArrrow", "categoryDropdown");
  handleDropdown(true, "categoryDropdown");
  enableCursorPointerOnInput("taskFormCategoryInput");
}

function closeCategoryDropdown() {
  switchArrowInsideDropdown(false, "taskFormCategoryDropdownArrrow", "categoryDropdown");
  handleDropdown(false, "categoryDropdown");
  disableCursorPointerOnInput("taskFormCategoryInput");
  clearCategoryInsideTaskFrom();
}

function clearCategoryInsideTaskFrom() {
  let categoryInput = document.getElementById("taskFormCategoryInput");
  categoryInput.value = "";
}

function fillCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropdown");

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div id="categoriesDropdown${i}" onclick="chooseCategory('${categories[i]}', '${categoriesColors[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function chooseCategory(chosenCategory, chosenCategoryColor) {
  let inputElement = document.getElementById("taskFormCategoryInput");

  inputElement.value = chosenCategory;

  let categoryData = {
    category: chosenCategory,
    color: chosenCategoryColor,
  };

  validateTaskForm('taskFormCategoryInput', 'requiredCategoryInfo')

  return categoryData;
}


// subtask

function focusSubtaskInput() {
  let subtaskInput = document.getElementById("taskFormSubtaskInput");
  subtaskInput.focus();
}

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

function clearSubtaskInput() {
  let subtaskInput = document.getElementById("taskFormSubtaskInput");
  subtaskInput.value = "";
}

function addSubtaskToList() {
  let subtaskInput = document.getElementById("taskFormSubtaskInput").value;
  let subtaskObjekt = {
    subtaskName: subtaskInput,
    subtaskDone: false,
  };
  subtasks.push(subtaskObjekt);
}

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

function openRewriteInput(i) {
  renderSubtasksToList();
  toggleRewriteInputInsideSubtask(i);
  toggleButtonsInsideSubtask(i);
  toggleListMarkerInsideSubtask(i);
  focusOnInput(i);
}

function toggleRewriteInputInsideSubtask(i) {
  let subtaskTitle = document.getElementById(`taskFormSubtaskTitle(${i})`);
  let rewriteInput = document.getElementById(`taskFormSubtaskRewriteInput(${i})`);
  subtaskTitle.classList.toggle("displayNone");
  rewriteInput.classList.toggle("displayNone");
  rewriteInput.value = subtaskTitle.textContent;
}

function toggleButtonsInsideSubtask(i) {
  let iconBox = document.getElementById(`subtaskIconBox(${i})`);
  let rewriteIconBox = document.getElementById(`subtaskRewriteIconBox(${i})`);

  iconBox.classList.toggle("displayNone");
  rewriteIconBox.classList.toggle("displayNone");
}

function toggleListMarkerInsideSubtask(i) {
  let listMarker = document.getElementById(`subtaskSingleListContent(${i})`);
  listMarker.classList.toggle("no-marker");
}

function focusOnInput(i) {
  let rewriteInput = document.getElementById(`taskFormSubtaskRewriteInput(${i})`);
  rewriteInput.focus();
}

function pushRewrittenSubtask(i) {
  let rewrittenSubtaskValue = document.getElementById(`taskFormSubtaskRewriteInput(${i})`).value;
  let rewrittenSubtask = {
    subtaskName: rewrittenSubtaskValue,
    subtaskDone: false,
  };
  subtasks.splice(i, 1, rewrittenSubtask);
}

function deleteSubtaskFromList(i) {
  subtasks.splice(i, 1);
}

function deleteAllSubtaskFromList() {
  subtasks.splice(0, subtasks.length);
}

// task Form inputs

function validateInput(inputId, requiredInfoId) {
  let inputElement = document.getElementById(inputId);
  let requiredInfoElement = document.getElementById(requiredInfoId);

  if (inputElement.value.trim() === "") {
    requiredInfoElement.classList.remove("displayNone");
  } else {
    requiredInfoElement.classList.add("displayNone");
  }
}

function clearTaskForm() {
  renderTaskForm("to do", "taskFormAddTask");
  deleteAllSubtaskFromList();
  renderSubtasksToList();
}

function checkInputValue() {
  let input = document.getElementById("dateInput");
  if (input.value) {
    input.classList.remove("empty");
  } else {
    input.classList.add("empty");
  }
}

//create Task modal

function createTaskAllNeededFunctions() {
  showCreateTaskModal();
  setTimeout(() => {
    redirectToBoard();
  }, 1500);
}

function showCreateTaskModal() {
  let modalBackground = document.getElementById("modalFullScreenContainer");
  let modal = document.getElementById("taskCreatedModal");

  modalBackground.style.display = "block";
  setTimeout(() => {
    modal.classList.add("taskCreatedModalShow");
  }, 10);
}

// collecting Data

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

document.addEventListener("click", function () {
  if (window.location.href.endsWith("add_task.html")) {
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

// document.addEventListener("click", () => {
//   if (window.location.href.endsWith("add_task.html")) {
//     setTimeout(() => {
//       let subtaskBox = document.getElementById("taskFormSubtaskList");
//       if (subtaskBox) {
//         document.addEventListener("mousedown", function (event) {
//           if (!subtaskBox.contains(event.target)) {
//             renderSubtasksToList();
//           }
//         });
//       }
//     }, 100);
//   }
// });
