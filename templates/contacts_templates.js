function contactsTemplate(letter, users) {
  return `
    <div class="contactLetterWrapper">
          <div class="contactLetter">${letter}</div>
          <div class="line"></div>
          ${users
            .map(
              (user) =>
                `
            <div class="contactCard" onclick="toggleContactDetails('${user.id}'), toggleAddContactButton()">
              <div class="contactCardInitialsCircle" style="background-color: ${user.color}">
                <span class="initials" style="color:${user.fontColor} ">${user.initials}</span>
              </div>
              <div class="contactInfos">
                <span class="contactName">${user.name}</span>
                <a href='mailto:${user.email}' class="contactMail">${user.email}</a>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
    
    
    `;
}

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
            <img onclick="toggleContactDetails(), toggleAddContactButton()" src="../images/icons/arrow-left-line.png" alt="back" />
          </div>
        </div>
        <div class="contactDetailsContentMainWrapper">
          <div class="contactDetailsMainNameWrapper">
            <div class="contactDetailsMainInitialsOuterCircle">
              <div class="contactDetailsMainInitialsInnerCircle" style="background-color: ${userDataFromFirebase[firebaseUserId].color}; color: ${userDataFromFirebase[firebaseUserId].fontColor}">
              <div class="contactDetailsMainInitials">${userDataFromFirebase[firebaseUserId].initials}</div>
            </div>
            </div>
            <div class="contactDetailsMainContactName">${userDataFromFirebase[firebaseUserId].name}</div>
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
      <img src="../images/icons/close_white.png" alt="" onclick="toggleContactPopup(), toggleAddContactButton()" />
      <div class="contactPopupTopTitleWrapper">
        <span class="contactPopupTitle">Add contact</span>
        <span class="contactPopupTitlePhrase">Tasks are better with a team!</span>
        <div class="contactPopupTitleLine"></div>
      </div>
    </div>
    <div class="contactPopupBottom">
      <form action="">
        <div class="nameInputWrapper">
          <input class="addContactNameInput" id="addContactNameInput" type="text" placeholder="Name" />
          <img src="../images/icons/person_grey.png" alt="" />
        </div>
        <div class="mailInputWrapper">
          <input class="addContactMailInput" id="addContactMailInput" type="text" placeholder="Email" />
          <img src="../images/icons/mail_grey.png" alt="" />
        </div>
        <div class="phoneInputWrapper">
          <input class="addContactPhoneInput" id="addContactPhoneInput" type="text" placeholder="Phone" />
          <img src="../images/icons/callgrey.png" alt="" />
        </div>
        <div class="createContactButton" onclick="handleCreateContactsButtonClick()">
          <span>Create Contact</span>
          <img src="../images/icons/check_white.png" alt="" />
        </div>
      </form>
    </div>
  </div>
`;
  } else {
    return /*html*/ `
    <div class="contactPopup" id="contactPopup">
    <div class="userCircleWrapper">
      <div class="userCircle">
        <img src="../images/icons/person.png" alt="" />
      </div>
    </div>
    <div class="contactPopupTop">
      <img src="../images/icons/close_white.png" alt="" onclick="toggleContactPopup(), toggleAddContactButton()" />
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
          <input class="addContactPhoneInput" id="editContactPhoneInput" type="text" value="${userDataFromFirebase[firebaseUserId].phone}" />
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
