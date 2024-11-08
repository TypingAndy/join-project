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

function addUserToTaskToggle(i) {
  let check = document.getElementById(`check${i}`);
  let noCheck = document.getElementById(`noCheck${i}`);
  let userContainer = document.getElementById(`userContainerInsideUserDropdown${i}`);

  check.classList.toggle("displayNone");
  noCheck.classList.toggle("displayNone");

  userContainer.classList.toggle("userDropdownUserContainerBackground");
  userContainer.classList.toggle("userDropdownUserContainerBackgroundToggled");
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

// subtask

// function addTaskOpenAddSubtask() {
//   let inputBox = document.getElementById("addSubtaskInputBox");
//   let inputField = document.getElementById("addSubtaskInput");
//   let addSubtask = document.getElementById("addSubtask");

//   addSubtask.classList.add("displayNone");
//   inputBox.classList.remove("displayNone");
//   inputBox.classList.remove("displayNone");
//   inputField.focus();
// }

// function addTaskWriteSubtaskBoard() {
//   let subtaskBoard = document.getElementById("subtaskBoard");
//   subtaskBoard.innerHTML = "";
//   for (let i = 0; i < subtasks.length; i++) {
//     subtaskBoard.innerHTML += subtaskTemplate(i);
//   }
// }

// function addTaskRewriteSubtask(i) {
//   let subtask = subtasks[i].subtask;
//   let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
//   let rewriteInputBox = document.getElementById(`addTaskSubtaskRewriteInputBox${[i]}`);
//   rewriteInputBox.value = subtask;
//   rewriteInputBox.classList.toggle("displayNone");
//   document.getElementById(`addTasksSubtask${[i]}`).classList.toggle("displayNone");
//   rewriteInput.value = subtasks[i].subtask;
//   rewriteInput.focus();
// }

// function addTaskDeleteSubtaskFromBoard(i) {
//   subtasks.splice(i, 1);
// }

// function addTaskAcceptRewriting(i) {
//   let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
//   subtasks[i].subtask = rewriteInput.value;
//   document.getElementById(`addTaskSubtaskRewriteInputBox${i}`).classList.toggle("displayNone");
//   document.getElementById(`addTasksSubtask${i}`).classList.toggle("displayNone");
//   addTaskWriteSubtaskBoard();
// }

// function addTaskCancelRewritingSubtask(i) {
//   addTaskDeleteRewritingSubtask(i);
//   addTaskAcceptRewriting(i);
// }

// function readIdFromSubtask(id) {
//   let fullId = id;
//   let idNumber = fullId.slice(-1);
//   globalSubtaskId = idNumber;
//   console.log(idNumber);
// }

// document.addEventListener("click", function (event) {
//   if (globalSubtaskId !== "") {
//     let i = globalSubtaskId;
//     let cancelRewriting = document.getElementById(`addTaskCancelRewritingSubtask${i}`);
//     let acceptRewriting = document.getElementById(`addTaskAcceptRewritingSubtask${i}`);
//     let subtaskRewriteBox = document.getElementById(`addTaskSubtaskRewriteInput${i}`);

//     if (event.target !== cancelRewriting && event.target !== acceptRewriting && event.target !== subtaskRewriteBox) {
//       if (document.body.contains(event.target)) {
//         addTaskCancelRewritingSubtask(i);
//       }
//     }
//   }
// });

// function addTaskDeleteRewritingSubtask(i) {
//   let rewriteInput = document.getElementById(`addTaskSubtaskRewriteInput${i}`);
//   rewriteInput.value = subtasks[i].subtask;
//   rewriteInput.focus();
// }

// function acceptSubtaskOnEnterKeyTrigger(event) {
//   if (event.key === "Enter" || event.keyCode === 13) {
//     addTaskAddSubtask();
//   }
// }

// collecting DAta

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
