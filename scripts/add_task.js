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

  for (let i = 0; i < sortedUsers.length; i++) {
    userDropdown.innerHTML += nameListTemplate(i, sortedUsers);
  }
}

function addUserToTaskToggle(i) {
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown${i}`);
  let userIcon = document.getElementById(`taskFormUserIcon${i}`);

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");

  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");

  userIcon.classList.toggle("displayNone");
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
  buttonUrgent = document.getElementsByClassName("taskFormPrioButtonUrgent")[0];
  buttonMedium = document.getElementsByClassName("taskFormPrioButtonMedium")[0];
  buttonLow = document.getElementsByClassName("taskFormPrioButtonLow")[0];

  if (priority == "urgent") highlightPrioButtonUrgent();
  if (priority == "medium") highlightPrioButtonMedium();
  if (priority == "low") highlightPrioButtonLow();
}

function highlightPrioButtonUrgent() {
  buttonUrgent.classList.add("taskFormPrioButtonUrgentOnClick", "taskFormPrioButtonUrgentIcon");
  buttonMedium.classList.remove("taskFormPrioButtonMediumOnClick", "taskFormPrioButtonMediumIcon");
  buttonLow.classList.remove("taskFormPrioButtonLowOnClick", "taskFormPrioButtonLowIcon");
}
function highlightPrioButtonMedium() {
  buttonMedium.classList.add("taskFormPrioButtonMediumOnClick", "taskFormPrioButtonMediumIcon");
  buttonUrgent.classList.remove("taskFormPrioButtonUrgentOnClick", "taskFormPrioButtonUrgentIcon");
  buttonLow.classList.remove("taskFormPrioButtonLowOnClick", "taskFormPrioButtonLowIcon");
}
function highlightPrioButtonLow() {
  buttonLow.classList.add("taskFormPrioButtonLowOnClick", "taskFormPrioButtonLowIcon");
  buttonUrgent.classList.remove("taskFormPrioButtonUrgentOnClick", "taskFormPrioButtonUrgentIcon");
  buttonMedium.classList.remove("taskFormPrioButtonMediumOnClick", "taskFormPrioButtonMediumIcon");
}

// category

function fillCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropdown");
  console.log(categories);

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="chooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function chooseCategory(chosenCategory) {
  console.log(chosenCategory);
  document.getElementById("taskFormCategoryInput").value = chosenCategory;
}

// subtask

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

function pushRewrittenSubtask(i) {
  let rewrittenSubtask = document.getElementById(`taskFormSubtaskRewriteInput(${i})`).value;
  subtasks.splice(i, 1, rewrittenSubtask);
  console.log(subtasks);
}

function deleteSubtaskFromList(i) {
  subtasks.splice(i, 1);
}

// collecting Data

function getNewTaskInputData() {
  let taskTitleInput = document.getElementById("taskTitleInput").value;
  let taskDescriptionInput = document.getElementById("taskDescriptionInput").value;
  let taskDateInput = document.getElementById("dateInput").value;
  let createTaskData = {
    taskTitle: taskTitleInput,
    taskDescription: taskDescriptionInput,
    taskAssignedUser: addTaskCurrentUser,
    taskAssignedUserInitials: taskAssignedUserInitials,
    taskAssignedUserColors: addTaskAssignedUserColors,
    taskAssignedUserFontColors: addTaskAssignedUserFontColors,
    taskAssignedUserFirebaseIDs: addTaskAssignedUserFirebaseIds,
    taskDate: taskDateInput,
    taskPrio: taskPrioInput,
    taskStatus: "to do",
    taskCategory: chosenCategory,
    taskSubtasks: subtasks,
  };
  return createTaskData;
}
