/**
 * Generates the HTML template for displaying a message when there are no tasks.
 * 
 * @returns {string} The HTML string for the "No tasks to do" message.
 */
function noTaskTemplate() {
  return /*html*/ `
              <div class="noTasksContainer">
                <p>No tasks to do</p>
              </div>
      `;
}

/**
 * Generates the HTML template for a task card with specific task details.
 * 
 * @param {number} taskIndex - The index of the task in the filtered task array.
 * @param {Array} filteredLokalTasksArray - The array of filtered tasks.
 * @param {string} taskCardAllInitialsTemplate - The template for the task card initials.
 * @param {number} subtasksArrayLength - The total number of subtasks for the task.
 * @param {number} subtasksDone - The number of completed subtasks.
 * @param {number} subtaskDonePercentage - The percentage of subtasks completed.
 * @returns {string} The HTML string for the task card template.
 */
function taskCardTemplate(taskIndex, filteredLokalTasksArray, taskCardAllInitialsTemplate, subtasksArrayLength, subtasksDone, subtaskDonePercentage) {
  return /*html*/ `
  <div class="taskCard" draggable="true" 
  ondragstart="startDragging('${filteredLokalTasksArray[taskIndex].ID}')" 
  onclick="openBoardTaskPopup('${filteredLokalTasksArray[taskIndex].ID}', event)" 
  id="taskCard${filteredLokalTasksArray[taskIndex].ID}" 
  ontouchstart="startHold(event, '${filteredLokalTasksArray[taskIndex].ID}')" 
  ontouchmove="checkScroll(event)" 
  ontouchend="clearHold()"
  style="touch-action: manipulation; user-select: none; -webkit-touch-callout: none; -webkit-user-select: none;">
 
 <div class="taskCartdCategoryWrapper">
     <div class="taskCardCategory" style="background-color: ${filteredLokalTasksArray[taskIndex].taskCategory.color};">
         <p>${filteredLokalTasksArray[taskIndex].taskCategory.category}</p>
     </div>
     <div class="taskCardHold">
         <img src="../images/icons/fingerprint.png"/>
         <p>Hold to <br> move </p>
     </div>
 </div>

 <div>
     <p class="taskCardTitle">${filteredLokalTasksArray[taskIndex].taskTitle}</p>
     <p class="taskCardDescription">${filteredLokalTasksArray[taskIndex].taskDescription}</p>
     <div class="taskCardSubtasksContainer">
         <div class="taskCardSubtaskBarWrapper">
             <div class="taskCardSubtaskBar" id="taskCardSubtaskBar${[taskIndex]}" style="width: ${subtaskDonePercentage}%"></div>
         </div>
         <p>${subtasksDone}/${subtasksArrayLength} Subtasks</p>
     </div>
     <div class="taskCardBottomContainer">
         <div class="taskCardUserContainer">
             ${taskCardAllInitialsTemplate}
         </div>
         ${filteredLokalTasksArray[taskIndex].taskPrio ? `<img src="../images/icons/${filteredLokalTasksArray[taskIndex].taskPrio}.png" alt="" />` : ""}
     </div>
 </div>
</div>
      `;
}

/**
 * Generates the HTML template for moving a task to another category.
 * 
 * @param {string} taskID - The ID of the task to move.
 * @returns {string} The HTML string for the task move-to template.
 */
function taskCardMoveToTemplate(taskID) {
  return /*html*/ `
  <div class="moveToTopSection">
      <div class="taskCardMovetoLabel">
        <p>Move task to...</p>
      </div>
      <img onclick="renderTaskCards(); event.stopPropagation()" class="moveToBackImage" src="../images/icons/arrow-left-line.png" />
      </div>
      <p class="taskCardTitle">${allUnsortedTasks[taskID].taskTitle}</p>
      <div class="moveToWrapper">
        <div class="taskCardMoveToLinkContainer" onclick="handleMoveToClick('to do', '${taskID}'); event.stopPropagation();">
          <img src="../images/icons/arrow-curve-left-right.png" />
          <p>To do</p>
        </div>
        <div class="taskCardMoveToLinkContainer" onclick="handleMoveToClick('in progress', '${taskID}'); event.stopPropagation();">
          <img src="../images/icons/arrow-curve-left-right.png" />
          <p>In progress</p>
        </div>
        <div class="taskCardMoveToLinkContainer" onclick="handleMoveToClick('await feedback', '${taskID}'); event.stopPropagation();">
          <img src="../images/icons/arrow-curve-left-right.png" />
          <p>Await feedback</p>
        </div>
        <div class="taskCardMoveToLinkContainer" onclick="handleMoveToClick('done', '${taskID}'); event.stopPropagation();">
          <img src="../images/icons/arrow-curve-left-right.png" />
          <p>Done</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML template for a task card with a single user's initials.
 * 
 * @param {string} currentUserID - The ID of the current user.
 * @returns {string} The HTML string for the user's initials on the task card.
 */
function taskCardSingleInitialsTemplate(currentUserID) {
  return `
                <div class="taskCardUser" style="background-color: ${unsortedUsers[currentUserID].color};">
                  <p style="color: ${unsortedUsers[currentUserID].fontColor};">
                  ${unsortedUsers[currentUserID].initials}
                  </p>
                </div>
  `;
}

/**
 * Generates the HTML template for displaying additional task card users when there are more than one.
 * 
 * @param {number} plusNumber - The number of additional users.
 * @returns {string} The HTML string for the plus number on the task card.
 */
function taskCardSingleInitialsPlusTemplate(plusNumber) {
  return `
  
<div class="taskCardUser" style="background-color: white; border: solid lightgrey 1px; box-sizing: border-box; text-align: center;" >
    <p style="color: black">
        +${plusNumber}
    </p>
</div>
  
  `;
}

/**
 * Generates the HTML template for displaying a task popup with detailed information.
 * 
 * @param {string} taskID - The ID of the task to display in the popup.
 * @returns {string} The HTML string for the task popup template.
 */
function boardTaskPopupTemplate(taskID) {
  return /*html*/ `  
  <div class="boardTaskPopupContentWrapper" id="boardTaskPopupContentWrapper">
    <div class="boardTaskPopupContentTop">
      <div class="boardTaskPopupCategoryCard" style="background-color: ${allUnsortedTasks[taskID].taskCategory.color}" >
        <p class="boardTaskPopupCategoryLabel" id="boardTaskPopupCategoryLabel">${allUnsortedTasks[taskID].taskCategory.category}</p>
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
        <p class="boardTaskPopupContentPrioValue" id="boardTaskPopupContentPrioValue">${allUnsortedTasks[taskID].taskPrio ? allUnsortedTasks[taskID].taskPrio : "none"}</p>
          ${allUnsortedTasks[taskID].taskPrio ? `<img class="boardTaskPopupContentPrioIcon" id="boardTaskPopupContentPrioIcon" src="../images/icons/${allUnsortedTasks[taskID].taskPrio}.png" alt="medium prio" />` : ""}
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
      <div id="boardTaskPopupContentDeleteContainer" onclick="deleteTask('${taskID}')" class="boardTaskPopupContentDeleteContainer">
        <img class="boardTaskPopupDeleteIcon" src="../images/icons/trashcan_black.png" alt="delete" />
        <p>Delete</p>
      </div>
      <div class="boardTaskPopupContentBottomLine"></div>
      <div onclick="renderTaskFormEdit('${taskID}'), fillTaskFormEdit('${taskID}')" class="boardTaskPopupContentEditContainer">
        <img class="boardTaskPopupEditIcon" src="../images/icons/edit.png" alt="edit" />
        <p>Edit</p>
      </div>
    </div>
  </div>
`;
}

/**
 * Generates an empty task popup template (for when no task is selected).
 * 
 * @returns {string} The HTML string for the empty task popup template.
 */
function boardTaskPopupTemplateEmpty() {
  return /*html*/ `  
  <div class="boardTaskPopupContentWrapper" id="boardTaskPopupContentWrapper">
</div>
`;
}

/**
 * Generates the HTML template for displaying a user's details in a task popup.
 * 
 * @param {string} currentUserId - The ID of the current user.
 * @returns {string} The HTML string for the user's details in the popup.
 */
function popupUserTemplate(currentUserId) {
  return /*html*/ `
        <div class="boardTaskPopupContentAssignedToUserContainer">
          <div class="boardTaskPopupContentAssignedToUserCircle" style="background-color: ${unsortedUsers[currentUserId].color}">
            <p class="boardTaskPopupContentAssignedToUserInitials" style="color: ${unsortedUsers[currentUserId].fontColor};" >${unsortedUsers[currentUserId].initials}</p>
          </div>
          <p class="boardTaskPopupContentAssignedToUserLabel">${unsortedUsers[currentUserId].name}</p>
        </div>
  `;
}

/**
 * Generates the HTML template for a subtask in the task popup.
 * 
 * @param {number} subtasksIndex - The index of the subtask in the task's subtasks array.
 * @param {string} taskID - The ID of the task that the subtask belongs to.
 * @returns {string} The HTML string for the subtask in the task popup.
 */
function popupSubtaskTemplate(subtasksIndex, taskID) {
  return /*html*/ `
        <div class="boardTaskPopupContentSubtask" onclick="toggleSubtaskStatus(${subtasksIndex},'${taskID}')">
          <img class="boardTaskPopupContentSubtaskIcon" id="boardTaskPopupContentSubtaskIcon${subtasksIndex}" src="../images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">${allUnsortedTasks[taskID].taskSubtasks[subtasksIndex].subtaskName}</p>
        </div>
  `;
}
