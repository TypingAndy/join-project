async function renderPopupEditTaskContent(numberedTaskID) {
  renderAddTaskToEditPopup(numberedTaskID);
  await boardLoadEditPopupUserData(numberedTaskID);
  addUserToTaskInsideEditPopup(numberedTaskID);

  setTaskPrio(`${convertedTasks[numberedTaskID].taskPrio}`);
  currentNumberedID = numberedTaskID;
  let categoryFromTask = convertedTasks[numberedTaskID].taskCategory;
  boardEditTaskChooseCategory(categoryFromTask);
  boardEditInitializeSubtasks(numberedTaskID);
}

function addUserToTaskInsideEditPopup(numberedTaskID) {
  let editPopup = document.getElementById("boardEditPopupTaskSection");
  if (editPopup) {
    for (let i = 0; i < convertedTasks[numberedTaskID].taskAssignedUser.length; i++) {
      let currentUserFirebaseId = convertedTasks[numberedTaskID].taskAssignedUserFirebaseIDs[i];
      let index = sortedUsers.findIndex((user) => user.id === currentUserFirebaseId);

      toggleUserInsideEditPopup(convertedTasks[numberedTaskID].taskAssignedUser[i], index, currentUserFirebaseId, numberedTaskID);
      console.log(convertedTasks[numberedTaskID].taskAssignedUser[i], i, currentUserFirebaseId, index);
    }
  }
}

function toggleUserInsideEditPopup(name, i, userFirebaseId, numberedTaskID) {
  focusInputFieldInsideUserAssignAtEditPopup();
  checkIfUserIsAssignedToTaskInEditPopup(name, i, userFirebaseId);
  addUserSymbolsToAssignInsideEditPopup(numberedTaskID);
}

function focusInputFieldInsideUserAssignAtEditPopup() {
  let inputField = document.getElementById("boardEditPopupContactsSearchArea");
  inputField.focus();
}

function checkIfUserIsAssignedToTaskInEditPopup(name, i, userFirebaseId) {
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let assignUserID = document.getElementById(`boardEditPopupAssignUserId${i}`);
  let blackWhite = addTaskAdaptFontColorToBackground(i);

  if (!addTaskAssignedUserFirebaseIds.includes(userFirebaseId)) addUserToTask(name, i, check, noCheck, assignUserID, blackWhite, userFirebaseId);
  else {
    let userIndex = addTaskAssignedUserFirebaseIds.indexOf(userFirebaseId);
    if (userIndex > -1) {
      removeUserFromTask(check, noCheck, assignUserID, userIndex);
    }
  }
}

function boardEditPopupInsertMinSelectableDate() {
  document.getElementById("editPopupDateInput").setAttribute("min", currentDate);
}

function renderAddTaskToEditPopup(numberedTaskID) {
  document.getElementById("boardTaskPopup").innerHTML = renderAddTaskToEditPopupTemplate(numberedTaskID);
  boardEditPopupInsertMinSelectableDate();
  document.querySelector(".addTaskSection").style.backgroundColor = "white";
  document.querySelector(".addTaskSection").style.setProperty("margin-top", "360px");
}


function boardEditPopupFilterFunction() {
  let input = document.getElementById("boardEditPopupContactsSearchArea");
  let filter = input.value.toUpperCase();

  for (let i = 0; i < sortedUsers.length; i++) {
    let userName = sortedUsers[i].name.toUpperCase();
    let userElement = document.getElementById(`boardEditPopupAssignUserId${i}`);

    if (userName.includes(filter)) {
      userElement.classList.remove("displayNone");
    } else {
      userElement.classList.add("displayNone");
    }
  }
}

document.addEventListener(
  "click",
  function (event) {
    let taskSection = document.getElementById("boardEditPopupTaskSection");

    if (taskSection) {
      let contactsDropdown = document.getElementById("boardEditPopupContactsDropdownLableBox");
      let assignDropdownArrow = document.getElementById("boardEditPopupAssignDropdownArrow");
      let inputField = document.getElementById("boardEditPopupContactsSearchArea");
      let userNameDropDown = document.getElementById("boardEditPopupUserNameDropDown");

      if (contactsDropdown.contains(event.target) && !assignDropdownArrow.contains(event.target)) {
        openEditPopupAssignDropdown(inputField, userNameDropDown, contactsDropdown);
      } else {
        closeEditPopupAssignDropdown(userNameDropDown);
      }
    }
  },
  true
);

// board Edit Popup Category

function boardEditTaskRenderCategoryDropdown() {
  let categoryDropdown = document.getElementById("boardEditCategoryDropDown");
  categoryDropdown.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    categoryDropdown.innerHTML += /*html*/ `<div onclick="boardEditTaskChooseCategory('${categories[i]}')" class="categorieList">${categories[i]}</div>`;
  }
}

function boardEditTaskChooseCategory(i) {
  chosenCategory = i;
  document.getElementById("boardEditPopupChooseCategoryButton").innerHTML = boardEditTaskCategoryTemplate(chosenCategory);
}

document.addEventListener(
  "click",
  function (event) {
    let taskSection = document.getElementById("boardEditPopupTaskSection");
    if (taskSection) {
      let categoryDropdown = document.getElementById("boardEditCategoryDropDown");
      let dropdownLableBox = document.getElementById("boardEditPopupChooseCategoryDropdownLableBox");

      if (dropdownLableBox.contains(event.target)) {
        toggleCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox);
      } else if (!categoryDropdown.contains(event.target)) {
        closeCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox);
      }
    }
  },
  true
);

function toggleCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox) {
  if (categoryDropdown.classList.contains("show")) {
    closeCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox);
  } else {
    openCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox);
  }
}

//                        board Edit Popup subTask
function boardEditInitializeSubtasks(numberedTaskID) {
  subtasks = [];
  for (let index = 0; index < convertedTasks[numberedTaskID].taskSubtasks.length; index++) {
    subtasks.push(convertedTasks[numberedTaskID].taskSubtasks[index]);
  }
  boardEditPopupWriteSubtaskBoard();
}

function boardEditPopupOpenAddSubtask() {
  let inputBox = document.getElementById("boardEditPopupAddSubtaskInputBox");
  let inputField = document.getElementById("boardEditPopupAddSubtaskInput");
  let addSubtask = document.getElementById("boardEditPopupaddSubtask");

  addSubtask.classList.add("displayNone");
  inputBox.classList.remove("displayNone");
  inputBox.classList.remove("displayNone");
  inputField.focus();
}

function boardEditPopupAddSubtaskCancel() {
  document.getElementById("boardEditPopupAddSubtaskInput").value = "";
  document.getElementById("boardEditPopupaddSubtask").classList.remove("displayNone");
  document.getElementById("boardEditPopupAddSubtaskInputBox").classList.add("displayNone");
}

function boardEditPopupAddSubtask() {
  let subtaskInput = document.getElementById("boardEditPopupAddSubtaskInput");
  subtasks.push({ subtask: subtaskInput.value, done: false });
  globalSubtaskId = 0;
  subtaskInput.value = "";
  document.getElementById("boardEditPopupaddSubtask").classList.remove("displayNone");
  document.getElementById("boardEditPopupAddSubtaskInputBox").classList.add("displayNone");
  boardEditPopupWriteSubtaskBoard();
}

function boardEditPopupWriteSubtaskBoard() {
  let subtaskBoard = document.getElementById("boardEditPopupSubtaskBoard");
  subtaskBoard.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtaskBoard.innerHTML += subtaskTemplate(i);
  }
}

function boardEditPopupRewriteSubtask(i) {
  boardEditPopupWriteSubtaskBoard();

  let subtask = subtasks[i].subtask;
  let rewriteInput = document.getElementById(`boardEditPopupSubtaskRewriteInput${i}`);
  let rewriteInputBox = document.getElementById(`boardEditPopupSubtaskRewriteInputBox${[i]}`);
  rewriteInputBox.value = subtask;
  rewriteInputBox.classList.toggle("displayNone");
  document.getElementById(`boardEditPopupSubtask${[i]}`).classList.toggle("displayNone");
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function boardEditPopupDeleteSubtaskFromBoard(i) {
  subtasks.splice(i, 1);
  boardEditPopupWriteSubtaskBoard();
}

function boardEditPopupAcceptRewriting(i) {
  let rewriteInput = document.getElementById(`boardEditPopupSubtaskRewriteInput${i}`);
  subtasks[i].subtask = rewriteInput.value;
  document.getElementById(`boardEditPopupSubtaskRewriteInputBox${i}`).classList.toggle("displayNone");
  document.getElementById(`boardEditPopupSubtask${i}`).classList.toggle("displayNone");
  boardEditPopupWriteSubtaskBoard();
}

function boardEditPopupCancelRewritingSubtask(i) {
  boardEditPopupDeleteRewritingSubtask(i);
  boardEditPopupAcceptRewriting(i);
}

function boardEditPopupReadIdFromSubtask(id) {
  let fullId = id;
  let idNumber = fullId.slice(-1);
  globalSubtaskId = idNumber;
  console.log(idNumber);
}

document.addEventListener(
  "click",
  function (event) {
    let taskSection = document.getElementById("boardEditPopupTaskSection");
    if (globalSubtaskId !== "" && taskSection) {
      let i = globalSubtaskId;
      let cancelRewriting = document.getElementById(`boardEditPopupCancelRewritingSubtask${i}`);
      let acceptRewriting = document.getElementById(`boardEditPopupAcceptRewritingSubtask${i}`);
      let subtaskRewriteBox = document.getElementById(`boardEditPopupSubtaskRewriteInput${i}`);

      if (event.target !== cancelRewriting && event.target !== acceptRewriting && event.target !== subtaskRewriteBox) {
        if (document.body.contains(event.target)) {
          boardEditPopupCancelRewritingSubtask(i);
        }
      }
    }
  },
  true
);

function boardEditPopupDeleteRewritingSubtask(i) {
  let rewriteInput = document.getElementById(`boardEditPopupSubtaskRewriteInput${i}`);
  rewriteInput.value = subtasks[i].subtask;
  rewriteInput.focus();
}

function checkEnterKeyTrigger(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    addTaskAddSubtask();
  }
}

let popupElement = document.getElementById("boardTaskPopup");
let popupBackgroundELement = document.getElementById("boardPopupBackground");

function openBoardTaskPopup(i, taskID, numberedTaskID) {
  renderBoardTaskPopupContent(i, taskID, numberedTaskID);
  renderBoardTaskPopupContentUsers(i, numberedTaskID);
  renderBoardTaskPopupSubtasks(i, numberedTaskID);
  popupElement.style.display = "flex";
  popupBackgroundELement.style.display = "flex";

  popupElement.addEventListener("click", stopPropagation);
}

function closeBoardTaskPopup() {
  popupElement.style.display = "none";
  popupBackgroundELement.style.display = "none";
  popupElement.removeEventListener("click", stopPropagation);
  addUserToTaskInsideEditPopup(currentNumberedID);
  loadAllTasks();
}

function renderBoardTaskPopupContent(i, taskID, numberedTaskID) {
  popupElement.innerHTML = boardTaskPopupTemplate(i, taskID, numberedTaskID);
}

function renderBoardTaskPopupContentUsers(i, numberedTaskID) {
  let popupUsersElement = document.getElementById("boardTaskPopupContentAssignedToUserWrapper");
  popupUsersElement.innerHTML = "";
  for (let usersIndex = 0; usersIndex < convertedTasks[numberedTaskID].taskAssignedUser.length; usersIndex++) {
    popupUsersElement.innerHTML += popupUserTemplate(usersIndex, i, numberedTaskID);
  }
}

function renderBoardTaskPopupSubtasks(i, numberedTaskID) {
  let popupSubtasksElement = document.getElementById("boardTaskPopupContentSubtasksList");
  popupSubtasksElement.innerHTML = "";
  for (let subtasksIndex = 0; subtasksIndex < convertedTasks[numberedTaskID].taskSubtasks.length; subtasksIndex++) {
    popupSubtasksElement.innerHTML += popupSubtaskTemplate(subtasksIndex, i, numberedTaskID);
    if (convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done) {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "../images/icons/checked.png";
    } else {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "../images/icons/unchecked.png";
    }
  }
}

function boardTaskPopupChangeSubtaskStatus(subtasksIndex, i, taskFirebaseID, numberedTaskID) {
  convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done = !convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done;
  setSubtaskDonetoTrueOrFalseOnFirebase(i, subtasksIndex, taskFirebaseID, numberedTaskID);
  renderBoardTaskPopupSubtasks(i, numberedTaskID);
}

function setSubtaskDonetoTrueOrFalseOnFirebase(i, subtasksIndex, taskFirebaseID, numberedTaskID) {
  let taskStatus = convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].done;
  if (taskStatus === true) {
    fetchSubtaskDoneToTrue(subtasksIndex, taskFirebaseID);
  }

  if (taskStatus === false) {
    fetchSubtaskDoneToFalse(subtasksIndex, taskFirebaseID);
  }
}

async function fetchSubtaskDoneToTrue(subtasksIndex, taskFirebaseID) {
  await fetch(`${BASE_URL}tasks/${taskFirebaseID}/taskSubtasks/${subtasksIndex}/done.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(true),
  });
}

async function fetchSubtaskDoneToFalse(subtasksIndex, taskFirebaseID) {
  await fetch(`${BASE_URL}tasks/${taskFirebaseID}/taskSubtasks/${subtasksIndex}/done.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(false),
  });
}

let findTaskInput = document.getElementById("findTaskInput");

if (findTaskInput) {
  function addInputListener() {
    findTaskInput.addEventListener("input", renderTasks);
  }

  function removeInputListener() {
    findTaskInput.removeEventListener("input", renderTasks);
  }

  findTaskInput.addEventListener("focus", addInputListener);
  findTaskInput.addEventListener("blur", removeInputListener);
}
