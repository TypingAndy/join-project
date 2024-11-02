function nameListTemplate(i, sortedUsers, currentColor, blackWhite, allUserInitials) {
  return /*html*/ `
    <div id="addTaskAssignUserId${i}" onclick="addUserToTaskToggle('${sortedUsers[i].name}', ${i}, '${sortedUsers[i].id}')" class="addTaskDropDownSingleUserContainer">
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

function categoryTemplate(chosenCategory) {
  return /*html*/ `
      <div class="fontInboxAlign">${chosenCategory}</div>
      <img id="addTaskChooseCategoryDropdownImageDown" class="displayNone" src="images/mobile/addTaskMobile/arrowDropDownDown.png" alt="" />
      <img id="addTaskChooseCategoryDropdownImageUp"  src="images/mobile/addTaskMobile/arrowDropDownUp.png" alt=""/>
    `;
}

function subtaskTemplate(i) {
  return /*html*/ `
    <li class="addTaskSingleListSubtask">
      <div id="addTaskSubtaskRewriteInputBox${[i]}" class="addTaskRewriteSubtaskFlex displayNone">
        <input id="addTaskSubtaskRewriteInput${i}" onclick="readIdFromSubtask(this.id)" class="taskBoardRewriteSubtaskInput" type="text">
        <div class="addTaskSubtaskIconBox">
          <img onclick="addTaskCancelRewritingSubtask(${i})" id="addTaskCancelRewritingSubtask${i}" class="img24px" src="images/mobile/addTaskMobile/trashcanBlack.png" alt="">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="addTaskAcceptRewriting(${i})" id="addTaskAcceptRewritingSubtask${i}" class="img24px" src="images/mobile/addTaskMobile/checkBlack.png" alt="">
        </div>
      </div>
      <div id="addTasksSubtask${[i]}" class="addTaskDisplayFlexer">
        <div>${subtasks[i].subtask}</div>
        <div class="addTaskSubtaskIconBox">
          <img onclick="addTaskWriteSubtaskBoard(), addTaskRewriteSubtask(${i})" class="img24px" src="images/mobile/addTaskMobile/pencilBlack.png">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="addTaskDeleteSubtaskFromBoard(${i}),  addTaskWriteSubtaskBoard()" class="img24px" src="images/mobile/addTaskMobile/trashcanBlack.png">
        </div>
      </div>
    </li>
    `;
}
