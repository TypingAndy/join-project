let userDataFromFirebase;
let currentUserIdFromFirebase;

/**
 * Asynchronously loads user data from Firebase, sorts the users by their names,
 * and returns the sorted array of users.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of sorted user objects.
 */
async function sortUserData() {
  let data = await loadUserDataFromFirebase();
  userDataFromFirebase = data;
  const unsortedUsers = Object.entries(data).map(([id, user]) => ({
    ...user,
    id: id,
  }));
  return unsortedUsers.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
}

/**
 * Creates user data to be saved in Firebase based on the user type (contact or sign-up).
 * The function generates necessary user attributes like initials, color, and font color.
 *
 * @param {string} userType - The type of user ("contact" or "signUp").
 * @returns {Object} The user data object with additional fields like initials, color, and font color.
 */
function createUserDataForFirebase(userType) {
  const userData = userType === "contact" ? getAddContactsInputData() : getSignUpInputData();
  userData.initials = createUserInitials(userData);
  userData.color = createUserColor();
  userData.fontColor = createUserFontColor(userData);
  return userData;
}

/**
 * Retrieves the input data from the "Add Contact" form.
 *
 * @returns {Object} The contact data including name, email, phone, and default values for password and registration status.
 */
function getAddContactsInputData() {
  let contactNameInput = document.getElementById("addContactNameInput");
  let contactMailInput = document.getElementById("addContactMailInput");
  let contactPhoneInput = document.getElementById("addContactPhoneInput");
  let addContactsInputData = {
    name: contactNameInput.value,
    email: contactMailInput.value,
    phone: contactPhoneInput.value,
    password: "",
    isRegistered: false,
  };
  return addContactsInputData;
}

/**
 * Retrieves the input data from the "Sign Up" form.
 *
 * @returns {Object} The sign-up data including name, email, password, and registration status.
 */
function getSignUpInputData() {
  let signUpNameInput = document.getElementById("signUpNameInput");
  let signUpMailInput = document.getElementById("signUpMailInput");
  let signUpConfirmPasswordInput = document.getElementById("signUpConfirmPasswordInput");
  let signUpInputData = {
    name: signUpNameInput.value,
    email: signUpMailInput.value,
    phone: "",
    password: signUpConfirmPasswordInput.value,
    isRegistered: true,
  };
  return signUpInputData;
}

/**
 * Creates the initials for a user based on their full name.
 * The initials are formed by taking the first letter of each word in the user's name.
 *
 * @param {Object} userData - The user data object containing the user's name.
 * @returns {string} The initials derived from the user's full name.
 */
function createUserInitials(userData) {
  let fullName = userData.name;
  let nameParts = fullName.split(" ");
  let initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials;
}

/**
 * Creates a random color for the user by selecting a color from a preset list.
 *
 * @returns {string} A random color from the userColorsPreset array.
 */
function createUserColor() {
  let randomNumber = Math.floor(Math.random() * 15);
  let userColor = userColorsPreset[randomNumber];
  return userColor;
}

/**
 * Determines the appropriate font color (black or white) for a user based on their chosen color.
 * The function calculates the luminance of the user's color and returns either black or white font color
 * based on the luminance value.
 *
 * @param {Object} userData - The user data object that contains the user's color.
 * @returns {string} The font color, either "black" or "white", depending on the luminance of the user's color.
 */
function createUserFontColor(userData) {
  let currentColor = userData.color;
  currentColor = currentColor.replace(/#/, "");
  let r = parseInt(currentColor.substring(0, 2), 16);
  let g = parseInt(currentColor.substring(2, 4), 16);
  let b = parseInt(currentColor.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}
