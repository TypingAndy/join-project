/**
 * Generates the HTML template for displaying contacts grouped by a specific letter.
 *
 * @param {string} letter - The letter by which the contacts are grouped.
 * @param {Array} users - An array of user objects to display in the contact list.
 * @returns {string} The HTML string for the contact list grouped by the given letter.
 */
function contactsTemplate(letter, users) {
  return /*html*/ `
    <div class="contactLetterWrapper">
          <div class="contactLetter">${letter}</div>
          <div class="line"></div>
          ${users
            .map(
              (user) =>
                `
            <div class="contactCard" id='${user.id}' onclick="toggleContactDetails('${user.id}'), toggleAddContactButton(), selectContactCard('${user.id}')">
              <div class="contactCardInitialsCircle" style="background-color: ${user.color}">
                <span class="initials" style="color:${user.fontColor} ">${user.initials}</span>
              </div>
              <div class="contactInfos">
                <span class="contactName">${user.name}</span>
                <a href='${user.email}' class="contactMail">${user.email}</a>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
  `;
}

/**
 * Generates the HTML template for displaying detailed information of a contact.
 *
 * @param {string} firebaseUserId - The ID of the user whose details are to be displayed.
 * @returns {string} The HTML string for the contact details.
 */
function contactDetailsTemplate(firebaseUserId) {
  return /*html*/ `
        <div class="contactDetailsContentWrapper" id="contactDetailsContentWrapper">
        <div class="contactDetailsContentTop">
          <div class="contactDetailsContentTopLabelWrapper">
            <span>Contacts</span>
            <p>Better with a team</p>
            <p></p>
            <div class="contactDetailsContentTopLabelLine"></div>
          </div>
          <div class="contactDetailsContentTopArrowWrapper">
            <img  class="contactDetailsContentTopBlueArrow" onclick="toggleContactDetails(), toggleAddContactButton()" src="../images/icons/arrow-left-line.png" alt="back" />
          </div>
        </div>
        <div class="contactDetailsContentMainWrapper">
          <div class="contactDetailsMainNameWrapper">
            <div class="contactDetailsMainInitialsOuterCircle">
              <div class="contactDetailsMainInitialsInnerCircle" style="background-color: ${userDataFromFirebase[firebaseUserId].color}; color: ${userDataFromFirebase[firebaseUserId].fontColor}">
              <div class="contactDetailsMainInitials">${userDataFromFirebase[firebaseUserId].initials}</div>
            </div>
            </div>
            <div class="contactDetailsMainContactNameWrapper">
            <div class="contactDetailsMainContactName">${userDataFromFirebase[firebaseUserId].name}</div>
            <div class="contactDetailsDeleteEditWrapper">
            <div class="contactDetailsDeleteEdit" onclick="toggleContactPopup(null, 'edit', '${firebaseUserId}')"><p>Edit</p><img src="../images/icons/pencil_black.png" /></div>
            <div class="contactDetailsDelete" onclick=" handleClickDeleteUser('${firebaseUserId}')"><p>Delete</p><img src="../images/icons/trashcan_black.png" /></div>
            </div>
            </div>
          </div>
          <span class="contactDetailsMainContactInformationLabel">Contact Information</span>
          <span class="contactDetailsMainEmailLabel">Email</span>
          <a href="mailto: anton@gmail.com" class="contactDetailsMainEmail">${userDataFromFirebase[firebaseUserId].email}</a>
          <span class="contactDetailsMainPhoneLabel">Phone</span>
          <span class="contactDetailsMainPhone">${userDataFromFirebase[firebaseUserId].phone}</span>
        </div>
        <div class="editContactCircleButton" id="editContactButton" onclick="toggleContactPopup(null, 'edit', '${firebaseUserId}')">
        <img src="../images/icons/edit_vert.png" alt="" />
      </div>
      </div>
  `;
}

/**
 * Generates the HTML template for the contact popup (either for adding or editing a contact).
 *
 * @param {string} popupType - Specifies the type of popup ("add" or "edit").
 * @param {string} firebaseUserId - The ID of the user to edit (only needed for 'edit' type).
 * @returns {string} The HTML string for the contact popup template.
 */
function contactPopupTemplate(popupType, firebaseUserId) {
  if (popupType === "add") {
    return /*html*/ `
    <div class="contactPopup" id="contactPopup">
    <div class="userCircleWrapper">
      <div class="userCircle">
        <img src="../images/icons/person.png" alt="" />
      </div>
    </div>
    <div class="contactPopupTop">
      <img class="contactPopupCloseButton" src="../images/icons/contacts_close.svg" alt="" onclick="toggleContactPopup(), toggleAddContactButton()" />
      <div class="contactPopupTopTitleWrapper">
        <span class="contactPopupTitle">Add contact</span>
        <span class="contactPopupTitlePhrase">Tasks are better with a team!</span>
        <div class="contactPopupTitleLine"></div>
      </div>
    </div>
    <div class="contactPopupBottom">
    <form action="">
  <div class="nameInputWrapper">
    <input class="addContactNameInput" onkeyup="validateContactForm()" id="addContactNameInput" type="text" placeholder="Name"/>
    <img src="../images/icons/person_grey.png" alt="" />
  </div>
  <div class="mailInputWrapper">
    <input class="addContactMailInput" onkeyup="validateContactForm(), validateEmail()" onblur=" validateEmail()" id="addContactMailInput" type="text" placeholder="Email"/>
    <img src="../images/icons/mail_grey.png" alt="" />
  </div>
  <div class="phoneInputWrapper">
    <input class="addContactPhoneInput" onkeyup="validateContactForm(), validatePhoneNumber()" id="addContactPhoneInput" type="tel" placeholder="Phone"/>
    <img src="../images/icons/callgrey.png" alt="" />
  </div>
  <div class="contactButtonsWrapper">

  <div id="cancelContactButton" class="cancelContactButton" onclick="toggleContactPopup(), toggleAddContactButton()" style="cursor: pointer">
  <span>Cancel</span>
  <img src="../images/icons/close.png" alt="" />
</div>
  <div id="createContactButton" class="createContactButton" onclick="handleCreateContactsButtonClick()" style="pointer-events: none; opacity: 0.5;">
    <span>Create Contact</span>
    <img src="../images/icons/check_white.png" alt="" />
  </div>
  </div>
</form>

    </div>
  </div>
`;
  } else {
    return /*html*/ `
    <div class="contactPopup" id="contactPopup">
    <div class="userCircleWrapper" >
      <div class="userCircle" style="background-color: ${userDataFromFirebase[firebaseUserId].color}; color: ${userDataFromFirebase[firebaseUserId].fontColor}">
        <span>${userDataFromFirebase[firebaseUserId].initials}</span>
      </div>
    </div>
    <div class="contactPopupTop">
      <img class="contactPopupCloseButton" src="../images/icons/contacts_close.svg" alt="" onclick="toggleContactPopup(), toggleAddContactButton()" />
      <div class="contactPopupTopTitleWrapper">
        <span class="contactPopupTitle">Edit contact</span>
        <div class="contactPopupTitleLine"></div>
      </div>
    </div>
    <div class="contactPopupBottom">
      <form action="">
        <div class="nameInputWrapper">
          <input class="addContactNameInput" id="editContactNameInput" type="text" value="${userDataFromFirebase[firebaseUserId].name}" />
          <img src="../images/icons/person_grey.png" alt="" />
        </div>
        <div class="mailInputWrapper">
          <input class="addContactMailInput" id="editContactMailInput" type="text" value="${userDataFromFirebase[firebaseUserId].email}" />
          <img src="../images/icons/mail_grey.png" alt="" />
        </div>
        <div class="phoneInputWrapper">
        <input class="addContactPhoneInput" id="editContactPhoneInput" type="tel" value="${userDataFromFirebase[firebaseUserId].phone}" placeholder="Phone" oninput="allowOnlyNumbers(this)"/>
          <img src="../images/icons/callgrey.png" alt="" />
        </div>
        <div class="editContactButtonWrapper">
        <div class="deleteContactButton" onclick=" handleClickDeleteUser('${firebaseUserId}')">
          <span>Delete</span>
        </div>
        <div class="saveContactButton" onclick="handleClickSaveContact('${firebaseUserId}')">
        <span>Save</span>
        <img src="../images/icons/check_white.png" alt="" />
      </div>
        </div>
        
      </form>
    </div>
  </div>
`;
  }
}

/**
 * Generates an empty contact details template (when no contact is selected).
 *
 * @returns {string} The HTML string for the empty contact details.
 */
function emptyContactDetails() {
  return `
  <div class="contactDetailsContentWrapper" id="contactDetailsContentWrapper">
  <div class="contactDetailsContentTop">
    <div class="contactDetailsContentTopLabelWrapper">
      <span>Contacts</span>
      <p>Better with a team</p>
      <p></p>
      <div class="contactDetailsContentTopLabelLine"></div>
    </div>
  </div>
</div>
  `;
}
