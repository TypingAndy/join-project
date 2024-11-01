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



function openAddTaskPopup() {}
