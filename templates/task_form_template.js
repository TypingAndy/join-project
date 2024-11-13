function taskFormTemplate(taskStatus) {
  return /*html*/ `
    
         <!-- rednerTaskFormTemplate -->

            <div class="taskFormSectionBox">
              <div class="taskFormLabels">Title<span style="color: red">*</span></div>
              <div class="taskFormInputContainer">
                <input id="taskTitleInput" class="taskFormInput"  type="text" placeholder="Enter a Title" />
              </div>
            </div>

            <div class="taskFormSectionBox">
              <div class="taskFormLabels">Description</div>
              <div class="taskFormTextAreaContainer">
                <textarea id="taskDescriptionInput" class="taskFormDescriptionTextArea" type="text" placeholder="Enter a Description"></textarea>
              </div>
            </div>

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
              <div id="taskFormUserIcon" class="userIconsBox"></div>
            </div>

            <div class="taskFormSectionBox">
              <div class="taskFormLabels">Due date<span style="color: red">*</span></div>
              <div class="taskFormInputContainer">
                <input id="dateInput" onclick="insertMinSelectableDate()" class="taskFormInput"  type="date" min="" />
              </div>
            </div>

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

            <div class="taskFormSectionBox">
              <div class="taskFormLabels">Category<span style="color: red">*</span></div>

              <div class="taskFormInputContainer">
                <input
                  id="taskFormCategoryInput"
                  onfocus="openCategoryDropdown()"
                  onblur="closeCategoryDropdown()"
                  placeholder="Select task category"
                  class="taskFormDropdownInput"
                  
                />
                <img id="taskFormCategoryDropdownArrrow" class="taskFormUserDropdownArrow img24px" src="../images/icons/arrow_drop_down_down.png" alt="" />
              </div>
              <div class="taskFormDropdownBox">
                <div id="categoryDropdown" onclick="switchArrowInsideDropdown(false, 'taskFormUserDropdownArrow', 'userDropdown')" class="taskFormDropdownContent"></div>
              </div>
            </div>


            <div class="taskFormSectionBox">
              <div class="taskFormLabels">Subtasks</div>

              <div id="addSubtask" class="taskFormInputContainer">
                <input id="taskFormSubtaskInput" onfocus="toggleSubtaskCheckOnFocus(true)" onblur="toggleSubtaskCheckOnFocus(false), clearSubtaskInput()" class="taskFormSubtaskInput" type="text" placeholder="Add new subtask" />
                <div class="iconWrapper">
                  <img id="plusIcon" onclick="focusSubtaskInput()" class="taskFormSubtaskPlusImage" src="../images/icons/plus_dark.png" alt="" />
                  <img id="cancelIcon" class="taskFormSubtaskPlusImage" src="../images/icons/x_black_subtask.png" alt="" style="display: none" />
                  <div id="dividingLine" class="subtaskDividingLine" style="display: none"></div>
                  <img id="checkIcon" onmousedown="addSubtaskToList(), renderSubtasksToList()" class="taskFormSubtaskPlusImage" src="../images/icons/check_black.png" alt="" style="display: none" />
                </div>
              </div>
              <ul class="taskFormSubtaskList" id="taskFormSubtaskList"></ul>
            </div>

            <div class="taskFormCreateTaskButtonBox">
              <div class="taskFormRequiredInfo"><span style="color: red">*</span>This field is requiered</div>
              <div onclick="postTaskData('${taskStatus}')" class="createTaskButton" type="submit">
                <div>Create Task</div>
                <img class="createTaskButtonCheckImage" src="../images/icons/check_white.png" alt="" />
              </div>
            </div>
    `;
}
