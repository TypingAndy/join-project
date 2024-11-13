async function convertUnsortedTasksToArray() {
  convertedTasks = Object.values(allUnsortedTasks);
}

function addFirebaseIDtoConvertedTasksArray() {
  let newArray = convertedTasks.map((item, index) => {
    let id = Object.keys(allUnsortedTasks)[index];
    return { ...item, ID: id };
  });
  convertedTasks = newArray;
}

function addSimpleIdToTasks() {
  for (let i = 0; i < convertedTasks.length; i++) {
    let newArray = convertedTasks.map((item, i) => {
      let id = [i];
      return { ...item, numberedTaskID: id };
    });
    convertedTasks = newArray;
  }
}

function sortAllTasks() {
  toDoTasks = convertedTasks.filter((t) => t.taskStatus == "to do");
  doneTasks = convertedTasks.filter((t) => t.taskStatus == "done");
  inProgressTasks = convertedTasks.filter((t) => t.taskStatus == "in progress");
  awaitFeedbackTasks = convertedTasks.filter((t) => t.taskStatus == "await feedback");
}

function renderTasks() {
  let searchTerm = document.getElementById("findTaskInput").value;

  let inProgressElement = document.getElementById("inProgressContentWrapper");
  let toDoElement = document.getElementById("toDoSectionContentWrapper");
  let awaitFeedbackElement = document.getElementById("awaitFeedbackContentWrapper");
  let doneElement = document.getElementById("doneContentWrapper");

  let filteredInProgressTasks = filterTasks(inProgressTasks, searchTerm);
  let filteredToDoTasks = filterTasks(toDoTasks, searchTerm);
  let filteredAwaitFeedbackTasks = filterTasks(awaitFeedbackTasks, searchTerm);
  let filteredDoneTasks = filterTasks(doneTasks, searchTerm);

  renderInProgressTasks(inProgressElement, filteredInProgressTasks);
  renderToDoTasks(toDoElement, filteredToDoTasks);
  renderAwaitFeedbackTasks(awaitFeedbackElement, filteredAwaitFeedbackTasks);
  renderDoneElementTasks(doneElement, filteredDoneTasks);
}

function filterTasks(tasks, searchTerm) {
  return tasks.filter((task) => task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()));
}

function renderToDoTasks(toDoElement, tasks) {
  if (tasks.length < 1) {
    toDoElement.innerHTML = noTaskTemplate();
  } else {
    toDoElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
              <div class="taskCardUser" style="background-color: ${backgroundColor};">
                <p style="color: ${fontColor};">
                  ${tasks[i].taskAssignedUserInitials[index]}
                </p>
              </div>
            `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      toDoElement.innerHTML += toDoTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarToDoTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function renderInProgressTasks(inProgressElement, tasks) {
  if (tasks.length < 1) {
    inProgressElement.innerHTML = noTaskTemplate();
  } else {
    inProgressElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
              <div class="taskCardUser" style="background-color: ${backgroundColor};">
                <p style="color: ${fontColor};">
                  ${tasks[i].taskAssignedUserInitials[index]}
                </p>
              </div>
            `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      inProgressElement.innerHTML += inProgressTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarInProgressTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function renderAwaitFeedbackTasks(awaitFeedbackElement, tasks) {
  if (tasks.length < 1) {
    awaitFeedbackElement.innerHTML = noTaskTemplate();
  } else {
    awaitFeedbackElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
              <div class="taskCardUser" style="background-color: ${backgroundColor};">
                <p style="color: ${fontColor};">
                  ${tasks[i].taskAssignedUserInitials[index]}
                </p>
              </div>
            `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      awaitFeedbackElement.innerHTML += awaitFeedbackTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarAwaitFeedbackTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function renderDoneElementTasks(doneElement, tasks) {
  if (tasks.length < 1) {
    doneElement.innerHTML = noTaskTemplate();
  } else {
    doneElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      let taskCardUserHtml = "";
      if (!tasks[i].taskAssignedUserInitials) {
        taskCardUserHtml = "";
      } else {
        for (let index = 0; index < tasks[i].taskAssignedUserInitials.length; index++) {
          const backgroundColor = tasks[i].taskAssignedUserColors[index] || "#000000";
          const fontColor = tasks[i].taskAssignedUserFontColors[index] || "#FFFFFF";
          taskCardUserHtml += `
              <div class="taskCardUser" style="background-color: ${backgroundColor};">
                <p style="color: ${fontColor};">
                  ${tasks[i].taskAssignedUserInitials[index]}
                </p>
              </div>
            `;
        }
      }
      let completedSubtaskCount = 0;
      let subtaskPercentage = 0;
      if (tasks[i].taskSubtasks && tasks[i].taskSubtasks.length > 0) {
        completedSubtaskCount = tasks[i].taskSubtasks.filter((subtask) => subtask.done).length;
        subtaskPercentage = (completedSubtaskCount / tasks[i].taskSubtasks.length) * 100;
      }
      doneElement.innerHTML += doneTaskTemplate(tasks, i, completedSubtaskCount, taskCardUserHtml);
      document.getElementById(`taskCardSubtaskBarDoneTasks${[i]}`).style.width = subtaskPercentage + `%`;
    }
  }
}

function startDragging(id) {
  currentDraggedElementID = id;
  console.log(currentDraggedElementID);
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(taskStatus) {
  convertedTasks[currentDraggedElementID]["taskStatus"] = taskStatus;
  putNewTaskStatus();
  sortAllTasks();
  renderTasks();
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
  editPopUpAddUserToTask(currentNumberedID);
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
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "./images/icons/checked.png";
    } else {
      document.getElementById("boardTaskPopupContentSubtaskIcon" + subtasksIndex).src = "./images/icons/unchecked.png";
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



// render TaskForm


function toggleBoardTaskForm() {
let taskForm = document.getElementById('taskFormBoardContainer');
taskForm.classList.toggle('displayNone');
}



