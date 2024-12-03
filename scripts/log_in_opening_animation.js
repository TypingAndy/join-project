/**
 * Event listener that executes functions for the landing page animation after the DOM is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  let hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    // Runs the opening animation if the user visits the page for the first time.
    setTimeout(() => {
      openingAnimation();
    }, 1000);
    setTimeout(() => {
      displayNoneAnimationBox();
      joinLogoVisible();
    }, 2500);

    sessionStorage.setItem("hasVisited", "true");
  } else {
    // Skips the animation and directly shows the logo.
    displayNoneAnimationBox();
    joinLogoVisible();
  }
});

/**
 * Runs the opening screen animation by adding/removing animation effect classes.
 */
function openingAnimation() {
  let animationBox = document.getElementById("animationBox");
  let logoWhite = document.getElementById("joinLogoWhiteAnimation");
  let logoDark = document.getElementById("joinLogoDarkAnimation");

  animationBox.classList.add("landingpageBoxAfterAnimation");
  logoWhite.classList.add("openingScreenLogoBrightLeftCorner");
  logoDark.classList.add("openingScreenLogoDarkLeftCorner");
  animationBox.classList.remove("landingpageBoxStart");
  logoWhite.classList.remove("openingScreenLogoBrightCenter");
  logoDark.classList.remove("openingScreenLogoDarkCenter");
}

/**
 * Hides the animation box by adding a CSS class.
 */
function displayNoneAnimationBox() {
  let animationBox = document.getElementById("animationBox");
  animationBox.classList.add("displayNone");
}

/**
 * Makes the logo visible by removing the `invisible` class.
 */
function joinLogoVisible() {
  let joinLogo = document.getElementById("afterAnimatioLogo");
  joinLogo.classList.remove("invisible");
}
