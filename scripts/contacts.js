async function sortUserData() {
  let data = await loadUserData();
  const unsortedUsers = Object.entries(data).map(([id, user]) => ({
    ...user,
    id: id,
  }));
  return unsortedUsers.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
}

async function groupUsersByFirstLetter() {
  const sortedUsers = await sortUserData();
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
  if (event && event.target !== event.currentTarget) {
    return;
  }
  const addContactButtonElement = document.querySelector(".addContactCircleButton");
  addContactButtonElement.style.display = addContactButtonElement.style.display === "none" ? "flex" : "none";
}

function toggleAddContactPupup(event) {
  if (event && event.target !== event.currentTarget) {
    return;
  }
  const popupElement = document.getElementById("addContactPopupBackground");
  popupElement.style.display = popupElement.style.display === "none" ? "flex" : "none";
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
  toggleAddContactPupup();
  toggleContactDetails();
}

function toggleContactDetails() {
  const contactDetailsElement = document.querySelector(".contactDetailsSection");
  contactDetailsElement.style.display = contactDetailsElement.style.display === "none" ? "flex" : "none";
}
