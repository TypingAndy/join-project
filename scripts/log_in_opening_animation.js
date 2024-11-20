document.addEventListener("DOMContentLoaded", () => {
  let hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
    setTimeout(() => {
      openingAnimation();
    }, 1000);
    setTimeout(() => {
      displayNoneAnimationBox();
      joinLogoVisible();
    }, 2500);

    sessionStorage.setItem("hasVisited", "true");
  }
  else {
    displayNoneAnimationBox();
    joinLogoVisible();
  }
});

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

function displayNoneAnimationBox() {
  let animationBox = document.getElementById("animationBox");
  animationBox.classList.add("displayNone");
}

function joinLogoVisible() {
  let joinLogo = document.getElementById("afterAnimatioLogo");
  joinLogo.classList.remove("invisible");
}
