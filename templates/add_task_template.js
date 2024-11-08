function nameListTemplate(i, sortedUsers) {
  return /*html*/ `
    <div id="userContainerInsideUserDropdown${i}" onclick="addUserToTaskToggle('${i}', '${sortedUsers[i].id}')" class="userDropdownUserContainer userDropdownUserContainerBackground">
      <div class="taskFormUserInitials" style="background-color: ${sortedUsers[i].color};">${sortedUsers[i].initials}</div>
      <div class="taskFormUserNameAndInitials">
        <div>${sortedUsers[i].name}</div>
      </div>
      <img id="noCheck${i}" class="img24px" src="../images/icons/unchecked.png" alt="">
      <img id="check${i}" class="img24px displayNone" src="../images/icons/check_solved_white.png" alt="">
    </div>
  `;
}

function categoryTemplate(chosenCategory) {
  return /*html*/ `
      <div class="fontInboxAlign">${chosenCategory}</div>
    `;
}

function subtaskTemplate(i) {
  return /*html*/ `
    <!-- <li class="addTaskSingleListSubtask">
      <div id="addTaskSubtaskRewriteInputBox${[i]}" class="addTaskRewriteSubtaskFlex displayNone">
        <input id="addTaskSubtaskRewriteInput${i}" onclick="readIdFromSubtask(this.id)" class="taskBoardRewriteSubtaskInput" type="text">
        <div class="addTaskSubtaskIconBox">
          <img onclick="addTaskCancelRewritingSubtask(${i})" id="addTaskCancelRewritingSubtask${i}" class="img24px" src="../images/icons/trashcan_black.png" alt="">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="addTaskAcceptRewriting(${i})" id="addTaskAcceptRewritingSubtask${i}" class="img24px" src="../images/icons/check_black.png" alt="">
        </div>
      </div>
      <div id="addTasksSubtask${[i]}" class="addTaskDisplayFlexer">
        <div>${subtasks[i].subtask}</div>
        <div class="addTaskSubtaskIconBox">
          <img onclick="addTaskWriteSubtaskBoard(), addTaskRewriteSubtask(${i})" class="img24px" src="../images/icons/pencil_black.png">
          <div class="addTaskSubtaskDividingLine"></div>
          <img onclick="addTaskDeleteSubtaskFromBoard(${i}),  addTaskWriteSubtaskBoard()" class="img24px" src="../images/icons/trashcan_black.png">
        </div>
      </div>
    </li> -->
    `;
}
