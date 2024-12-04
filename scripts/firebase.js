/**
 * Loads all tasks from Firebase and stores them in the global `allUnsortedTasks`.
 * @async
 * @returns {Promise<void>} Resolves when the tasks are loaded.
 */
async function loadTasksObjectFromFirebase() {
  try {
    let response = await fetch(BASE_URL + "tasks.json");
    allUnsortedTasks = await response.json();
  } catch (error) {
    console.error("Error loading tasks from Firebase:", error);
  }
}

/**
 * Posts user data to Firebase and retrieves the new user's ID.
 * @async
 * @param {string} userType - The type of user to create.
 * @returns {Promise<Response>} The response object from the Firebase API.
 */
async function postUserDataToFirebase(userType) {
  try {
    let userData = createUserDataForFirebase(userType);
    const response = await fetch(BASE_URL + `users/.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to post user data");
    }

    const responseData = await response.json();
    currentUserIdFromFirebase = responseData.name;
    return currentUserIdFromFirebase;
  } catch (error) {
    console.error("Error posting user data to Firebase:", error);
    return undefined;
  }
}

/**
 * Deletes a user from Firebase by their ID.
 * @async
 * @param {string} firebaseId - The ID of the user to delete.
 * @returns {Promise<void>} Resolves when the user is deleted.
 */
async function deleteUserFromFirebase(firebaseId) {
  try {
    await fetch(BASE_URL + `users/${firebaseId}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting user from Firebase:", error);
  }
}

/**
 * Updates the status of a subtask on Firebase.
 * @async
 * @param {number} subtasksIndex - The index of the subtask in the task's subtasks array.
 * @param {string} taskID - The ID of the task.
 * @param {boolean} newSubtaskStatus - The new status of the subtask.
 * @returns {Promise<void>} Resolves when the subtask status is updated.
 */
async function toggleSubtaskStatusOnFirebase(subtasksIndex, taskID, newSubtaskStatus) {
  try {
    await fetch(`${BASE_URL}tasks/${taskID}/taskSubtasks/${subtasksIndex}/subtaskDone.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubtaskStatus),
    });
  } catch (error) {
    console.error("Error toggling subtask status on Firebase:", error);
  }
}

/**
 * Updates user data on Firebase.
 * @async
 * @param {string} firebaseId - The ID of the user to update.
 * @param {Object} updatedUserData - The updated user data.
 * @returns {Promise<void>} Resolves when the user data is updated.
 */
async function updateUserInFirebase(firebaseId, updatedUserData) {
  try {
    await fetch(BASE_URL + `users/${firebaseId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });
  } catch (error) {
    console.error("Error updating user in Firebase:", error);
  }
}

/**
 * Loads all user data from Firebase.
 * @async
 * @returns {Promise<Object>} The unsorted user data.
 */
async function loadUserDataFromFirebase() {
  try {
    let response = await fetch(BASE_URL + "users" + ".json");
    unsortedUsers = await response.json();
    return unsortedUsers;
  } catch (error) {
    console.error("Error loading user data from Firebase:", error);
  }
}

/**
 * Extracts the new user ID from a Firebase response.
 * @async
 * @param {Response} response - The response object from Firebase.
 * @returns {Promise<string>} The ID of the newly created user.
 */
async function getNewUserId(response) {
  try {
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error retrieving new user ID:", error);
  }
}

/**
 * Updates the status of a task in Firebase.
 * @async
 * @param {string} newTaskStatus - The new status of the task.
 * @returns {Promise<void>} Resolves when the task status is updated.
 */
async function putNewTaskStatus(newTaskStatus) {
  try {
    await fetch(`${BASE_URL}tasks/${currentDraggedElementID}/taskStatus.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskStatus),
    });
  } catch (error) {
    console.error("Error updating task status in Firebase:", error);
  }
}

/**
 * Posts new task data to Firebase.
 * @async
 * @param {string} taskStatus - The status of the task to create.
 * @returns {Promise<void>} Resolves when the task is created.
 */
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

/**
 * Updates task data in Firebase.
 * @async
 * @param {string} taskStatus - The updated status of the task.
 * @param {string} taskID - The ID of the task to update.
 * @returns {Promise<void>} Resolves when the task data is updated.
 */
async function updateTaskData(taskStatus, taskID) {
  try {
    let createTaskData = editTaskInputData(taskStatus);

    await fetch(BASE_URL + `/tasks/${taskID}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTaskData),
    });
  } catch (error) {
    console.error("Error updating task data in Firebase:", error);
  }
}

/**
 * Deletes a task from Firebase by its ID.
 * @async
 * @param {string} taskID - The ID of the task to delete.
 * @returns {Promise<void>} Resolves when the task is deleted.
 */
async function deleteTaskFromFirebase(taskID) {
  try {
    await fetch(`${BASE_URL}tasks/${taskID}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting task from Firebase:", error);
  }
}
