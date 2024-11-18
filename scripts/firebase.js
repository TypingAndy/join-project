async function loadTasksObjectFromFirebase() {
  let response = await fetch(BASE_URL + "tasks.json");
  allUnsortedTasks = await response.json();
}

async function postUserDataToFirebase(userType) {
  let userData = createUserDataForFirebase(userType);
  const response = await fetch(BASE_URL + `users/.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  currentUserIdFromFirebase = (await response.json()).name;
  return response;
}

async function deleteUserFromFirebase(firebaseId) {
  await fetch(BASE_URL + `users/${firebaseId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function toggleSubtaskStatusOnFirebase(subtasksIndex, taskID, newSubtaskStatus) {
  await fetch(`${BASE_URL}tasks/${taskID}/taskSubtasks/${subtasksIndex}/subtaskDone.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSubtaskStatus),
  });
  console.log("subtask toggeled");
}

async function updateUserInFirebase(firebaseId, updatedUserData) {
  await fetch(BASE_URL + `users/${firebaseId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  });
}

async function loadUserDataFromFirebase() {
  let response = await fetch(BASE_URL + "users" + ".json");
  unsortedUsers = await response.json();
  return unsortedUsers;
}

async function getNewUserId(response) {
  const data = await response.json();
  return data.name;
}

async function putNewTaskStatus(newTaskStatus) {
  await fetch(`${BASE_URL}tasks/${currentDraggedElementID}/taskStatus.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskStatus),
  });
}

async function postTaskData(taskStatus) {
  try {
    let createTaskData = getNewTaskInputData(taskStatus);
    const response = await fetch(BASE_URL + `/tasks.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTaskData),
    });

    if (!response.ok) {
      throw new Error("Failed to post task data");
    }
  } catch (error) {
    console.error("Error posting task data:", error);
  }
}


//is this needed???????????????????????
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
