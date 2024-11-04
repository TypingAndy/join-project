function renderAddTaskToEditPopupTemplate(numberedTaskID) {
  return /*html*/ ` <div id="boardEditPopupTaskSection" class="addTaskSection">

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
          <img class="img24px" src="../images/icons/arrow_drop_down_down.png" alt="" />
        </div>
        <div id="boardEditPopupDropDownSearchCloseButtonBox" class="dropDownSearchCloseButtonBox displayNone">
          <input id="boardEditPopupContactsSearchArea" onkeyup="boardEditPopupFilterFunction()" onclick="stopPropagation(event)" class="userNameDropDownSearchbar" type="text" placeholder="Search.." />
          <img id="boardEditPopupAssignDropdownArrow" class="addTaskDropDownCloseButton img24px" src="../images/icons/arrow_drop_down_up.png" alt="" />
        </div>
        <div onclick="stopPropagation(event)" id="boardEditPopupUserNameDropDown" class="addTaskContactsDropdownLableBoxContent displayNone"></div>
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
          <img class="addTaskPrioButtonImage" src="../images/icons/urgend_white_background.svg" alt="" />
        </div>
        <div onclick="setTaskPrio('medium')" class="addTaskPrioButtonMedium">
          <div>Medium</div>
          <img class="addTaskPrioButtonImage" src="../images/icons/medium_white_background.svg" alt="" />
        </div>
        <div onclick="setTaskPrio('low')" class="addTaskPrioButtonLow">
          <div>Low</div>
          <img class="addTaskPrioButtonImage" src="../images/icons/low_white_background.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Category<span style="color: red">*</span></div>

      <div id="boardEditPopupChooseCategoryDropdownLableBox" class="addTaskChooseCategoryDropdownLableBoxClosed">
        <div id="boardEditPopupChooseCategoryButton" class="addTaskChooseCategoryButton">
          <div class="fontInboxAlign">Select task category</div>
          <img id="boardEditPopupChooseCategoryDropdownImageDown" class="img24px" src="../images/icons/arrow_drop_down_down.png" alt="" />
          <img id="boardEditPopupChooseCategoryDropdownImageUp" class="displayNone img24px" src="../images/icons/arrow_drop_down_up.png" alt="" />
        </div>
        <div id="boardEditCategoryDropDown" class="addTaskChooseCategoryDropdownLableBoxContent displayNone"></div>
      </div>
    </div>

    <div class="addTaskSectionHeaderInputGap">
      <div class="addTaskFormLabels">Subtasks</div>

      <div id="boardEditPopupaddSubtask" onclick="boardEditPopupOpenAddSubtask()" class="addTaskSubtaskDropdownBox">
        <input class="addTaskSubtaskInputCover fontInboxAlign" type="text" placeholder="Add new subtask" />
        <img id="addTaskSubtaskShowHidePlus" class="addTaskSubtaskPlusImage img24px" src="../images/icons/plus_dark.png" alt="" />
      </div>

      <div id="boardEditPopupAddSubtaskInputBox" class="addTaskSubtaskInputBox displayNone">
        <div class="addTaskSubtaskInput">
          <input id="boardEditPopupAddSubtaskInput" class="addTaskSubtaskInputField" />
        </div>

        <div class="addTaskSubtaskCheckXBox">
          <img onclick="boardEditPopupAddSubtaskCancel()" class="addTaskSubtaskX img24px" src="../images/icons/x_black_subtask.png" alt="" />
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="boardEditPopupAddSubtask()" tabindex="0" class="addTaskSubtaskCheck img24px" src="../images/icons/check_black.png" alt="" />
        </div>
      </div>

      <ul class="addTaskSubTaskList" id="boardEditPopupSubtaskBoard">
     
      </ul>
    </div>

    <div class="addTaskButton">

      <div onclick="updateTaskData(currentNumberedID), loadAllTasks(), closeBoardTaskPopup()" class="createTaskButton">
        <div>Ok</div>
        <img class="addTaskButtonCheckImage" src="../images/icons/check_white.png" alt="" />
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
      <img id="noCheck${i}" src="../images/icons/checkButtonMobile.png" alt="">
      <img id="check${i}" class="addTaskButtonCheckImage displayNone" src="../images/icons/check_white.png" alt="">
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
      <img id="boardEditPopupChooseCategoryDropdownImageDown" class="displayNone img24px" src="../images/icons/arrow_drop_down_down.png" alt="" />
      <img id="boardEditPopupChooseCategoryDropdownImageUp" class="img24px"  src="../images/icons/arrow_drop_down_up.png" alt=""/>
    `;
}

function subtaskTemplate(i) {
  return /*html*/ `
    <li class="addTaskSingleListSubtask">
      <div id="boardEditPopupSubtaskRewriteInputBox${[i]}" class="addTaskRewriteSubtaskFlex displayNone">
        <input id="boardEditPopupSubtaskRewriteInput${i}" onclick="boardEditPopupReadIdFromSubtask(this.id)" class="taskBoardRewriteSubtaskInput" type="text">
        <div class="addTaskSubtaskIconBox">
          <img onclick="boardEditPopupCancelRewritingSubtask(${i})" id="boardEditPopupCancelRewritingSubtask${i}" class="img24px" src="../images/icons/trashcan_black.png" alt="">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="boardEditPopupAcceptRewriting(${i})" id="boardEditPopupAcceptRewritingSubtask${i}" class="img24px" src="../images/icons/check_black.png" alt="">
        </div>
      </div>
      <div id="boardEditPopupSubtask${[i]}" class="addTaskDisplayFlexer">
        <div>${subtasks[i].subtask}</div>
        <div class="addTaskSubtaskIconBox">
          <img onclick="boardEditPopupRewriteSubtask(${i})" class="img24px" src="../images/icons/pencil_black.png">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="boardEditPopupDeleteSubtaskFromBoard(${i})" class="img24px" src="../images/icons/trashcan_black.png">
        </div>
      </div>
    </li>
    `;
}
