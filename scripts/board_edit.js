/**
 * Resets the task form in Edit to its default state and removes all subtasks.
 */
function clearTaskFormEdit() {
  renderTaskForm(globalTaskStatus || "to do", globalRenderLocation);
  deleteAllSubtaskFromList();
  renderSubtasksToList();
}

/**
 * Fills the task form with the current data of the task for editing.
 * @param {string} taskId - The ID of the task to fill the form with.
 */
function fillTaskFormEdit(taskId) {
  const task = allUnsortedTasks[taskId];
  ["taskTitleInput", "taskDescriptionInput", "dateInput", "taskFormCategoryInput"].forEach(
    (id, i) => (document.getElementById(id).value = [task.taskTitle, task.taskDescription, task.taskDate, task.taskCategory.category][i])
  );
  toggleTaskCurrentUserInTaskFormEdit(taskId);
  setTaskPrio(task.taskPrio);
  fillSubtaskListInTaskFormEdit(taskId);
  validateTaskForm();
  hideTaskFormHeader();
  hidesClearButtonInEdit();
}

/**
 * Toggles the assignment of users in the task form for editing a task.
 * @param {string} taskId - The ID of the task whose users should be toggled in the form.
 */
function toggleTaskCurrentUserInTaskFormEdit(taskId) {
  if (allUnsortedTasks[taskId].taskAssignedUsersIds) {
    for (let i = 0; i < allUnsortedTasks[taskId].taskAssignedUsersIds.length; i++) {
      toggleUserInTaskForm(allUnsortedTasks[taskId].taskAssignedUsersIds[i]);
    }
  }
}

/**
 * Renders the task form in the task popup for editing an existing task.
 * @param {string} taskID - The ID of the task to be edited.
 */
function renderTaskFormEdit(taskID) {
  let titleAcceptTaskButton = "Ok";
  let fetchStatus = "PATCH";
  let taskStatus = allUnsortedTasks[taskID].taskStatus;
  let taskForm = document.getElementById("boardTaskPopupContentWrapper");
  let postOrPatchFunction = "updateTaskData";
  taskForm.innerHTML = taskFormTemplate(taskStatus, titleAcceptTaskButton, taskID, fetchStatus, postOrPatchFunction);
  fillUserDropdown();
  fillCategoryDropdown();
  renderSubtasksToList();
  validateTaskForm();
}

/**
 * Fills the list of subtasks in the task form for editing a task.
 * @param {string} taskId - The ID of the task whose subtasks should be filled in the form.
 */
function fillSubtaskListInTaskFormEdit(taskId) {
  let subtaskList = document.getElementById("taskFormSubtaskList");
  subtaskList.innerHTML = "";
  let task = allUnsortedTasks[taskId];
  if (!task.taskSubtasks) {
    return;
  }
  subtasks = task.taskSubtasks;
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.innerHTML += subtaskTemplate(i);
  }
}

/**
 * Hides AddTask title in Edit Task Form.
 */
function hideTaskFormHeader() {
  if (window.location.pathname.includes("board.html")) {
    document.querySelectorAll(".taskFormHeader").forEach((el) => {
      el.style.display = "none";
    });
    document.querySelectorAll(".taskFormHeaderBox").forEach((el) => {
      el.style.height = "0";
    });
  }
}

/**
 * Hides ClearButton title in Edit Task Form.
 */
function hidesClearButtonInEdit() {
  let clearButton = document.getElementById("clearButton");
  if (window.location.pathname.includes("board.html")) {
    clearButton.classList.add("displayNone");
  }
}
