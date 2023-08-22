const introImageEls = document.querySelectorAll(".intro-image");
const aboutImageEl = document.getElementById("about-image");

export function scaleImages() {
  introImageEls.forEach((el) => {
    el.style.width = calcImageWidth();
  });
  aboutImageEl.style.width = calcImageWidth();
}

function calcImageWidth() {
  const clientWidth = window.innerWidth;
  return clientWidth > 1023 ? `${clientWidth / 2 - 32}px` : '100vw';
}
