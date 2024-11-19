document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        openingAnimation() ;
    }, 1000);
  

})


function openingAnimation() {
    let animationBox = document.getElementById('animationBox');
let logoWhite = document.getElementById('joinLogoWhiteAnimation');
let logoDark = document.getElementById('joinLogoDarkAnimation');

animationBox.classList.add('landingpageBoxAfterAnimation')
logoWhite.classList.add('openingScreenLogoBrightLeftCorner');
logoDark.classList.add('openingScreenLogoDarkLeftCorner');
animationBox.classList.remove('landingpageBoxStart')
logoWhite.classList.remove('openingScreenLogoBrightCenter');
logoDark.classList.remove('openingScreenLogoDarkCenter');

}