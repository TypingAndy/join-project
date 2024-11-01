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
    clearSignUpInputField(nameInput, mailInput, passwordInput, confirmPasswordInput);
    acceptPrivacyPolicyCheck();
    loadUserData();
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
  
  async function deleteTask(taskID) {
    await fetch(`${BASE_URL}tasks/${taskID}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    closeBoardTaskPopup();
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
  
  async function loadUserData(path = "users") {
    let response = await fetch(BASE_URL + path + ".json");
    responseToJson = await response.json();
    sortUsersByName(responseToJson);
    createUserInitials();
    loadFullNameList();
    addTaskRenderCategoryDropdown();
  }