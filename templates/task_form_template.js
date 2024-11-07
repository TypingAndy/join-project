function taskFormTemplate() {
  return /*html*/ `
    
          <!-- rednerTaskFormTemplate -->

          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Title<span style="color: red">*</span></div>
            <div class="taskFormInputContainer">
              <input id="taskTitleInput" class="taskFormInput" required type="text" placeholder="Enter a Title" />
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
              <input id="taskFormUserInput" onclick="openTaskFormUserDropdown()" onkeyup="addTaskFilterFunction()" placeholder="Select contacts to assign" class="taskFormInput" />
              <img id="taskFormSubtaskShowHidePlus" class="taskFormSubtaskPlusImage img24px" src="../images/icons/arrow_drop_down_down.png" alt="" />
            </div>
          </div>

          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Due date<span style="color: red">*</span></div>
            <div class="taskFormInputContainer">
              <input id="dateInput" class="taskFormInput" type="date" min="" />
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
              <input onclick="openTaskFormCategoryDropdown()" placeholder="Select task category" class="taskFormCategoryInput" />
              <img id="taskFormSubtaskShowHidePlus" class="taskFormSubtaskPlusImage img24px" src="../images/icons/arrow_drop_down_down.png" alt="" />
            </div>
          </div>

          <div class="taskFormSectionBox">
            <div class="taskFormLabels">Subtasks</div>

            <div id="addSubtask" class="taskFormInputContainer">
              <input class="taskFormSubtaskInput" type="text" placeholder="Add new subtask" />
              <img id="taskFormSubtaskShowHidePlus" class="taskFormSubtaskPlusImage img24px" src="../images/icons/plus_dark.png" alt="" />
            </div>

          </div>
    
    
    `;
}
