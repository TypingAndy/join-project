async function sortUserData() {
  let data = await loadUserDataFromFirebase();
  const unsortedUsers = Object.entries(data).map(([id, user]) => ({
    ...user,
    id: id,
  }));
  return unsortedUsers.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
}

function createUserDataForFirebase(userType) {
  const userData = userType === "contact" ? getAddContactsInputData() : getSignUpInputData();
  userData.initials = createUserInitials(userData);
  userData.color = createUserColor();
  userData.fontColor = createUserFontColor(userData);
  return userData;
}

function getAddContactsInputData() {
  let contactNameInput = document.getElementById("addContactNameInput");
  let contactMailInput = document.getElementById("addContactMailInput");
  let contactPhoneInput = document.getElementById("addContactPhoneInput");
  let addContactsInputData = { name: contactNameInput.value, email: contactMailInput.value, phone: contactPhoneInput.value, password: "", isRegistered: false };
  return addContactsInputData;
}

function getSignUpInputData() {
  let signUpNameInput = document.getElementById("signUpNameInput");
  let signUpMailInput = document.getElementById("signUpMailInput");
  let signUpConfirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  let signUpInputData = { name: signUpNameInput.value, email: signUpMailInput.value, phone: "", password: signUpConfirmPasswordInput.value, isRegistered: true };
  return signUpInputData;
}

function createUserInitials(userData) {
  let fullName = userData.name;
  let nameParts = fullName.split(" ");
  let initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials;
}

function createUserColor() {
  let randomNumber = Math.floor(Math.random() * 15);
  let userColor = userColorsPreset[randomNumber];
  return userColor;
}

function createUserFontColor(userData) {
  let currentColor = userData.color;
  currentColor = currentColor.replace(/#/, "");
  let r = parseInt(currentColor.substring(0, 2), 16);
  let g = parseInt(currentColor.substring(2, 4), 16);
  let b = parseInt(currentColor.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}
