const MENU = document.querySelector('.menu');
const SETTINGS_ICON = document.querySelector('.icon-cog');
const SOUND = document.querySelector('.sound');
const SETTINGS = document.querySelector('.settings');
const CLOSE = document.querySelector('.icon-left');
const CATEGORIES_LIST = document.querySelector('.categories');

const CATEGORIES_NAMES = [
    'Zwierzęta',
    'Przedmioty',
    'Czynności',
    'Postacie',
    'Tytuły',
    'Powiedzenia'
]


const SELECTED_FAST_CATEGORIES = [];
const SELECTED_CATEGORIES = [];

const BOX_SHADOW = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
const touchEvents = {
    move: 'touchmove',
    start: 'touchstart',
    end: 'touchend',
}

const FLEX = 'flex';
const NONE = 'none';
const BOLD = 'bold';
const NORMAL = 'normal';
const PINK = 'rgb(238, 214, 232)';
const LIGHT_GRAY = 'rgb(240, 240, 240)';

const DATA_SELECTED = 'data-selected';




SETTINGS_ICON.addEventListener(touchEvents.start, openSettings);
CLOSE.addEventListener(touchEvents.start, closeSettings);

SETTINGS_ICON.addEventListener(touchEvents.end, touchShadowOff);
CLOSE.addEventListener(touchEvents.end, touchShadowOff);


function touchShadow(e){
    e.target.style.boxShadow = BOX_SHADOW;
}

function touchShadowOff(e){
    e.target.style.boxShadow = NONE;
}

function openSettings(e){
    touchShadow(e);
    MENU.style.display = NONE;
    SETTINGS.style.display = FLEX;
    SETTINGS_ICON.removeEventListener(touchEvents.start, openSettings);
    displayCategories();
}

function closeSettings(e){
    touchShadow(e);
    MENU.style.display = FLEX;
    SETTINGS.style.display = NONE;
    CLOSE.removeEventListener(touchEvents, closeSettings);
    SETTINGS_ICON.addEventListener(touchEvents.start, openSettings);
}

function displayCategories(){
    const oldCategories = document.querySelectorAll('.category');
    oldCategories.forEach(oldCat => {
        oldCat.remove();
    });
    CATEGORIES_NAMES.forEach(catName => {
        const category = document.createElement('div');
        category.className = 'category';
        category.innerHTML = catName;
        category.addEventListener(touchEvents.start, selectCategory);
        CATEGORIES_LIST.appendChild(category);

    });
}

function selectCategory(e){
    const selectedCat = e.target;
    selectedCat.style.backgroundColor = PINK;
    selectedCat.style.fontWeight = BOLD;
    selectedCat.setAttribute(DATA_SELECTED, 1);
    selectedCat.removeEventListener(touchEvents.start, selectCategory);
    selectedCat.addEventListener(touchEvents.start, unselectCategory);
}

function unselectCategory(e){
    const selectedCat = e.target;
    
    selectedCat.style.backgroundColor = LIGHT_GRAY;
    console.log(selectedCat.style.backgroundColor, LIGHT_GRAY);
    selectedCat.style.fontWeight = NORMAL;
    selectedCat.setAttribute(DATA_SELECTED, 0);
    selectedCat.removeEventListener(touchEvents.start, unselectCategory);
    selectedCat.addEventListener(touchEvents.start, selectCategory);
}