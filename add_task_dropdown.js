//                                 open/close dropdown EvetnListener for User-Assign inside addTask

document.addEventListener("click", function (event) {
    let isOnAddTask = window.location.pathname.endsWith("add_task.html");
    if (isOnAddTask) {
      let contactsDropdown = document.getElementById("addTaskContactsDropdownLableBox");
      let assignDropdownArrow = document.getElementById("addTaskAssignDropdownArrow");
      let inputField = document.getElementById("addTaskContactsSearchArea");
      let userNameDropDown = document.getElementById("userNameDropDown");
  
      if (contactsDropdown.contains(event.target) && !assignDropdownArrow.contains(event.target)) {
        openUserAssignDropdownInsideAddTask(inputField, userNameDropDown, contactsDropdown);
      } else {
        closeUserAssignDropdownInsideAddTask(userNameDropDown);
      }
    }
  });
  
  //                               open dropdown User-Assign inside addTask
  
  function openUserAssignDropdownInsideAddTask(inputField, userNameDropDown, contactsDropdown) {
    addShowRemoveDisplayNoneToAssignDropdown(userNameDropDown);
    addOpenContactsRemoveClosedContacts(contactsDropdown);
    removeButtonBoxAddDropdown();
    inputField.focus();
  }
  
  function addShowRemoveDisplayNoneToAssignDropdown(userNameDropDown) {
    userNameDropDown.classList.add("show");
    userNameDropDown.classList.remove("displayNone");
  }
  
  function addOpenContactsRemoveClosedContacts(contactsDropdown) {
    contactsDropdown.classList.remove("addTaskContactsDropdownLableBoxClosed");
    contactsDropdown.classList.add("addTaskContactsDropdownLableBoxOpen");
  }
  
  function removeButtonBoxAddDropdown() {
    document.getElementById("addTaskAssignContactsButton").classList.add("displayNone");
    document.getElementById("dropDownSearchCloseButtonBox").classList.remove("displayNone");
  }
  
  //                               close dropdown User-Assign inside addTask
  
  function closeUserAssignDropdownInsideAddTask() {
    removeShowAddDisplayNoneToAssignDropdown(userNameDropDown);
    removeOpenContactsAddClosedContacts();
    addButtonBoxRemoveDropdown();
  }
  
  function removeShowAddDisplayNoneToAssignDropdown(userNameDropDown) {
    userNameDropDown.classList.remove("show");
    userNameDropDown.classList.add("displayNone");
  }
  
  function removeOpenContactsAddClosedContacts() {
    let contactsDropdownBox = document.getElementById("addTaskContactsDropdownLableBox");
    contactsDropdownBox.classList.add("addTaskContactsDropdownLableBoxClosed");
    contactsDropdownBox.classList.remove("addTaskContactsDropdownLableBoxOpen");
  }
  
  function addButtonBoxRemoveDropdown() {
    document.getElementById("addTaskAssignContactsButton").classList.remove("displayNone");
    document.getElementById("dropDownSearchCloseButtonBox").classList.add("displayNone");
  }
  
  //                               open/close dropdown EvetnListener for Category inside addTask
  
  document.addEventListener("click", function (event) {
    let isOnAddTask = window.location.pathname.endsWith("add_task.html");
    if (isOnAddTask) {
      let categoryDropdown = document.getElementById("categoryDropDown");
      let dropdownLableBox = document.getElementById("addTaskChooseCategoryDropdownLableBox");
  
      if (dropdownLableBox.contains(event.target)) {
        toggleCategoryDropdown(categoryDropdown, dropdownLableBox);
      } else if (!categoryDropdown.contains(event.target)) {
        closeCategoryDropdown(categoryDropdown, dropdownLableBox);
      }
    }
  });
  
  function toggleCategoryDropdown(categoryDropdown, dropdownLableBox) {
    if (categoryDropdown.classList.contains("show")) {
      closeCategoryDropdown(categoryDropdown, dropdownLableBox);
    } else {
      openCategoryDropdown(categoryDropdown, dropdownLableBox);
    }
  }

//                                 open dropdown for Category inside addTask
  
  function openCategoryDropdown(categoryDropdown, dropdownLableBox) {
    showCategoryDropdown(categoryDropdown);
    addDropdownLableBox(dropdownLableBox);
    switchAssignArrowToDown();
  }
  
  function showCategoryDropdown(categoryDropdown) {
    categoryDropdown.classList.add("show");
    categoryDropdown.classList.remove("displayNone");
  }
  
  function addDropdownLableBox(dropdownLableBox) {
    dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxOpen");
    dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxClosed");
  }
  
  function switchAssignArrowToDown() {
    document.getElementById("addTaskChooseCategoryDropdownImageUp").classList.remove("displayNone");
    document.getElementById("addTaskChooseCategoryDropdownImageDown").classList.add("displayNone");
  }

//                                 close dropdown for Category inside addTask
  
  function closeCategoryDropdown(categoryDropdown, dropdownLableBox) {
    closeCategoryDropdownWindow(categoryDropdown);
    closeCategoryLableBox(dropdownLableBox);
    switchCategoryArrowToUp();
  }
  
  function closeCategoryDropdownWindow(categoryDropdown) {
    categoryDropdown.classList.remove("show");
    categoryDropdown.classList.add("displayNone");
  }
  
  function closeCategoryLableBox(dropdownLableBox) {
    dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxOpen");
    dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxClosed");
  }
  
  function switchCategoryArrowToUp() {
    document.getElementById("addTaskChooseCategoryDropdownImageUp").classList.add("displayNone");
    document.getElementById("addTaskChooseCategoryDropdownImageDown").classList.remove("displayNone");
  }