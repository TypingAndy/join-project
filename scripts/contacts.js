/**
 * Asynchronously groups users by the first letter of their names.
 * The function first sorts users and then groups them based on the first letter of their name.
 *
 * @returns {Promise<Object>} A promise that resolves to an object where keys are letters and values are arrays of users whose names start with that letter.
 */
async function groupUsersByFirstLetter() {
  sortedUsers = await sortUserData();
  return sortedUsers.reduce((groups, user) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(user);
    return groups;
  }, {});
}

/**
 * Highlights the Contact NavLink
 */

function highlightContactInNavbar() {
  let navLink = document.getElementById('contactsLink');
  navLink.classList.add('currentNavLinkBackground');
}

/**
 * Renders the list of contacts by grouping users and displaying them in a specific format.
 * It adds a button to add new contacts and iterates over grouped users to render each group.
 *
 * @returns {Promise<void>} A promise that resolves when the contact list is rendered.
 */
async function renderContacts() {
  const groupedUsers = await groupUsersByFirstLetter();
  let contactsMainSectionElement = document.getElementById("contactsMainSection");
  contactsMainSectionElement.innerHTML = '<div class="newContactWrapperDesktop"><div class="newContactButtonDesktop" onclick="toggleContactPopup(null, \'add\')">Add new contact</div></div>';
  Object.entries(groupedUsers).forEach(([letter, users]) => {
    contactsMainSectionElement.innerHTML += contactsTemplate(letter, users);
  });
  highlightContactInNavbar();
}

/**
 * Toggles the visibility of the "Add Contact" button based on whether contact details exist.
 *
 * @param {Event} event - The event triggered by the click action.
 */
function toggleAddContactButton(event) {
  const addContactButtonElement = document.querySelector(".addContactCircleButton");
  if (event && event.target !== event.currentTarget) {
    return;
  }
  if (checkIfcontactDetailsExists()) {
    addContactButtonElement.style.display = "none";
    return;
  }
  addContactButtonElement.style.display = addContactButtonElement.style.display === "none" ? "flex" : "none";
}

function selectContactCard(userID) {
  if (selectedCardId) {
    let previousCard = document.getElementById(selectedCardId);
    if (previousCard) {
      previousCard.style.backgroundColor = "";
      previousCard.style.color = "";
    }
  }

  let cardElement = document.getElementById(userID);
  cardElement.style.backgroundColor = "rgba(42, 54, 71, 1)";
  cardElement.style.color = "white";

  selectedCardId = userID;
}

/**
 * Toggles the visibility of the contact popup for adding or editing contacts.
 *
 * @param {Event} event - The event triggered by the click action.
 * @param {string} popupType - The type of the popup, either "add" or "edit".
 * @param {string} firebaseUserId - The Firebase user ID for the contact (for editing).
 */
function toggleContactPopup(event, popupType, firebaseUserId) {
  if (event && event.target !== event.currentTarget) {
    return;
  }
  const popupElement = document.getElementById("addContactPopupBackground");
  if (popupElement.style.display === "none") {
    popupElement.innerHTML = contactPopupTemplate(popupType, firebaseUserId);
    popupElement.style.display = "flex";
    setTimeout(() => {
      popupElement.querySelector(".contactPopup").classList.add("show");
    }, 1);
  } else {
    popupElement.querySelector(".contactPopup").classList.remove("show");
    setTimeout(() => {
      popupElement.style.display = "none";
      popupElement.innerHTML = "";
    }, 300);
  }
}

/**
 * Checks if the contact details section exists in the DOM.
 *
 * @returns {HTMLElement|null} The contact details section element if it exists, otherwise null.
 */
function checkIfcontactDetailsExists() {
  const contactDetailsExists = document.getElementById("contactDetailsContentWrapper");
  return contactDetailsExists;
}

/**
 * Clears the input fields in the "Add Contact" form.
 */
function clearAddContactsInputData() {
  document.getElementById("addContactNameInput").value = "";
  document.getElementById("addContactMailInput").value = "";
  document.getElementById("addContactPhoneInput").value = "";
}

/**
 * Handles the creation of a new contact when the "Create Contact" button is clicked.
 * This function posts the contact data to Firebase, updates the contacts list, clears input fields, and shows success feedback.
 *
 * @returns {Promise<void>} A promise that resolves when the contact is created and the UI is updated.
 */
async function handleCreateContactsButtonClick() {
  await postUserDataToFirebase("contact");
  await renderContacts();
  clearAddContactsInputData();
  toggleContactPopup();
  toggleContactDetails(currentUserIdFromFirebase);
  showContactCreatedSuccessfullyPopup();
}

/**
 * Toggles the display of a contact's details section on the desktop, depending on the screen size.
 *
 * @param {string} firebaseUserId - The Firebase user ID for the contact whose details are to be displayed.
 */
function toggleContactDetails(firebaseUserId) {
  const contactDetailsElement = document.getElementById("contactDetailsSection");

  if (window.innerWidth >= 1024) {
    contactDetailsElement.style.display = "flex";
    contactDetailsElement.innerHTML = contactDetailsTemplate(firebaseUserId);
  } else {
    if (contactDetailsElement.style.display !== "flex") {
      contactDetailsElement.style.display = "flex";
      contactDetailsElement.innerHTML = contactDetailsTemplate(firebaseUserId);
    } else {
      contactDetailsElement.style.display = "none";
      contactDetailsElement.innerHTML = "";
    }
  }
}

/**
 * Displays a success popup when a contact is created successfully.
 */
function showContactCreatedSuccessfullyPopup() {
  const contactCreatedSuccessfullyElement = document.getElementById("contactCreatedSuccessfullyPopup");
  if (contactCreatedSuccessfullyElement) {
    contactCreatedSuccessfullyElement.style.display = "flex";

    setTimeout(() => {
      contactCreatedSuccessfullyElement.style.bottom = "150px";

      setTimeout(() => {
        contactCreatedSuccessfullyElement.style.bottom = "-150px";

        setTimeout(() => {
          contactCreatedSuccessfullyElement.style.display = "none";
        }, 300);
      }, 1000);
    }, 0);
  }
}

/**
 * Handles the save action for editing a contact's details.
 * It updates the contact information in Firebase and refreshes the contacts list.
 *
 * @param {string} firebaseId - The Firebase ID of the contact to be updated.
 * @returns {Promise<void>} A promise that resolves when the contact is updated and the UI is refreshed.
 */
async function handleClickSaveContact(firebaseId) {
  await updateUserInFirebase(firebaseId, {
    name: document.getElementById("editContactNameInput").value,
    email: document.getElementById("editContactMailInput").value,
    phone: document.getElementById("editContactPhoneInput").value,
  });
  await loadUserDataFromFirebase();
  toggleContactPopup();
  await renderContacts();
  document.getElementById("contactDetailsSection").innerHTML = contactDetailsTemplate(firebaseId);
}

/**
 * Handles the delete action for a contact. The contact is removed from Firebase and all associated tasks.
 * If the logged-in user is being deleted, they will be logged out.
 *
 * @param {string} firebaseId - The Firebase ID of the contact to be deleted.
 * @returns {Promise<void>} A promise that resolves when the contact is deleted and the UI is updated.
 */
async function handleClickDeleteUser(firebaseId) {
  let loggedUserFirebaseID = localStorage.getItem("loggedUserFirebaseId");
  clearUserDetailsOnDesktop();
  await deleteUserFromFirebase(firebaseId);
  await removeUserFromAllTasks(firebaseId);
  if (firebaseId === loggedUserFirebaseID) {
    logOut();
  }

  await renderContacts();
  toggleContactPopup();
  toggleContactDetails();
}

/**
 * Clears the contact details section on the desktop view.
 */
function clearUserDetailsOnDesktop() {
  const contactDetailsElement = document.getElementById("contactDetailsSection");
  if (window.innerWidth >= 1024) {
    contactDetailsElement.innerHTML = emptyContactDetails();
  }
}

/**
 * Removes a user from all tasks where they are assigned.
 *
 * @param {string} userId - The Firebase ID of the user to be removed from tasks.
 * @returns {Promise<void>} A promise that resolves when the user is removed from all tasks.
 */
async function removeUserFromAllTasks(userId) {
  await loadTasksObjectFromFirebase();

  for (let taskId in allUnsortedTasks) {
    const task = allUnsortedTasks[taskId];
    if (task.taskAssignedUsersIds && task.taskAssignedUsersIds.includes(userId)) {
      const updatedUserIds = task.taskAssignedUsersIds.filter((id) => id !== userId);

      if (updatedUserIds.length > 0) {
        await fetch(`${BASE_URL}tasks/${taskId}/taskAssignedUsersIds.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserIds),
        });
      } else {
        await fetch(`${BASE_URL}tasks/${taskId}/taskAssignedUsersIds.json`, {
          method: "DELETE",
        });
      }
    }
  }
}

/**
 * Validates the contact form, checking if all fields are filled and if the email is valid.
 *
 * @returns {void} This function does not return a value. It updates the "Create Contact" button state.
 */
function validateContactForm() {
  let name = document.getElementById("addContactNameInput").value.trim();
  let email = document.getElementById("addContactMailInput").value.trim();
  let phone = document.getElementById("addContactPhoneInput").value.trim();

  let isEmailValid = validateEmail(email);
  let allValid = name !== "" && email !== "" && phone !== "" && isEmailValid;

  let button = document.getElementById("createContactButton");

  if (allValid) {
    button.style.pointerEvents = "auto";
    button.style.opacity = 1;
  } else {
    button.style.pointerEvents = "none";
    button.style.opacity = 0.5;
  }
}

/**
 * Validates the phone number input, removing any non-numeric characters.
 *
 * @returns {void} This function does not return a value. It modifies the phone input field.
 */
function validatePhoneNumber() {
  let phoneInput = document.getElementById("addContactPhoneInput");
  let phoneValue = phoneInput.value.trim();

  phoneValue = phoneValue.replace(/\D/g, "");
  phoneInput.value = phoneValue;
}

/**
 * Validates an email address by checking if it contains the "@" symbol.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function validateEmail(email) {
  if (email && email.includes("@")) {
    return true;
  }
}

/**
 * Allows only numeric characters in the input field.
 *
 * @param {HTMLInputElement} input - The input element where only numbers should be allowed.
 * @returns {void} This function does not return a value. It modifies the input value directly.
 */
function allowOnlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
