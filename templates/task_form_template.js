function taskFormTemplate() {
    return /*html*/ `
    
    <div class="addTaskSectionHeaderInputGap">
            <div class="addTaskFormLabels">Title<span style="color: red">*</span></div>
            <input id="taskTitleInput" class="addTaskInputTitle" required type="text" placeholder="Enter a Title" />
          </div>

          <div class="addTaskSectionHeaderInputGap">
            <div class="addTaskFormLabels">Description</div>
            <textarea id="taskDescriptionInput" class="addTaskInputDescription" type="text" placeholder="Enter a Description"></textarea>
          </div>
    
    
    `
}