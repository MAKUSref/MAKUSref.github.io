const hideCardClass = 'd-none';

const cardsSelectros = [
  '.card-1',
  '.card-2',
  '.card-3',
  '.card-4',
  '.card-5',
  '.card-6',
  '.card-7',
  '.card-8',
  '.card-9',
  '.card-10',
];
let currentCard = 0;
const bodyEl = document.querySelector('body');

bodyEl.addEventListener('click', () => {
  if (currentCard < cardsSelectros.length - 1) {
    hideCard(currentCard);
    nextCard();
  }
  
}, true);

const hideCard = (index) => {
  document.querySelector(cardsSelectros[index]).classList.add(hideCardClass);
}

const nextCard = () => {
  currentCard++;
  showCard(currentCard);
}

const showCard = (index) => {
  document.querySelector(cardsSelectros[index]).classList.remove(hideCardClass);
}