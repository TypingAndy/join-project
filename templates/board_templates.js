function noTaskTemplate() {
  return `
              <div class="noTasksContainer">
                <p>No tasks to do</p>
              </div>
      `;
}

function toDoTaskTemplate(toDoTasks, i, completedSubtaskCount, taskCardUserHtml) {
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${toDoTasks[i].numberedID}')">
                  <div class="taskCardCategory">
                    <p>${toDoTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${toDoTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${toDoTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarToDoTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${toDoTasks[i].taskSubtasks.length} Subtasks</p>
                  </div>
                  <div class="taskCardBottomContainer">
                    <div class="taskCardUserContainer">
                 ${taskCardUserHtml}
                    </div>
                    <img src="./images/icons/${toDoTasks[i].taskPrio}.png" alt="" />
                  </div>
                </div>
      `;
}

function inProgressTaskTemplate(inProgressTasks, i, completedSubtaskCount, taskCardUserHtml) {
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${inProgressTasks[i].numberedID}')">
                  <div class="taskCardCategory">
                    <p>${inProgressTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${inProgressTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${inProgressTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarInProgressTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${inProgressTasks[i].taskSubtasks.length} Subtasks</p>
                  </div>
                  <div class="taskCardBottomContainer">
                    <div class="taskCardUserContainer">
                 ${taskCardUserHtml}
                    </div>
                    <img src="./images/icons/${inProgressTasks[i].taskPrio}.png" alt="" />
                  </div>
                </div>
      `;
}

function awaitFeedbackTaskTemplate(awaitFeedbackTasks, i, completedSubtaskCount, taskCardUserHtml) {
  return ` 
                <div class="taskCard" draggable="true" ondragstart="startDragging('${awaitFeedbackTasks[i].numberedID}')">
                  <div class="taskCardCategory">
                    <p>${awaitFeedbackTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${awaitFeedbackTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${awaitFeedbackTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarAwaitFeedbackTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${awaitFeedbackTasks[i].taskSubtasks.length} Subtasks</p>
                  </div>
                  <div class="taskCardBottomContainer">
                    <div class="taskCardUserContainer">
                 ${taskCardUserHtml}
                    </div>
                    <img src="./images/icons/${awaitFeedbackTasks[i].taskPrio}.png" alt="" />
                  </div>
                </div>
      `;
}

function doneTaskTemplate(doneTasks, i, completedSubtaskCount, taskCardUserHtml) {
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${doneTasks[i].numberedID}')">
                  <div class="taskCardCategory">
                    <p>${doneTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${doneTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${doneTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarDoneTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${doneTasks[i].taskSubtasks.length} Subtasks</p>
                  </div>
                  <div class="taskCardBottomContainer">
                    <div class="taskCardUserContainer">
                 ${taskCardUserHtml}
                    </div>
                    <img src="./images/icons/${doneTasks[i].taskPrio}.png" alt="" />
                  </div>
                </div>
      `;
}
