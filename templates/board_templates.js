function noTaskTemplate() {
  return `
              <div class="noTasksContainer">
                <p>No tasks to do</p>
              </div>
      `;
}

function taskCardTemplate(taskIndex, filteredLokalTasksArray, taskCardAllInitialsTemplate, subtasksArrayLength, subtasksDone) {
  return `
                <div class="taskCard" draggable="true" ondragstart="startDragging('${filteredLokalTasksArray[taskIndex].ID}')" onclick="openBoardTaskPopup('${filteredLokalTasksArray[taskIndex].ID}')">
                  <div class="taskCardCategory">
                    <p>${filteredLokalTasksArray[taskIndex].taskCategory}</p>
                  </div>
                  <p class="taskCardTitle">${filteredLokalTasksArray[taskIndex].taskTitle}</p>
                  <p class="taskCardDescription">${filteredLokalTasksArray[taskIndex].taskDescription}</p>
                  <div class="taskCardSubtasksContainer">
                    <div class="taskCardSubtaskBarWrapper">
                      <div class="taskCardSubtaskBar" id="taskCardSubtaskBarToDoTasks${[taskIndex]}"></div>
                    </div>
                    <p>${subtasksDone}/${subtasksArrayLength} Subtasks</p>
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

function taskCardSingleInitialsTemplate(users, currentUserID) {
  return `
                <div class="taskCardUser" style="background-color: ${users[currentUserID].color};">
                  <p style="color: ${users[currentUserID].fontColor};">
                  ${users[currentUserID].initials}
                  </p>
                </div>
  
  `;
}

function boardTaskPopupTemplate(taskID) {
  return `  
  <div class="boardTaskPopupContentWrapper" id="boardTaskPopupContentWrapper">
  <div class="boardTaskPopupContentTop">
    <div class="boardTaskPopupCategoryCard">
      <p class="boardTaskPopupCategoryLabel" id="boardTaskPopupCategoryLabel">${allUnsortedTasks[taskID].taskCategory}</p>
    </div>
    <img class="boardTaskPopupContentClose" src="../images/icons/close.png" alt="close" onclick="closeBoardTaskPopup()" />
  </div>
  <div class="boardTaskPopupContentCenter">
    <p class="boardTaskPopupContentTitle" id="boardTaskPopupContentTitle">${allUnsortedTasks[taskID].taskTitle}</p>
    <p class="boardTaskPopupContentDescription" id="boardTaskPopupContentDescription">${allUnsortedTasks[taskID].taskDescription}</p>
    <div class="boardTaskPopupContentDateWrapper">
      <p class="boardTaskPopupContentDateLabel">Due date:</p>
      <p class="boardTaskPopupContentDate" id="boardTaskPopupContentDate">${allUnsortedTasks[taskID].taskDate}</p>
    </div>
    <div class="boardTaskPopupContentPrioWrapper">
      <p class="boardTaskPopupContentPrioLabel">Priority:</p>
      <div class="boardTaskPopupContentPrioOutputWrapper">
        <p class="boardTaskPopupContentPrioValue" id="boardTaskPopupContentPrioValue">${allUnsortedTasks[taskID].taskPrio}</p>
        <img class="boardTaskPopupContentPrioIcon" id="boardTaskPopupContentPrioIcon" src="../images/icons/${allUnsortedTasks[taskID].taskPrio}.png" alt="medium prio" />
      </div>
    </div>
    <div class="boardTaskPopupContentAssignedToWrapper">
      <p class="boardTaskPopupContentAssignedToLabel">Assigned To:</p>
      <div class="boardTaskPopupContentAssignedToUserWrapper" id="boardTaskPopupContentAssignedToUserWrapper">
      </div>
    </div>
    <div class="boardTaskPopupContentSubtasksWrapper">
      <p class="boardTaskPopupContentSubtasksLabel">Subtasks:</p>
      <div class="boardTaskPopupContentSubtasksList" id="boardTaskPopupContentSubtasksList">
      </div>
    </div>
  </div>
  <div class="boardTaskPopupContentBottom">
    <div id="boardTaskPopupContentDeleteContainer" onclick="deleteTask('${taskID}'), closeBoardTaskPopup();" class="boardTaskPopupContentDeleteContainer">
      <img class="boardTaskPopupDeleteIcon" src="../images/icons/trashcan_black.png" alt="delete" />
      <p>Delete</p>
    </div>
    <div class="boardTaskPopupContentBottomLine"></div>
    <div onclick="renderPopupEditTaskContent('${taskID}')" class="boardTaskPopupContentEditContainer">
      <img class="boardTaskPopupEditIcon" src="../images/icons/edit.png" alt="edit" />
      <p>Edit</p>
    </div>
  </div>
</div>
`;
}

function popupUserTemplate(currentUserId) {
  return `
        <div class="boardTaskPopupContentAssignedToUserContainer">
          <div class="boardTaskPopupContentAssignedToUserCircle" style="background-color: ${unsortedUsers[currentUserId].color};">
            <p class="boardTaskPopupContentAssignedToUserInitials">${unsortedUsers[currentUserId].initials}</p>
          </div>
          <p class="boardTaskPopupContentAssignedToUserLabel">${unsortedUsers[currentUserId].name}</p>
        </div>
  `;
}

function popupSubtaskTemplate(subtasksIndex, taskID) {
  return `
        <div class="boardTaskPopupContentSubtask" onclick="boardTaskPopupChangeSubtaskStatus(${subtasksIndex},'${taskID}')">
          <img class="boardTaskPopupContentSubtaskIcon" id="boardTaskPopupContentSubtaskIcon${subtasksIndex}" src="../images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">${allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskName}</p>
        </div>
  `;
}
