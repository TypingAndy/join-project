async function loadAllTasks(path = "tasks") {
  let isOnBoardPage = window.location.pathname.endsWith("board.html");
  let response = await fetch(BASE_URL + path + ".json");
  allUnsortedTasks = await response.json();
  convertUnsortedTasksToArray();
  addFirebaseIDtoConvertedTasksArray();
  addSimpleIdToTasks();
  sortAllTasks();
  if (isOnBoardPage) {
    renderTasks();
  }
}

async function postSignUpData() {
  let { signUpData, confirmPasswordInput } = getSignUpInputData();
  await fetch(BASE_URL + `users/.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });
}

async function postAddContactData() {
  let contactData = createContactDataForFirebase();
  await fetch(BASE_URL + `users/.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
}

async function putNewTaskStatus() {
  let taskID = convertedTasks[currentDraggedElementID].ID;
  let task = convertedTasks[currentDraggedElementID];
  await fetch(`${BASE_URL}tasks/${taskID}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
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
  window.location.href = "./html/board.html";
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
}

async function deleteTask(taskID) {
  await fetch(`${BASE_URL}tasks/${taskID}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchUserDataFromFirebase(path = "users") {
  let response = await fetch(BASE_URL + path + ".json");
  responseToJson = await response.json();
  sortUsersByName(responseToJson);
  createUserInitials();
  renderSortedUsersToDropdown();
  addTaskRenderCategoryDropdown();
}
