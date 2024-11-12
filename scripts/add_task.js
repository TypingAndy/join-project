//add task onload function

function taskFormOnload() {
  fillUserDropdown();
  insertUserIconsInsideAssign();
  fillCategoryDropdown();
  renderSubtasksToList();
}

// often used functions

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

// user assign

async function fillUserDropdown() {
  let userDropdown = document.getElementById("userDropdown");
  sortedUsers = await sortUserData();
  console.log(sortedUsers);

  for (let i = 0; i < sortedUsers.length; i++) {
    userDropdown.innerHTML += nameListTemplate(i, sortedUsers);
  }
}

function addUserToTaskToggleCss(i) {
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown${i}`);
  let userIcon = document.getElementById(`taskFormUserIcon${i}`);
  let userDropdown = document.getElementById("userDropdown");
  let userInput = document.getElementById("taskFormUserInput");

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");
  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");
  userIcon.classList.toggle("displayNone");
  userDropdown.classList.add("maxHeight200");
  userInput.classList.add("cursorUnset");
}

function toggleUserInTaskUsers(userIndex) {
  let index = taskFormCurrentUsersIds.indexOf(userIndex);

  if (index === -1) {
    taskFormCurrentUsersIds.push(userIndex);
  } else {
    taskFormCurrentUsersIds.splice(index, 1);
  }
}

function clearUserInputInsideTaskFrom() {
  let userInput = document.getElementById("taskFormUserInput");
  userInput.value = "";
}

function userFilterFunction() {
  let input = document.getElementById("taskFormUserInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`userContainerInsideUserDropdown${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

async function insertUserIconsInsideAssign() {
  let sortedUsers = await sortUserData();
  let userIconContainer = document.getElementById("taskFormUserIcon");

  for (let i = 0; i < sortedUsers.length; i++) {
    userIconContainer.innerHTML += iconTemplate(i, sortedUsers);
  }
}

function clearUserInput() {
  let userInput = document.getElementById("taskFormUserInput");
  userInput.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  let dropdown = document.getElementById("userDropdown");
  dropdown.addEventListener("mousedown", function (event) {
    event.preventDefault();
  });
});

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
  taskPrioInput = priority;
  setTaskPrioButtonColorSwitch(priority);
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

function fillCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropdown");

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="chooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function chooseCategory(chosenCategory) {
  document.getElementById("taskFormCategoryInput").value = chosenCategory;
  return chosenCategory;
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

  subtasks.push(subtaskInput);
}

function renderSubtasksToList() {
  let subtaskList = document.getElementById("taskFormSubtaskList");
  subtaskList.innerHTML = "";
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
  let rewrittenSubtask = document.getElementById(`taskFormSubtaskRewriteInput(${i})`).value;
  subtasks.splice(i, 1, rewrittenSubtask);
}

function deleteSubtaskFromList(i) {
  subtasks.splice(i, 1);
}

document.addEventListener("DOMContentLoaded", () => {
  let subtaskBox = document.getElementById("taskFormSubtaskList");
  document.addEventListener("mousedown", function (event) {
    if (!subtaskBox.contains(event.target)) {
      renderSubtasksToList();
    }
  });
});

// collecting Data

function getNewTaskInputData(taskStatus) {
  let taskTitleInput = document.getElementById("taskTitleInput").value;
  let taskDescriptionInput = document.getElementById("taskDescriptionInput").value;
  let taskDateInput = document.getElementById("dateInput").value;
  let chosenCategory = document.getElementById("taskFormCategoryInput").value;
  let createTaskData = {
    taskTitle: taskTitleInput,
    taskDescription: taskDescriptionInput,
    taskAssignedUsersIds: taskFormCurrentUsersIds,
    taskDate: taskDateInput,
    taskPrio: taskPrioInput,
    taskStatus: taskStatus,
    taskCategory: chosenCategory,
    taskSubtasks: subtasks,
  };
  console.log(createTaskData);

  return createTaskData;
}
