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

async function returnData() {
  const sortedUsers = await sortUserData();
  const groupedUsers = await groupUsersByFirstLetter();
  console.log(sortedUsers, groupedUsers);
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

  Object.entries(groupedUsers).forEach(([letter, users]) => {
    contactsMainSectionElement.innerHTML += contactsTemplate(letter, users);
  });
}

function hideAddContactButton() {
  document.querySelector(".addContactCircleButton").style.display = "none";
}
