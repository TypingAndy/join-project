function contactsTemplate(letter, users) {
  return `
    <div class="contactLetterWrapper">
          <div class="contactLetter">${letter}</div>
          <div class="line"></div>
          ${users
            .map(
              (user) =>
                `
            <div class="contactCard">
              <div class="contactCardInitialsCircle" style="background-color: ${user.color}">
                <span class="initials">${user.initials}</span>
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
