function nameListTemplate(i, sortedUsers) {
  return /*html*/ `
    <div id="userContainerInsideUserDropdown${i}" onclick="addUserToTaskToggleCss('${i}', '${sortedUsers[i].id}'), clearUserInputInsideTaskFrom(), userFilterFunction()" class="userDropdownUserContainer userDropdownUserContainerBackground">
      <div class="taskFormUserInitials" style="background-color: ${sortedUsers[i].color};">${sortedUsers[i].initials}</div>
      <div class="taskFormUserNameAndInitials">
        <div>${sortedUsers[i].name}</div>
      </div>
      <img id="noCheck${i}" class="img24px" src="../images/icons/unchecked.png" alt="">
      <img id="check${i}" class="img24px displayNone" src="../images/icons/check_solved_white.png" alt="">
    </div>
  `;
}

function iconTemplate(i, sortedUsers) {
  return /*html*/ `<div id=taskFormUserIcon${i} class="taskFormUserInitials displayNone" style="background-color: ${sortedUsers[i].color};">${sortedUsers[i].initials}</div>`;
}

function categoryTemplate(chosenCategory) {
  return /*html*/ `
      <div class="fontInboxAlign">${chosenCategory}</div>
    `;
}

function subtaskTemplate(i) {
  return /*html*/ `
    <li id="subtaskSingleListContent(${i})" class="taskFormSubtaskListBox">
      <div id="addTasksSubtask(${i})" class="taskFormSubtaskListSingle">

        <div id="taskFormSubtaskTitle(${i})" ondblclick="openRewriteInput(${i})">${subtasks[i]}</div>
        <input id="taskFormSubtaskRewriteInput(${i})" type="text" class="subtaskRewriteInput displayNone">

        <div id="subtaskIconBox(${i})" class="subtaskIconBox">
          <img onclick="openRewriteInput(${i})" class="img24px" src="../images/icons/pencil_black.png">
          <div class="taskFormSubtaskDividingLine"></div>
          <img onclick="deleteSubtaskFromList(${i}), renderSubtasksToList()" class="img24px" src="../images/icons/trashcan_black.png">
        </div>

        <div id="subtaskRewriteIconBox(${i})" class="subtaskRewriteIconBox displayNone">
          <img onclick="toggleButtonsInsideSubtask(${i}), toggleRewriteInputInsideSubtask(${i}), renderSubtasksToList()" class="img24px"  src="../images/icons/x_black_subtask.png">
          <div class="taskFormSubtaskDividingLine"></div>
          <img onclick="pushRewrittenSubtask(${i}), toggleButtonsInsideSubtask(${i}), toggleRewriteInputInsideSubtask(${i}), renderSubtasksToList()" class="img24px" src="../images/icons/check_black.png">
        </div>

      </div>
    </li>
    `;
}
