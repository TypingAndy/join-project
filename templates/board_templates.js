function noTaskTemplate() {
  return `
              <div class="noTasksContainer">
                <p>No tasks to do</p>
              </div>
      `;
}

function toDoTaskTemplate(toDoTasks, i, completedSubtaskCount, taskCardUserHtml) {
  const subtasksLength = toDoTasks[i].taskSubtasks ? toDoTasks[i].taskSubtasks.length : 0;
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${toDoTasks[i].numberedTaskID}')" onclick="openBoardTaskPopup(${i}, '${toDoTasks[i].ID}', '${toDoTasks[i].numberedTaskID}')">
                  <div class="taskCardCategory">
                    <p>${toDoTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${toDoTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${toDoTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarToDoTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${subtasksLength} Subtasks</p>
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
  const subtasksLength = inProgressTasks[i].taskSubtasks ? inProgressTasks[i].taskSubtasks.length : 0;
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${inProgressTasks[i].numberedTaskID}')" onclick="openBoardTaskPopup(${i}, '${inProgressTasks[i].ID}', '${inProgressTasks[i].numberedTaskID}')">
                  <div class="taskCardCategory">
                    <p>${inProgressTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${inProgressTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${inProgressTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarInProgressTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${subtasksLength} Subtasks</p>
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
  const subtasksLength = awaitFeedbackTasks[i].taskSubtasks ? awaitFeedbackTasks[i].taskSubtasks.length : 0;
  return ` 
                <div class="taskCard" draggable="true" ondragstart="startDragging('${awaitFeedbackTasks[i].numberedTaskID}')" onclick="openBoardTaskPopup(${i}, '${awaitFeedbackTasks[i].ID}', '${awaitFeedbackTasks[i].numberedTaskID}')">
                  <div class="taskCardCategory">
                    <p>${awaitFeedbackTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${awaitFeedbackTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${awaitFeedbackTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarAwaitFeedbackTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${subtasksLength} Subtasks</p>
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
  const subtasksLength = doneTasks[i].taskSubtasks ? doneTasks[i].taskSubtasks.length : 0;
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${doneTasks[i].numberedTaskID}')" onclick="openBoardTaskPopup(${i}, '${doneTasks[i].ID}', '${doneTasks[i].numberedTaskID}')">
                  <div class="taskCardCategory">
                    <p>${doneTasks[i].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${doneTasks[i].taskTitle}</p>
                  <p class="taskCardDescription">${doneTasks[i].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarDoneTasks${[i]}"></div>
                    </div>
                    <p>${completedSubtaskCount}/${subtasksLength} Subtasks</p>
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

function boardTaskPopupTemplate(i, taskID, numberedTaskID) {
  return `  
  <div class="boardTaskPopupContentWrapper" id="boardTaskPopupContentWrapper">
  <div class="boardTaskPopupContentTop">
    <div class="boardTaskPopupCategoryCard">
      <p class="boardTaskPopupCategoryLabel" id="boardTaskPopupCategoryLabel">${convertedTasks[numberedTaskID].taskCategory}</p>
    </div>
    <img class="boardTaskPopupContentClose" src="./images/icons/close.png" alt="close" onclick="closeBoardTaskPopup(${numberedTaskID})" />
  </div>
  <div class="boardTaskPopupContentCenter">
    <p class="boardTaskPopupContentTitle" id="boardTaskPopupContentTitle">${convertedTasks[numberedTaskID].taskTitle}</p>
    <p class="boardTaskPopupContentDescription" id="boardTaskPopupContentDescription">${convertedTasks[numberedTaskID].taskDescription}</p>
    <div class="boardTaskPopupContentDateWrapper">
      <p class="boardTaskPopupContentDateLabel">Due date:</p>
      <p class="boardTaskPopupContentDate" id="boardTaskPopupContentDate">${convertedTasks[numberedTaskID].taskDate}</p>
    </div>
    <div class="boardTaskPopupContentPrioWrapper">
      <p class="boardTaskPopupContentPrioLabel">Priority:</p>
      <div class="boardTaskPopupContentPrioOutputWrapper">
        <p class="boardTaskPopupContentPrioValue" id="boardTaskPopupContentPrioValue">${convertedTasks[numberedTaskID].taskPrio}</p>
        <img class="boardTaskPopupContentPrioIcon" id="boardTaskPopupContentPrioIcon" src="./images/icons/${convertedTasks[numberedTaskID].taskPrio}.png" alt="medium prio" />
      </div>
    </div>
    <div class="boardTaskPopupContentAssignedToWrapper">
      <p class="boardTaskPopupContentAssignedToLabel">Assigned To:</p>
      <div class="boardTaskPopupContentAssignedToUserWrapper" id="boardTaskPopupContentAssignedToUserWrapper">
        
        <div class="boardTaskPopupContentAssignedToUserContainer">
          <div class="boardTaskPopupContentAssignedToUserCircle">
            <p class="boardTaskPopupContentAssignedToUserInitials">EM</p>
          </div>
          <p class="boardTaskPopupContentAssignedToUserLabel">Emmanuel Mauer</p>
        </div>
        <div class="boardTaskPopupContentAssignedToUserContainer">
          <div class="boardTaskPopupContentAssignedToUserCircle">
            <p class="boardTaskPopupContentAssignedToUserInitials">EM</p>
          </div>
          <p class="boardTaskPopupContentAssignedToUserLabel">Emmanuel Mauer</p>
        </div>
      </div>
    </div>
    <div class="boardTaskPopupContentSubtasksWrapper">
      <p class="boardTaskPopupContentSubtasksLabel">Subtasks:</p>
      <div class="boardTaskPopupContentSubtasksList" id="boardTaskPopupContentSubtasksList">
        <div class="boardTaskPopupContentSubtask">
          <img class="boardTaskPopupContentSubtaskIcon" src="./images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">Implement shit</p>
        </div>
        <div class="boardTaskPopupContentSubtask">
          <img class="boardTaskPopupContentSubtaskIcon" src="./images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">Implement shit</p>
        </div>
      </div>
    </div>
  </div>
  <div class="boardTaskPopupContentBottom">
    <div id="boardTaskPopupContentDeleteContainer" onclick="deleteTask('${taskID}')" class="boardTaskPopupContentDeleteContainer">
      <img class="boardTaskPopupDeleteIcon" src="./images/icons/delete.png" alt="delete" />
      <p>Delete</p>
    </div>
    <div class="boardTaskPopupContentBottomLine"></div>
    <div onclick="renderPopupEditTaskContent('${numberedTaskID}')" class="boardTaskPopupContentEditContainer">
      <img class="boardTaskPopupEditIcon" src="./images/icons/edit.png" alt="edit" />
      <p>Edit</p>
    </div>
  </div>
</div>
`;
}

function popupUserTemplate(usersIndex, i, numberedTaskID) {
  return `
        <div class="boardTaskPopupContentAssignedToUserContainer">
          <div class="boardTaskPopupContentAssignedToUserCircle" style="background-color: ${convertedTasks[numberedTaskID].taskAssignedUserColors[usersIndex]};">
            <p class="boardTaskPopupContentAssignedToUserInitials">${convertedTasks[numberedTaskID].taskAssignedUserInitials[usersIndex]}</p>
          </div>
          <p class="boardTaskPopupContentAssignedToUserLabel">${convertedTasks[numberedTaskID].taskAssignedUser[usersIndex]}</p>
        </div>
  `;
}

function popupSubtaskTemplate(subtasksIndex, i, numberedTaskID) {
  return `
        <div class="boardTaskPopupContentSubtask" onclick="boardTaskPopupChangeSubtaskStatus(${subtasksIndex}, ${i}, '${convertedTasks[numberedTaskID].ID}', ${numberedTaskID})">
          <img class="boardTaskPopupContentSubtaskIcon" id="boardTaskPopupContentSubtaskIcon${subtasksIndex}" src="./images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">${convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].subtask}</p>
        </div>
  `;
}
