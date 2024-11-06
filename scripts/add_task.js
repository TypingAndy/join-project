function rednerTaskFormTemplate() {
  let taskForm = document.getElementById("taskForm");
  taskForm.innerHTML = taskFormTemplate();
}

function changeImageOnFocus(isFocused, currentID) {
  let image = document.getElementById(currentID);
  if (isFocused) {
    image.src = "../images/icons/arrow_drop_down_up.png";
  } else {
    image.src = "../images/icons/arrow_drop_down_down.png";
  }
}

// assigned to

// category

// subtask

function focusOnSubtaskInput(isFocused) {
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

//functions addTask---------------------------------------------------------------------

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

//functions addTask---------Assign Users to Task------------------------------------------------------------

function renderSortedUsersToDropdown() {
  let dropdown = document.getElementById("userNameDropDown");
  dropdown.innerHTML = "";

  for (let i = 0; i < sortedUsers.length; i++) {
    let currentColor = getColorFromUser(i);
    let blackWhite = addTaskAdaptFontColorToBackground(i);
    dropdown.innerHTML += nameListTemplate(i, sortedUsers, currentColor, blackWhite, allUserInitials);
  }
}

function addUserToTaskToggle(name, i, userFirebaseId) {
  removeOrAddUserToTask(name, i, userFirebaseId);
  addUserSymbolsToUserAssign();
}

function removeOrAddUserToTask(name, i, userFirebaseId) {
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let assignUserID = document.getElementById(`addTaskAssignUserId${i}`);
  let blackWhite = addTaskAdaptFontColorToBackground(i);

  if (checkIfUserIsAlreadyAddedToTask(userFirebaseId)) {
    addUserToTask(name, i, check, noCheck, assignUserID, blackWhite, userFirebaseId);
  } else {
    removeUserFromTaskByIndex(userFirebaseId, check, noCheck, assignUserID);
  }
}

function checkIfUserIsAlreadyAddedToTask(userFirebaseId) {
  return !addTaskAssignedUserFirebaseIds.includes(userFirebaseId);
}

function removeUserFromTaskByIndex(userFirebaseId, check, noCheck, assignUserID) {
  let userIndex = addTaskAssignedUserFirebaseIds.indexOf(userFirebaseId);
  if (userIndex > -1) {
    removeUserFromTask(check, noCheck, assignUserID, userIndex);
  }
}

function addUserSymbolsToUserAssign() {
  let addUserSymbolsAssign = document.getElementById("addUserSymbolsAssign");
  addUserSymbolsAssign.innerHTML = "";

  for (let i = 0; i < addTaskCurrentUser.length; i++) {
    addUserSymbolsAssign.innerHTML += addUserSymbolTemplate(i);
  }
}

function addTaskFilterFunction() {
  let input = document.getElementById("taskFormUserInput");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`addTaskAssignUserId${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

function createUserInitials() {
  for (let i = 0; i < sortedUsers.length; i++) {
    let fullName = sortedUsers[i].name;
    let nameParts = fullName.split(" ");

    let initials = nameParts.map((part) => part.charAt(0)).join("");
    allUserInitials.push(initials);
  }
}

// addTask --------------------------- date

// addTask --------------------------- priority

// addTask --------------------------- category

function addTaskRenderCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="chooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function chooseCategory(i) {
  chosenCategory = i;
  document.getElementById("addTaskChooseCategoryButton").innerHTML = categoryTemplate(chosenCategory);
}

// addTask --------------------------- subTask

function addTaskOpenAddSubtask() {
  let inputBox = document.getElementById("addSubtaskInputBox");
  let inputField = document.getElementById("addSubtaskInput");
  let addSubtask = document.getElementById("addSubtask");

  addSubtask.classList.add("displayNone");
  inputBox.classList.remove("displayNone");
  inputBox.classList.remove("displayNone");
  inputField.focus();
}

function addTaskWriteSubtaskBoard() {
  let subtaskBoard = document.getElementById("subtaskBoard");
  subtaskBoard.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtaskBoard.innerHTML += subtaskTemplate(i);
  }
}

function addTaskRewriteSubtask(i) {
  let subtask = subtasks[i].subtask;
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  let rewriteInputBox = document.getElementById(`addTaskSubtaskRewriteInputBox${[i]}`);
  rewriteInputBox.value = subtask;
  rewriteInputBox.classList.toggle("displayNone");
  document.getElementById(`addTasksSubtask${[i]}`).classList.toggle("displayNone");
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function addTaskDeleteSubtaskFromBoard(i) {
  subtasks.splice(i, 1);
}

function addTaskAcceptRewriting(i) {
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  subtasks[i].subtask = rewriteInput.value;
  document.getElementById(`addTaskSubtaskRewriteInputBox${i}`).classList.toggle("displayNone");
  document.getElementById(`addTasksSubtask${i}`).classList.toggle("displayNone");
  addTaskWriteSubtaskBoard();
}

function addTaskCancelRewritingSubtask(i) {
  addTaskDeleteRewritingSubtask(i);
  addTaskAcceptRewriting(i);
}

function readIdFromSubtask(id) {
  let fullId = id;
  let idNumber = fullId.slice(-1);
  globalSubtaskId = idNumber;
  console.log(idNumber);
}

document.addEventListener("click", function (event) {
  if (globalSubtaskId !== "") {
    let i = globalSubtaskId;
    let cancelRewriting = document.getElementById(`addTaskCancelRewritingSubtask${i}`);
    let acceptRewriting = document.getElementById(`addTaskAcceptRewritingSubtask${i}`);
    let subtaskRewriteBox = document.getElementById(`addTaskSubtaskRewriteInput${i}`);

    if (event.target !== cancelRewriting && event.target !== acceptRewriting && event.target !== subtaskRewriteBox) {
      if (document.body.contains(event.target)) {
        addTaskCancelRewritingSubtask(i);
      }
    }
  }
});

function addTaskDeleteRewritingSubtask(i) {
  let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function acceptSubtaskOnEnterKeyTrigger(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addTaskAddSubtask();
  }
}
