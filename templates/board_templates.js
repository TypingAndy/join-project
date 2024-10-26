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
                <div class="taskCard" draggable="true" ondragstart="startDragging('${toDoTasks[i].numberedID}')" onclick="openBoardTaskPopup(${i}, '${toDoTasks[i].ID}', '${toDoTasks[i].numberedID}')">
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
                <div class="taskCard" draggable="true" ondragstart="startDragging('${inProgressTasks[i].numberedID}')" onclick="openBoardTaskPopup(${i}, '${inProgressTasks[i].ID}', '${inProgressTasks[i].numberedID}')">
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
                <div class="taskCard" draggable="true" ondragstart="startDragging('${awaitFeedbackTasks[i].numberedID}')" onclick="openBoardTaskPopup(${i}, '${awaitFeedbackTasks[i].ID}', '${awaitFeedbackTasks[i].numberedID}')">
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
                <div class="taskCard" draggable="true" ondragstart="startDragging('${doneTasks[i].numberedID}')" onclick="openBoardTaskPopup(${i}, '${doneTasks[i].ID}', '${doneTasks[i].numberedID}')">
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

function boardTaskPopupTemplate(i, taskID, numberedID) {
  return `  
  <div class="boardTaskPopupContentWrapper" id="boardTaskPopupContentWrapper">
  <div class="boardTaskPopupContentTop">
    <div class="boardTaskPopupCategoryCard">
      <p class="boardTaskPopupCategoryLabel" id="boardTaskPopupCategoryLabel">${convertedTasks[i].taskCategory}</p>
    </div>
    <img class="boardTaskPopupContentClose" src="./images/icons/close.png" alt="close" onclick="closeBoardTaskPopup()" />
  </div>
  <div class="boardTaskPopupContentCenter">
    <p class="boardTaskPopupContentTitle" id="boardTaskPopupContentTitle">${convertedTasks[i].taskTitle}</p>
    <p class="boardTaskPopupContentDescription" id="boardTaskPopupContentDescription">Build start page with recipe.</p>
    <div class="boardTaskPopupContentDateWrapper">
      <p class="boardTaskPopupContentDateLabel">Due date:</p>
      <p class="boardTaskPopupContentDate" id="boardTaskPopupContentDate">${convertedTasks[i].taskDate}</p>
    </div>
    <div class="boardTaskPopupContentPrioWrapper">
      <p class="boardTaskPopupContentPrioLabel">Priority:</p>
      <div class="boardTaskPopupContentPrioOutputWrapper">
        <p class="boardTaskPopupContentPrioValue" id="boardTaskPopupContentPrioValue">${convertedTasks[i].taskPrio}</p>
        <img class="boardTaskPopupContentPrioIcon" id="boardTaskPopupContentPrioIcon" src="./images/icons/${convertedTasks[i].taskPrio}.png" alt="medium prio" />
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
    <div onclick="renderPupupEditTaskContent('${numberedID}')" class="boardTaskPopupContentEditContainer">
      <img class="boardTaskPopupEditIcon" src="./images/icons/edit.png" alt="edit" />
      <p>Edit</p>
    </div>
  </div>
</div>
`;
}

function popupUserTemplate(usersIndex, i) {
  return `
        <div class="boardTaskPopupContentAssignedToUserContainer">
          <div class="boardTaskPopupContentAssignedToUserCircle" style="background-color: ${convertedTasks[i].taskAssignedUserColors[usersIndex]};">
            <p class="boardTaskPopupContentAssignedToUserInitials">${convertedTasks[i].taskAssignedUserInitials[usersIndex]}</p>
          </div>
          <p class="boardTaskPopupContentAssignedToUserLabel">${convertedTasks[i].taskAssignedUser[usersIndex]}</p>
        </div>
  `;
}

function popupSubtaskTemplate(subtasksIndex, i) {
  return `
        <div class="boardTaskPopupContentSubtask" onclick="boardTaskPopupChangeSubtaskStatus(${subtasksIndex}, ${i}, '${convertedTasks[i].ID}')">
          <img class="boardTaskPopupContentSubtaskIcon" id="boardTaskPopupContentSubtaskIcon${subtasksIndex}" src="./images/icons/unchecked.png" alt="" />
          <p class="boardTaskPopupContentSubtaskTitle">${convertedTasks[i].taskSubtasks[subtasksIndex].subtask}</p>
        </div>
  `;
}

function popupEditTaskTemplate(numberedID) {
  return /*html*/ `
  <div class="boardTaskEditPopup" id="boardTaskEditPopup">
          <div class="addTaskSection">

            <form class="addTaskForm" action="">
              <div class="addTaskSectionHeaderInputGap">
                <div class="addTaskFormLabels">Title</div>
                <input id="taskTitleInput" class="addTaskInputTitle" required type="text" placeholder="Enter a Title" value="${convertedTasks[numberedID].taskTitle}"/>
              </div>
    
              <div class="addTaskSectionHeaderInputGap">
              <div class="addTaskFormLabels">Description</div>
              <textarea 
                  id="taskDescriptionInput" 
                  class="addTaskInputDescription" 
                  type="text" 
                  placeholder="Enter a Description"
              >${convertedTasks[numberedID].taskDescription}</textarea>
          </div>
    
              <div class="addTaskSectionHeaderInputGap">
                <div class="addTaskFormLabels">Assigned to</div>
    
                <div  id="addTaskContactsDropdownLableBox" class="addTaskContactsDropdownLableBoxClosed">
                  <div  id="addTaskAssignContactsButton" class="addTaskAssignContactsButton">
                    <div class="fontInboxAlign">Select contacts to assign</div>
                    <img src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
                  </div>
                  <div id="dropDownSearchCloseButtonBox" class="dropDownSearchCloseButtonBox displayNone">
                    <input id="addTaskContactsSearchArea" onkeyup="addTaskFilterFunction()" onclick="stopPropagation(event)" class="userNameDropDownSearchbar" type="text" placeholder="Search.." />
                    <img id="addTaskAssignDropdownArrow" class="addTaskDropDownCloseButton" src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt="" />
                  </div>
                  <div onclick="stopPropagation(event)" id="userNameDropDown" class="addTaskContactsDropdownLableBoxContent displayNone"></div>
                </div>
    
                <div class="addUserSymbolsAssign" id="addUserSymbolsAssign"></div>
              </div>
    
              <input 
              id="taskDateInput" 
              class="addTaskDueDateDropdown" 
              type="date" 
              min=""
              value="${convertedTasks[numberedID].taskDate}"
          />
    
              <div class="addTaskSectionHeaderInputGap">
                <div class="addTaskFormLabels">Prio</div>
                <div class="addTaskPrioButtonBox">
                  <div onclick="setTaskPrio('urgent')" class="addTaskPrioButtonUrgent">
                    <div>Urgent</div>
                    <img class="addTaskPrioButtonImage" src="images/mobile/addTaskMobile/prioUrgent.svg" alt="" />
                  </div>
                  <div onclick="setTaskPrio('medium')" class="addTaskPrioButtonMedium">
                    <div>Medium</div>
                    <img class="addTaskPrioButtonImage" src="images/mobile/addTaskMobile/prioMedium.svg" alt="" />
                  </div>
                  <div onclick="setTaskPrio('low')" class="addTaskPrioButtonLow">
                    <div>Low</div>
                    <img class="addTaskPrioButtonImage" src="images/mobile/addTaskMobile/prioLow.svg" alt="" />
                  </div>
                </div>
              </div>
    
              <div class="addTaskSectionHeaderInputGap">
                <div class="addTaskFormLabels">Category</div>
    
                <div id="addTaskChooseCategoryDropdownLableBox" class="addTaskChooseCategoryDropdownLableBoxClosed">
                  <div id="addTaskChooseCategoryButton" class="addTaskChooseCategoryButton">
                    <div class="fontInboxAlign">Select task category</div>
                    <img id="addTaskChooseCategoryDropdownImageDown" src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
                    <img id="addTaskChooseCategoryDropdownImageUp" class="displayNone" src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt="" />
                  </div>
                  <div id="categoryDropDown" class="addTaskChooseCategoryDropdownLableBoxContent displayNone"></div>
                </div>
              </div>
    
              <div class="addTaskSectionHeaderInputGap">
                <div class="addTaskFormLabels">Subtasks</div>
    
                <div id="addSubtask" onclick="addTaskOpenAddSubtask()" class="addTaskSubtaskDropdownBox">
                  <input class="addTaskSubtaskInputCover fontInboxAlign" type="text" placeholder="Add new subtask" />
                  <img id="addTaskSubtaskShowHidePlus" class="addTaskSubtaskPlusImage img24px" src="images/mobile/addTaskMobile/plusDark.png" alt="" />
                </div>
    
                <div onkeydown="checkEnterKeyTrigger(event)" id="addSubtaskInputBox" class="addTaskSubtaskInputBox displayNone">
                  <div class="addTaskSubtaskInput">
                    <input id="addSubtaskInput" class="addTaskSubtaskInputField" />
                  </div>
    
                  <div class="addTaskSubtaskCheckXBox">
                    <img onclick="addTaskAddSubtaskCancel()" class="addTaskSubtaskX img24px" src="images/mobile/addTaskMobile/xBlack.png" alt="" />
                    <img onclick="addTaskAddSubtask()" tabindex="0" class="addTaskSubtaskCheck img24px" src="images/mobile/addTaskMobile/checkBlack.png" alt="" />
                  </div>
                </div>
    
                <ul class="addTaskSubTaskList" id="subtaskBoard">
               
                </ul>
              </div>
    
              <div class="addTaskButton">
    
                <div class="createTaskButton">
                  <div>Ok</div>
                  <img class="addTaskButtonCheckImage" src="images/mobile/addTaskMobile/checkWhite.png" alt="" />
                </div>
              </div>
            </form>
          </div>
        </div>
  
  `;
}
