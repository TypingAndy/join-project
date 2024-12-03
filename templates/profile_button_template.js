/**
 * Generates the HTML template for the user profile button.
 * 
 * @returns {string} The HTML string for the user profile button.
 */
function profileButtonTemplate() {
  return /*html*/ `
    <div id="userPorfileButton" onclick="openSignedUserDropdown()" class="userProfile">
            <p id="profileInitials">G</p>
    </div>
  `;
}
