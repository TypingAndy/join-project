//functions addTask---------------------------------------------------------------------

function getNewTaskInputData() {
    let taskTitleInput = document.getElementById("taskTitleInput").value;
    let taskDescriptionInput = document.getElementById("taskDescriptionInput").value;
    let taskDateInput = document.getElementById("taskDateInput").value;
  
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
  
  async function postTaskData() {
    let createTaskData = getNewTaskInputData();
  
    await fetch(BASE_URL + `/tasks.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTaskData),
    });
    window.location.href = "board.html";
  }
  
  function editTaskInputData() {
    let taskTitleInput = document.getElementById("editPopupTitleInput").value;
    let taskDescriptionInput = document.getElementById("editPopupDescriptionInput").value;
    let taskDateInput = document.getElementById("editPopupDateInput").value;
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
  
  async function updateTaskData(currentNumberedID) {
    let createTaskData = editTaskInputData();
    let taskFirebaseID = convertedTasks[currentNumberedID].ID;
  
    await fetch(BASE_URL + `/tasks/${taskFirebaseID}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTaskData),
    });
  
    loadAllTasks();
    closeBoardTaskPopup();
  }
  
  //functions addTask---------assign Contacts------------------------------------------------------------
  
  function loadFullNameList() {
    let dropdown = document.getElementById("userNameDropDown");
    dropdown.innerHTML = "";
  
    for (let i = 0; i < sortedUsers.length; i++) {
      let currentColor = getColorFromUser(i);
      let blackWhite = addTaskAdaptFontColorToBackground(i);
      dropdown.innerHTML += nameListTemplate(i, sortedUsers, currentColor, blackWhite, allUserInitials);
    }
  }
  
  function addTaskAdaptFontColorToBackground(i) {
    let currentColor = getColorFromUser(i);
    currentColor = currentColor.replace(/#/, "");
  
    let r = parseInt(currentColor.substring(0, 2), 16);
    let g = parseInt(currentColor.substring(2, 4), 16);
    let b = parseInt(currentColor.substring(4, 6), 16);
  
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 128 ? "black" : "white";
  }
  
  function addUserToTaskToggle(name, i, userFirebaseId) {
    let inputField = document.getElementById("addTaskContactsSearchArea");
    let check = document.getElementById(`check${i}`);
    let noCheck = document.getElementById(`noCheck${i}`);
    let assignUserID = document.getElementById(`addTaskAssignUserId${i}`);
    let blackWhite = addTaskAdaptFontColorToBackground(i);
  
    if (!addTaskAssignedUserFirebaseIds.includes(userFirebaseId)) addUserToTask(name, i, check, noCheck, assignUserID, blackWhite, userFirebaseId);
    else {
      let userIndex = addTaskAssignedUserFirebaseIds.indexOf(userFirebaseId);
      if (userIndex > -1) {
        removeUserFromTask(check, noCheck, assignUserID, userIndex);
      }
    }
    addUserSymbolsToAssign();
  }
  
  function addUserToTask(name, i, check, noCheck, assignUserID, blackWhite, userFirebaseId) {
    addTaskCurrentUser.push(name);
    taskAssignedUserInitials.push(allUserInitials[i]);
    addTaskAssignedUserColors.push(sortedUsers[i].color);
    addTaskAssignedUserFontColors.push(blackWhite);
    addTaskAssignedUserFirebaseIds.push(userFirebaseId);
  
    check.classList.remove("displayNone");
    noCheck.classList.add("displayNone");
    assignUserID.classList.add("addTaskNewBackgroundChecked");
  }
  
  function removeUserFromTask(check, noCheck, assignUserID, userIndex) {
    addTaskCurrentUser.splice(userIndex, 1);
    taskAssignedUserInitials.splice(userIndex, 1);
    addTaskAssignedUserColors.splice(userIndex, 1);
    addTaskAssignedUserFontColors.splice(userIndex, 1);
    addTaskAssignedUserFirebaseIds.splice(userIndex, 1);
  
    check.classList.add("displayNone");
    noCheck.classList.remove("displayNone");
    assignUserID.classList.remove("addTaskNewBackgroundChecked");
  }
  
  function addUserSymbolsToAssign() {
    let addUserSymbolsAssign = document.getElementById("addUserSymbolsAssign");
    addUserSymbolsAssign.innerHTML = "";
  
    for (let i = 0; i < addTaskCurrentUser.length; i++) {
      addUserSymbolsAssign.innerHTML += addUserSymbolTemplate(i);
    }
  }
  
  function addTaskFilterFunction() {
    let input = document.getElementById("addTaskContactsSearchArea");
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
  
  function insertMinSelectableDateAtAddTask() {
    document.getElementById("taskDateInput").setAttribute("min", currentDate);
  }
  
  // addTask --------------------------- priority
  
  function setTaskPrio(priority) {
    taskPrioInput = priority;
    setTaskPrioButtonColorSwitch(priority);
  }
  
  function setTaskPrioButtonColorSwitch(priority) {
    buttonUrgent = document.getElementsByClassName("addTaskPrioButtonUrgent")[0];
    buttonMedium = document.getElementsByClassName("addTaskPrioButtonMedium")[0];
    buttonLow = document.getElementsByClassName("addTaskPrioButtonLow")[0];
  
    if (priority == "urgent") highlightPrioButtonUrgent();
    if (priority == "medium") highlightPrioButtonMedium();
    if (priority == "low") highlightPrioButtonLow();
  }
  
  function highlightPrioButtonUrgent() {
    buttonUrgent.classList.add("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
    buttonMedium.classList.remove("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
    buttonLow.classList.remove("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
  }
  function highlightPrioButtonMedium() {
    buttonMedium.classList.add("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
    buttonUrgent.classList.remove("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
    buttonLow.classList.remove("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
  }
  function highlightPrioButtonLow() {
    buttonLow.classList.add("addTaskPrioButtonLowOnClick", "addTaskPrioButtonLowIcon");
    buttonUrgent.classList.remove("addTaskPrioButtonUrgentOnClick", "addTaskPrioButtonUrgentIcon");
    buttonMedium.classList.remove("addTaskPrioButtonMediumOnClick", "addTaskPrioButtonMediumIcon");
  }
  
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
  
  function addTaskAddSubtaskCancel() {
    document.getElementById("addSubtaskInput").value = "";
    document.getElementById("addSubtask").classList.remove("displayNone");
    document.getElementById("addSubtaskInputBox").classList.add("displayNone");
  }
  
  function addTaskAddSubtask() {
    let subtaskInput = document.getElementById("addSubtaskInput");
    subtasks.push({ subtask: subtaskInput.value, done: false });
    globalSubtaskId = 0;
    subtaskInput.value = "";
    document.getElementById("addSubtask").classList.remove("displayNone");
    document.getElementById("addSubtaskInputBox").classList.add("displayNone");
    addTaskWriteSubtaskBoard();
  }
  
  function addTaskWriteSubtaskBoard() {
    let subtaskBoard = document.getElementById("subtaskBoard");
    subtaskBoard.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
      subtaskBoard.innerHTML += subtaskTemplate(i);
    }
  }
  
  function addTaskRewriteSubtask(i) {
    addTaskWriteSubtaskBoard();
  
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
    addTaskWriteSubtaskBoard();
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
  
  function checkEnterKeyTrigger(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      addTaskAddSubtask();
    }
  }