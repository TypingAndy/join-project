//                               open Dropdown for User-Assign inside EditPopup

function openEditPopupAssignDropdown(inputField, userNameDropDown, contactsDropdown) {
    addShowRemoveDisplayNoneToAssignDropdownEditPopup(userNameDropDown);
    addOpenContactsRemoveClosedContactsEditPopup(contactsDropdown);
    removeButtonBoxAddDropdownEditPopup();
    inputField.focus();
  }
  
  function addShowRemoveDisplayNoneToAssignDropdownEditPopup(userNameDropDown) {
    userNameDropDown.classList.add("show");
    userNameDropDown.classList.remove("displayNone");
  }
  
  function addOpenContactsRemoveClosedContactsEditPopup(contactsDropdown) {
    contactsDropdown.classList.remove("addTaskContactsDropdownLableBoxClosed");
    contactsDropdown.classList.add("addTaskContactsDropdownLableBoxOpen");
  }
  
  function removeButtonBoxAddDropdownEditPopup() {
    document.getElementById("boardEditPopupAssignContactsButton").classList.add("displayNone");
    document.getElementById("boardEditPopupDropDownSearchCloseButtonBox").classList.remove("displayNone");
  }
  
  //                             close Dropdown for User-Assign inside EditPopup
  
  function closeEditPopupAssignDropdown(userNameDropDown) {
    removeShowAddDisplayNoneToAssignDropdownEditPopup(userNameDropDown), removeOpenContactsAddClosedContactsEditPopup(), addButtonBoxRemoveDropdownEditPopup();
  }
  
  function removeShowAddDisplayNoneToAssignDropdownEditPopup(userNameDropDown) {
    userNameDropDown.classList.remove("show");
    userNameDropDown.classList.add("displayNone");
  }
  
  function removeOpenContactsAddClosedContactsEditPopup() {
    let contactsDropdownBox = document.getElementById("boardEditPopupContactsDropdownLableBox");
    contactsDropdownBox.classList.add("addTaskContactsDropdownLableBoxClosed");
    contactsDropdownBox.classList.remove("addTaskContactsDropdownLableBoxOpen");
  }
  
  function addButtonBoxRemoveDropdownEditPopup() {
    document.getElementById("boardEditPopupAssignContactsButton").classList.remove("displayNone");
    document.getElementById("boardEditPopupDropDownSearchCloseButtonBox").classList.add("displayNone");
  }


  //                               open Dropdown for Category inside EditPopup

function openCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox) {
  showCategoryDropdownEditPopup(categoryDropdown);
  addDropdownLableBoxEditPopup(dropdownLableBox);
  switchAssignArrowToDownEditPopup();
}

function showCategoryDropdownEditPopup(categoryDropdown) {
  categoryDropdown.classList.add("show");
  categoryDropdown.classList.remove("displayNone");
}

function addDropdownLableBoxEditPopup(dropdownLableBox) {
  dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxOpen");
  dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxClosed");
}

function switchAssignArrowToDownEditPopup() {
  document.getElementById("boardEditPopupChooseCategoryDropdownImageUp").classList.remove("displayNone");
  document.getElementById("boardEditPopupChooseCategoryDropdownImageDown").classList.add("displayNone");
}

//                               close Dropdown for Category inside EditPopup

function closeCategoryDropdownEditPopup(categoryDropdown, dropdownLableBox) {
  closeCategoryDropdownWindowEditPopup(categoryDropdown);
  closeCategoryLableBoxEditPopup(dropdownLableBox);
  switchCategoryArrowToUpEditPopup();
}

function closeCategoryDropdownWindowEditPopup(categoryDropdown) {
  categoryDropdown.classList.remove("show");
  categoryDropdown.classList.add("displayNone");
}

function closeCategoryLableBoxEditPopup(dropdownLableBox) {
  dropdownLableBox.classList.remove("addTaskChooseCategoryDropdownLableBoxOpen");
  dropdownLableBox.classList.add("addTaskChooseCategoryDropdownLableBoxClosed");
}

function switchCategoryArrowToUpEditPopup() {
  document.getElementById("boardEditPopupChooseCategoryDropdownImageUp").classList.add("displayNone");
  document.getElementById("boardEditPopupChooseCategoryDropdownImageDown").classList.remove("displayNone");
}