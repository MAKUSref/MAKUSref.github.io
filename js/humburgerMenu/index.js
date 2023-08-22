const humburgerContainerEl = document.getElementById('humburger-container');
const humburgerOverlayEl = document.getElementById('humburger-overlay');
const humburgerContentEl = document.getElementById('humburger-content');
const closeBtnEls = document.querySelectorAll('.humburger-close');
const openBtnEl = document.querySelector('.humburger-open');

const HUMBURGER_OPEN_CLASS_NAME = 'humburger--open';

function init() {
  closeHumburger();
  closeBtnEls?.forEach((el) => el.addEventListener('click', closeHumburger));
  openBtnEl?.addEventListener('click', openHumburger);
  humburgerOverlayEl?.addEventListener('click', closeHumburger)
}

function closeHumburger() {
  humburgerContainerEl.classList.remove(HUMBURGER_OPEN_CLASS_NAME);

  setTimeout(() => {
    humburgerContainerEl.style.display = 'none';
  }, 300);
}

function openHumburger() {
  humburgerContainerEl.style.display = 'block';

  setTimeout(() => {
    humburgerContainerEl.classList.add(HUMBURGER_OPEN_CLASS_NAME);
  }, 1);
}

export default init;
