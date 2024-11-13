function noTaskTemplate() {
  return `
              <div class="noTasksContainer">
                <p>No tasks to do</p>
              </div>
      `;
}

function taskCardTemplate(taskIndex, filteredLokalTasksArray, taskCardAllInitialsTemplate) {
  const subtasksLength = filteredLokalTasksArray[taskIndex].taskSubtasks ? filteredLokalTasksArray[taskIndex].taskSubtasks.length : 0;
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${filteredLokalTasksArray[taskIndex].numberedTaskID}')" onclick="openBoardTaskPopup(${taskIndex}, '${filteredLokalTasksArray[taskIndex].ID}', '${filteredLokalTasksArray[taskIndex].numberedTaskID}')">
                  <div class="taskCardCategory">
                    <p>${filteredLokalTasksArray[taskIndex].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${filteredLokalTasksArray[taskIndex].taskTitle}</p>
                  <p class="taskCardDescription">${filteredLokalTasksArray[taskIndex].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarToDoTasks${[taskIndex]}"></div>
                    </div>
                    <p>!!/${filteredLokalTasksArray[taskIndex].taskSubtasks.length} Subtasks</p>
                  </div>
                  <div class="taskCardBottomContainer">
                    <div class="taskCardUserContainer">
                 ${taskCardAllInitialsTemplate}
                    </div>
                    <img src="../images/icons/${filteredLokalTasksArray[taskIndex].taskPrio}.png" alt="" />
                  </div>
                </div>
      `;
}

function taskCardInitialTemplate(users, currentUserID) {
  return `
                <div class="taskCardUser" style="background-color: ${users[currentUserID].color};">
                  <p style="color: ${users[currentUserID].fontColor};">
                  ${users[currentUserID].initials}
                  </p>
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
    <img class="boardTaskPopupContentClose" src="../images/icons/close.png" alt="close" onclick="closeBoardTaskPopup(${numberedTaskID})" />
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
        <img class="boardTaskPopupContentPrioIcon" id="boardTaskPopupContentPrioIcon" src="../images/icons/${convertedTasks[numberedTaskID].taskPrio}.png" alt="medium prio" />
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
          <img class="boardTaskPopupContentSubtaskIcon" src="../images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">Implement shit</p>
        </div>
        <div class="boardTaskPopupContentSubtask">
          <img class="boardTaskPopupContentSubtaskIcon" src="../images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">Implement shit</p>
        </div>
      </div>
    </div>
  </div>
  <div class="boardTaskPopupContentBottom">
    <div id="boardTaskPopupContentDeleteContainer" onclick="deleteTask('${taskID}'), closeBoardTaskPopup();" class="boardTaskPopupContentDeleteContainer">
      <img class="boardTaskPopupDeleteIcon" src="../images/icons/trashcan_black.png" alt="delete" />
      <p>Delete</p>
    </div>
    <div class="boardTaskPopupContentBottomLine"></div>
    <div onclick="renderPopupEditTaskContent('${numberedTaskID}')" class="boardTaskPopupContentEditContainer">
      <img class="boardTaskPopupEditIcon" src="../images/icons/edit.png" alt="edit" />
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
          <img class="boardTaskPopupContentSubtaskIcon" id="boardTaskPopupContentSubtaskIcon${subtasksIndex}" src="../images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">${convertedTasks[numberedTaskID].taskSubtasks[subtasksIndex].subtask}</p>
        </div>
  `;
}
