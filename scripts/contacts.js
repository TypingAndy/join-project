function createContactDataForFirebase() {
  let contactData = getAddContactsInputData();
  contactData.initials = createContactsInitials(contactData);
  contactData.color = createContactColor();
  contactData.fontColor = createContactsFontColor(contactData);
  contactData.password = "";
  return contactData;
}

function getAddContactsInputData() {
  let nameInput = document.getElementById("contactNameInput");
  let mailInput = document.getElementById("contactMailInput");
  let phoneInput = document.getElementById("contactPhoneInput");
  let addContactsInputData = { name: nameInput.value, email: mailInput.value, phone: phoneInput.value };
  return addContactsInputData;
}

function createContactsFontColor(contactData) {
  let currentColor = contactData.color;
  currentColor = currentColor.replace(/#/, "");
  let r = parseInt(currentColor.substring(0, 2), 16);
  let g = parseInt(currentColor.substring(2, 4), 16);
  let b = parseInt(currentColor.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}

function createContactsInitials(contactData) {
  let fullName = contactData.name;
  let nameParts = fullName.split(" ");
  let initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials;
}

function createContactColor() {
  let randomNumber = Math.floor(Math.random() * 15);
  let userColor = userColorsPreset[randomNumber];
  return userColor;
}

function clearAddContactsInputData() {
  document.getElementById("contactNameInput").value = "";
  document.getElementById("contactMailInput").value = "";
  document.getElementById("contactPhoneInput").value = "";
}
