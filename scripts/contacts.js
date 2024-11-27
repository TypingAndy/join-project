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

async function renderContacts() {
  const groupedUsers = await groupUsersByFirstLetter();
  let contactsMainSectionElement = document.getElementById("contactsMainSection");
  contactsMainSectionElement.innerHTML = "";
  Object.entries(groupedUsers).forEach(([letter, users]) => {
    contactsMainSectionElement.innerHTML += contactsTemplate(letter, users);
  });
}

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

function checkIfcontactDetailsExists() {
  const contactDetailsExists = document.getElementById("contactDetailsContentWrapper");
  return contactDetailsExists;
}

function clearAddContactsInputData() {
  document.getElementById("addContactNameInput").value = "";
  document.getElementById("addContactMailInput").value = "";
  document.getElementById("addContactPhoneInput").value = "";
}

async function handleCreateContactsButtonClick() {
  await postUserDataToFirebase("contact");
  await renderContacts();
  clearAddContactsInputData();
  toggleContactPopup();
  toggleContactDetails(currentUserIdFromFirebase);
  showContactCreatedSuccessfullyPopup();
}

function toggleContactDetails(firebaseUserId) {
  const contactDetailsElement = document.getElementById("contactDetailsSection");

  if (contactDetailsElement.style.display !== "flex") {
    contactDetailsElement.style.display = "flex";
    contactDetailsElement.innerHTML = contactDetailsTemplate(firebaseUserId);
  } else {
    contactDetailsElement.style.display = "none";
    contactDetailsElement.innerHTML = "";
  }
}

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

async function handleClickDeleteUser(firebaseId) {
  let loggedUserFirebaseID = localStorage.getItem("loggedUserFirebaseId");

  await deleteUserFromFirebase(firebaseId);

  if (firebaseId === loggedUserFirebaseID) {
    logOut();
  }

  await renderContacts();
  toggleContactPopup();
  toggleContactDetails();
}

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

function validatePhoneNumber() {
  let phoneInput = document.getElementById("addContactPhoneInput");
  let phoneValue = phoneInput.value.trim();

  phoneValue = phoneValue.replace(/\D/g, "");
  phoneInput.value = phoneValue;
}

function validateEmail(email) {
  if (email && email.includes("@")) {
    return true;
  }
}
