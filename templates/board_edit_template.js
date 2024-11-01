function renderAddTaskToEditPopupTemplate(numberedTaskID) {
  return /*html*/ ` <div id="boardEditPopUpTaskSection" class="addTaskSection">

  <form class="addTaskForm" action="">
    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Title</div>
      <input id="editPopupTitleInput" class="addTaskInputTitle" required type="text" placeholder="Enter a Title" value="${convertedTasks[numberedTaskID].taskTitle}" />
    </div>

    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Description</div>
      <textarea id="editPopupDescriptionInput" class="addTaskInputDescription" type="text" placeholder="Enter a Description">${convertedTasks[numberedTaskID].taskDescription}</textarea>
    </div>

    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Assigned to</div>

      <div  id="boardEditPopupContactsDropdownLableBox" class="addTaskContactsDropdownLableBoxClosed">
        <div  id="boardEditPopupAssignContactsButton" class="addTaskAssignContactsButton">
          <div class="fontInboxAlign">Select contacts to assign</div>
          <img src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
        </div>
        <div id="boardEditPopUpDropDownSearchCloseButtonBox" class="dropDownSearchCloseButtonBox displayNone">
          <input id="boardEditPopupContactsSearchArea" onkeyup="boardEditPopUpFilterFunction()" onclick="stopPropagation(event)" class="userNameDropDownSearchbar" type="text" placeholder="Search.." />
          <img id="boardEditPopupAssignDropdownArrow" class="addTaskDropDownCloseButton" src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt="" />
        </div>
        <div onclick="stopPropagation(event)" id="boardEditPopUpUserNameDropDown" class="addTaskContactsDropdownLableBoxContent displayNone"></div>
      </div>

      <div class="addUserSymbolsAssign" id="addUserSymbolsAssign"></div>
    </div>

    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Due date</div>
      <input id="editPopupDateInput" class="addTaskDueDateDropdown" type="date" min="" value="${convertedTasks[numberedTaskID].taskDate}"/>
    </div>

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
      <div class="addTaskFormLabels">Category<span style="color: red">*</span></div>

      <div id="boardEditPopUpChooseCategoryDropdownLableBox" class="addTaskChooseCategoryDropdownLableBoxClosed">
        <div id="boardEditPopupChooseCategoryButton" class="addTaskChooseCategoryButton">
          <div class="fontInboxAlign">Select task category</div>
          <img id="boardEditPopUpChooseCategoryDropdownImageDown" src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
          <img id="boardEditPopUpChooseCategoryDropdownImageUp" class="displayNone" src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt="" />
        </div>
        <div id="boardEditCategoryDropDown" class="addTaskChooseCategoryDropdownLableBoxContent displayNone"></div>
      </div>
    </div>

    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Subtasks</div>

      <div id="boardEditPopUpaddSubtask" onclick="boardEditPopUpOpenAddSubtask()" class="addTaskSubtaskDropdownBox">
        <input class="addTaskSubtaskInputCover fontInboxAlign" type="text" placeholder="Add new subtask" />
        <img id="addTaskSubtaskShowHidePlus" class="addTaskSubtaskPlusImage img24px" src="images/mobile/addTaskMobile/plusDark.png" alt="" />
      </div>

      <div onkeydown="checkEnterKeyTrigger(event)" id="boardEditPopUpAddSubtaskInputBox" class="addTaskSubtaskInputBox displayNone">
        <div class="addTaskSubtaskInput">
          <input id="boardEditPopUpAddSubtaskInput" class="addTaskSubtaskInputField" />
        </div>

        <div class="addTaskSubtaskCheckXBox">
          <img onclick="boardEditPopUpAddSubtaskCancel()" class="addTaskSubtaskX img24px" src="images/mobile/addTaskMobile/xBlack.png" alt="" />
          <img onclick="boardEditPopUpAddSubtask()" tabindex="0" class="addTaskSubtaskCheck img24px" src="images/mobile/addTaskMobile/checkBlack.png" alt="" />
        </div>
      </div>

      <ul class="addTaskSubTaskList" id="boardEditPopUpSubtaskBoard">
     
      </ul>
    </div>

    <div class="addTaskButton">

      <div onclick="updateTaskData(currentNumberedID)" class="createTaskButton">
        <div>Ok</div>
        <img class="addTaskButtonCheckImage" src="images/mobile/addTaskMobile/checkWhite.png" alt="" />
      </div>
    </div>
  </form>
</div>`;
}

function nameListTemplate(i, sortedUsers, currentColor, blackWhite, allUserInitials, userUniqueId, numberedTaskID) {
  return /*html*/ `
    <div id="boardEditPopupAssignUserId${i}" onclick="toggleUserInsideEditPopup('${sortedUsers[i].name}', ${i}, '${sortedUsers[i].id}', ${numberedTaskID})" class="addTaskDropDownSingleUserContainer">
      <div class="addTaskAllUserInitials" style="background-color: ${currentColor}; color: ${blackWhite};">${allUserInitials[i]}</div>
      <div class="addTaskAddUserNameAndInitials">
        <div>${sortedUsers[i].name}</div>
      </div>
      <img id="noCheck${i}" src="images/mobile/addTaskMobile/checkButtonMobile.png" alt="">
      <img id="check${i}" class="addTaskButtonCheckImage displayNone" src="images/mobile/addTaskMobile/checkButtonMobileSolvedWhite.png" alt="">
    </div>
    `;
}

function addUserSymbolTemplate(i) {
  return /*html*/ `
    <div>
     <div class="addTaskAllUserInitials" style="background-color: ${addTaskAssignedUserColors[i]}; color: ${addTaskAssignedUserFontColors[i]};">${taskAssignedUserInitials[i]}</div>
    </div>
    `;
}

function addUserSymbolTemplateEditPopup(i, numberedTaskID) {
  return /*html*/ `
    <div>
     <div class="addTaskAllUserInitials" style="background-color: ${convertedTasks[numberedTaskID].taskAssignedUserColors[i]}; color: ${convertedTasks[numberedTaskID].taskAssignedUserFontColors[i]};">${convertedTasks[numberedTaskID].taskAssignedUserInitials[i]}</div>
    </div>
    `;
}

function boardEditTaskCategoryTemplate(chosenCategory) {
  return /*html*/ `
      <div class="fontInboxAlign">${chosenCategory}</div>
      <img id="boardEditPopUpChooseCategoryDropdownImageDown" class="displayNone" src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
      <img id="boardEditPopUpChooseCategoryDropdownImageUp"  src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt=""/>
    `;
}

function subtaskTemplate(i) {
  return /*html*/ `
    <li class="addTaskSingleListSubtask">
      <div id="boardEditPopUpSubtaskRewriteInputBox${[i]}" class="addTaskRewriteSubtaskFlex displayNone">
        <input id="boardEditPopUpSubtaskRewriteInput${i}" onclick="boardEditPopUpReadIdFromSubtask(this.id)" class="taskBoardRewriteSubtaskInput" type="text">
        <div class="addTaskSubtaskIconBox">
          <img onclick="boardEditPopUpCancelRewritingSubtask(${i})" id="boardEditPopUpCancelRewritingSubtask${i}" class="img24px" src="images/mobile/addTaskMobile/trashcanBlack.png" alt="">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="boardEditPopUpAcceptRewriting(${i})" id="boardEditPopUpAcceptRewritingSubtask${i}" class="img24px" src="images/mobile/addTaskMobile/checkBlack.png" alt="">
        </div>
      </div>
      <div id="boardEditPopUpSubtask${[i]}" class="addTaskDisplayFlexer">
        <div>${subtasks[i].subtask}</div>
        <div class="addTaskSubtaskIconBox">
          <img onclick="boardEditPopUpRewriteSubtask(${i})" class="img24px" src="images/mobile/addTaskMobile/pencilBlack.png">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="boardEditPopUpDeleteSubtaskFromBoard(${i})" class="img24px" src="images/mobile/addTaskMobile/trashcanBlack.png">
        </div>
      </div>
    </li>
    `;
}
