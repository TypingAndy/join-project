function taskFormTemplate(taskStatus, titleAcceptTaskButton, id, fetchStatus, postOrPatchFunction) {
  return /*html*/ `
    <div class="taskFormWrapper">

    <div class="taskFormHeaderBox">
          <div class="taskFormHeader">Add Task</div>
        </div>


      <div class="taskFormMidSection">


      <div class="addTaskLeftSection">
        <!-- Title Section -->
        <div class="taskFormSectionBox">
          <div class="taskFormLabels">Title<span style="color: red">*</span></div>
          <div class="taskFormInputContainer">
            <input 
              onkeyup="validateTaskForm(), validateTaskTitleInput()" 
              onchange="validateTaskForm()" 
              onblur=" validateTaskTitleInput()"
              id="taskTitleInput" 
              class="taskFormInput" 
              type="text" 
              placeholder="Enter a Title" 
                     />
          </div>
          <div id="requiredTitleInfo" class="requiredInfo displayNone">This field is required</div>
        </div>
        

     
          <!-- Description Section -->
          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Description</div>
            <div class="taskFormTextAreaContainer">
              <textarea 
                id="taskDescriptionInput" 
                class="taskFormDescriptionTextArea" 
                type="text" 
                placeholder="Enter a Description"
              ></textarea>
            </div>
          </div>
          
          <!-- Assigned to Section -->
          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Assigned to</div>
            <div class="taskFormInputContainer">
              <input
                id="taskFormUserInput"
                onfocus="openUserDropdown()"
                onblur="closeUserDropdown()"
                onkeyup="userFilterFunction()"
                placeholder="Select contacts to assign"
                class="taskFormDropdownInput"
                autocomplete="off"
              />
              <img
                id="taskFormUserDropdownArrow"
                onblur="switchArrowInsideDropdown(false, 'taskFormUserDropdownArrow', 'userDropdown')"
                class="taskFormUserDropdownArrow img24px"
                src="../images/icons/arrow_drop_down_down.png"
                alt=""
              />
            </div>
            <div class="taskFormDropdownBox">
              <div id="userDropdown" class="taskFormDropdownContent"></div>
            </div>
            <div class="userIconsBoxWithPlus">
              <div id="taskFormUserIcon" class="userIconsBox"></div>
              <div id="plusUserIcons" class="plusUserIcons displayNone">+</div>
              <div id="numberUserIcons" class="numberUserIcons"></div>
            </div>
          </div>
        </div>

        <div class="addTaskSectionDividingLine"></div>

        <!-- Right Section (Due Date, Prio, Category) -->
        <div class="addTaskRightSection">
          <!-- Due Date Section -->
          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Due date<span style="color: red">*</span></div>
            <div class="taskFormInputContainer">
              <input 
                id="dateInput" 
                onclick="insertMinSelectableDate()" 
                onchange="validateTaskForm(), validateTaskDateInput()" 
                onblur= "validateTaskDateInput()"
                class="taskFormInput datePlaceholder" 
                type="date" 
                min="" 
                />
            </div>
            <div id="requiredDateInfo" class="requiredInfo displayNone">This field is required</div>
          </div>

          <!-- Priority Section -->
          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Prio</div>
            <div class="taskFormPrioButtonBox">
              <div onclick="setTaskPrio('urgent')" class="taskFormPrioButtonUrgent">
                <div>Urgent</div>
                <img class="taskFormPrioButtonImage" src="../images/icons/urgend_white_background.svg" alt="" />
              </div>
              <div onclick="setTaskPrio('medium')" class="taskFormPrioButtonMedium">
                <div>Medium</div>
                <img class="taskFormPrioButtonImage" src="../images/icons/medium_white_background.svg" alt="" />
              </div>
              <div onclick="setTaskPrio('low')" class="taskFormPrioButtonLow">
                <div>Low</div>
                <img class="taskFormPrioButtonImage" src="../images/icons/low_white_background.svg" alt="" />
              </div>
            </div>
          </div>

          <!-- Category Section -->
          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Category<span style="color: red">*</span></div>
            <div class="taskFormInputContainer">
              <input
                id="taskFormCategoryInput"
                onfocus="openCategoryDropdown()"
                onblur="closeCategoryDropdown(), validateTaskCategoryInput()"
                onkeyup="categoryFilterFunction(), validateTaskCategoryInput()"
          
        
                placeholder="Select task category"
                class="taskFormDropdownInput"
                autocomplete="off"
              
              />
              <img 
                id="taskFormCategoryDropdownArrrow" 
                class="taskFormUserDropdownArrow img24px" 
                src="../images/icons/arrow_drop_down_down.png" 
                alt="" 
              />
            </div>
            <div class="taskFormDropdownBox">
              <div 
                id="categoryDropdown" 
                onclick="switchArrowInsideDropdown(false, 'taskFormUserDropdownArrow', 'userDropdown')" 
                class="taskFormDropdownContent"
              ></div>
            </div>
            <div id="requiredCategoryInfo" class="requiredInfo displayNone">This field is required</div>
          </div>
          
          <!-- Subtasks Section -->
          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Subtasks</div>
            <div id="addSubtask" class="taskFormInputContainer">
              <input 
                id="taskFormSubtaskInput" 
                onfocus="toggleSubtaskCheckOnFocus(true)" 
                onblur="toggleSubtaskCheckOnFocus(false), clearSubtaskInput()" 
                class="taskFormSubtaskInput" 
                type="text" 
                placeholder="Add new subtask" 
              />
              <div class="iconWrapper">
                <img 
                  id="plusIcon" 
                  onclick="focusSubtaskInput()" 
                  class="taskFormSubtaskPlusImage" 
                  src="../images/icons/plus_dark.png" 
                  alt="" 
                />
                <img 
                  id="cancelIcon" 
                  class="taskFormSubtaskPlusImage" 
                  src="../images/icons/x_black_subtask.png" 
                  alt="" 
                  style="display: none" 
                />
                <div 
                  id="dividingLine" 
                  class="subtaskDividingLine" 
                  style="display: none"
                ></div>
                <img 
                  id="checkIcon" 
                  onmousedown="addSubtaskToList(), renderSubtasksToList()" 
                  class="taskFormSubtaskPlusImage" 
                  src="../images/icons/check_black.png" 
                  alt="" 
                  style="display: none" 
                />
              </div>
            </div>
            <ul class="taskFormSubtaskList" id="taskFormSubtaskList"></ul>
          </div>
        </div>
      </div>

      <!-- Create Task Button Section -->
      <div class="taskFormCreateTaskButtonBox">
        <div class="taskFormRequiredInfo"><span style="color: red">*</span>This field is required</div>

        <div class="addTaskButtonBox">

          <div class="addTaskClearButton">
            <div>Clear</div>
            <div class="createTaskButtonClearImage"></div>
          </div>

          <div 
            id="createTaskButton" 
            class="createTaskButton disabled" 
            onclick="${postOrPatchFunction}('${taskStatus}', '${id}', '${fetchStatus}'), createTaskAllNeededFunctions()" 
            type="submit"
          >
            <div>${titleAcceptTaskButton}</div>
            <img class="createTaskButtonCheckImage" src="../images/icons/check_white.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
}

function nameListTemplate(userFirebaseId) {
  return /*html*/ `
    <div id="userContainerInsideUserDropdown(${userFirebaseId})" onclick="toggleUserInTaskForm('${userFirebaseId}')" class="userDropdownUserContainer userDropdownUserContainerBackground">
      <div class="taskFormUserInitials" style="background-color: ${unsortedUsers[userFirebaseId].color};">${unsortedUsers[userFirebaseId].initials}</div>
      <div class="taskFormUserNameAndInitials">
        <div>${unsortedUsers[userFirebaseId].name}</div>
      </div>
      <img id="noCheck${userFirebaseId}" class="img24px" src="../images/icons/unchecked.png" alt="">
      <img id="check${userFirebaseId}" class="img24px displayNone" src="../images/icons/check_solved_white.png" alt="">
    </div>
  `;
}

function iconTemplate(userFirebaseId) {
  return /*html*/ `<div id=taskFormUserIcon${userFirebaseId} class="taskFormUserInitials" style="background-color: ${unsortedUsers[userFirebaseId].color};">${unsortedUsers[userFirebaseId].initials}</div>`;
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

        <div id="taskFormSubtaskTitle(${i})" ondblclick="openRewriteInput(${i})">${subtasks[i].subtaskName}</div>
        <input id="taskFormSubtaskRewriteInput(${i})" onblur="renderSubtasksToList()" type="text" class="subtaskRewriteInput displayNone">

        <div id="subtaskIconBox(${i})" class="subtaskIconBox">
          <img onclick="openRewriteInput(${i})" class="img24px" src="../images/icons/pencil_black.png">
          <div class="taskFormSubtaskDividingLine"></div>
          <img onclick="deleteSubtaskFromList(${i}), renderSubtasksToList()" class="img24px" src="../images/icons/trashcan_black.png">
        </div>

        <div id="subtaskRewriteIconBox(${i})" class="subtaskRewriteIconBox displayNone">
          <img onclick="toggleButtonsInsideSubtask(${i}), toggleRewriteInputInsideSubtask(${i}), renderSubtasksToList()" class="img24px"  src="../images/icons/x_black_subtask.png">
          <div class="taskFormSubtaskDividingLine"></div>
          <img onmousedown="pushRewrittenSubtask(${i}), toggleButtonsInsideSubtask(${i}), toggleRewriteInputInsideSubtask(${i}), renderSubtasksToList()" class="img24px" src="../images/icons/check_black.png">
        </div>

      </div>
    </li>
    `;
}
