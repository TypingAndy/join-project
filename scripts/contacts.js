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
  await deleteUserFromFirebase(firebaseId);
  await renderContacts();
  toggleContactPopup();
  toggleContactDetails();
}
