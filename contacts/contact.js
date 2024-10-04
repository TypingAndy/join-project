let BASE_URL =
  "https://remotestorage-1b599-default-rtdb.europe-west1.firebasedatabase.app/";
let contactData = {};
let responseToJson;
let allContacts = [];
let allContactsInitials = [];
let userColorsPreset = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];
let allContactsColors = [];
let groupedContacts = {};

function init() {
  loadAllContacts();
  loadContactData();
  console.log("initialisiert");
}

async function addContact() {
  let { contactData } = getContactInputData();

if (!contactData.name || !contactData.email || !contactData.phone) {
    return; 
  }
  
  
  await fetch(BASE_URL + `contacts/.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  loadContactData();
}

function getContactInputData(contactData) {
  let nameInput = document.getElementById("contactNameInput");
  let mailInput = document.getElementById("contactMailInput");
  let phoneInput = document.getElementById("contactPhoneInput");
  contactData = {
    name: nameInput.value,
    email: mailInput.value,
    phone: phoneInput.value,
  };
  return { contactData, nameInput, mailInput, phoneInput };
}


async function loadContactData(path = "contacts") {
  let response = await fetch(BASE_URL + path + ".json");
  responseToJson = await response.json();
  for (let key in responseToJson) {
    let contact = responseToJson[key];
    allContacts.push({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      color: contact.color,
    });
  }

  console.log(allContacts, "Contacts");
  createContactInitials();
  assignContactColors();
  loadAllContacts();
}

function loadAllContacts() {
    let allContactsList = document.getElementById("allContactsList");
    allContactsList.innerHTML = "";
  
    let groupedContacts = groupContactsByInitial(allContacts);
    let sortedLetters = Object.keys(groupedContacts).sort();
  
    sortedLetters.forEach((letter) => {
      renderGroupedContacts(allContactsList, groupedContacts[letter], letter);
    });
  }
  

  function groupContactsByInitial(contacts) {
    let groupedContacts = {};
  
    for (let i = 0; i < contacts.length; i++) {
      let firstLetter = contacts[i].name.charAt(0).toUpperCase();
  
      // Hier die if-Bedingung hinzufügen
      if (contacts[i].name && contacts[i].email && contacts[i].phone) {
        if (!groupedContacts[firstLetter]) {
          groupedContacts[firstLetter] = [];
        }
  
        groupedContacts[firstLetter].push(contacts[i]);
      }
    }
  
    return groupedContacts;
  }
  
  

function renderGroupedContacts(allContactsList, contacts, letter) {

  addAlphabetCategory(allContactsList, letter);
  

  contacts.forEach((contact) => {
    let index = allContacts.indexOf(contact);
    addContact(allContactsList, contact, allContactsInitials[index]);
  });
}


function addAlphabetCategory(allContactsList, letter) {
  allContactsList.innerHTML += `
    <div class="alphabetCategory">
      <span>${letter}</span>
    </div>
  `;
}


function addContact(allContactsList, contact, initials) {
  allContactsList.innerHTML += `
    <div>
      <img class="addContactIcon" src="/join-project/images/icons/Secondary mobile contact V1.svg">
    </div>
    <div class="contactsDiv">
      <div class="assignContactColors" style="background-color: ${contact.color};">
        ${initials}
      </div>
      <div class="contactsBox">
        <span>${contact.name}</span>
        <a href="">${contact.email}</a>
      </div>
    </div>
  `;
}

  
  

function createContactInitials() {
  for (let i = 0; i < allContacts.length; i++) {
    let fullName = allContacts[i].name;
    let nameParts = fullName.split(" ");
    let initials = nameParts.map((part) => part.charAt(0)).join("");
    allContactsInitials.push(initials);
  }
}

function assignContactColors() {
  for (let i = 0; i < allContacts.length; i++) {
    let colorIndex = i % userColorsPreset.length;
    let assignedColor = userColorsPreset[colorIndex];
    allContactsColors.push(assignedColor);
    allContacts[i].color = assignedColor;
  }
}


  