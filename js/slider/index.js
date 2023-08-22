const goLeftEl = document.querySelector('[data-glide-dir="<"]');
const goRightEl = document.querySelector('[data-glide-dir=">"]');

const glideInstance = new Glide('.glide');

goLeftEl.addEventListener('click', () => {
  glideInstance.go('<');
});

goRightEl.addEventListener('click', () => {
  glideInstance.go('>');
});

export default glideInstance;
