import mainDictionary from './mainDictionary';
const FLEX = 'flex';
const NONE = 'none';
const PINK = 'rgb(238, 214, 232)';
const LIGHT_GRAY = 'rgb(240, 240, 240)';

const TOUCH = {
    move: 'touchmove',
    start: 'touchstart',
    end: 'touchend',
}

/*--------- Buttons & Icons --------------*/

const FAST_GAME_BUTT = document.querySelector('.menu__button-fastGame');
const NEW_GAME_BUTT = document.querySelector('.menu__button-newGame');
const SETTINGS_ICON = document.querySelector('.icon-cog');
const CLOSE_SETTINGS = document.querySelector('.close-settings');
const CLOSE_FAST_INTRO = document.querySelector('.close-fast-intro');
const START_FAST_GAME = document.querySelector('.fast-game-intro-button');

/*----------------- divs ---------------*/

const MENU = document.querySelector('.menu');
const SETTINGS = document.querySelector('.settings');
const CATEGORIES = document.querySelector('.categories');
const WARNING = document.querySelectorAll('.warning');
const FAST_GAME_INTRO = document.querySelector('.fast-game-intro');
const MY_FAST_CATS = document.querySelector('.my-cats');
const MY_FAST_TIME = document.querySelector('.my-time');

/*---------------- data ----------------*/

const TIME_FAST_GAME_SELECT = document.querySelector('.settings__fastGame__timeSetting__');
const DATA_SELECTED = 'data-selected';
const SELECTED_FAST_CATS_ID = ['0', '1', '2']; //wyciagnac z local storage

/* -------- Universal Functions-----------*/

function displayCats(){
    const oldCategories = document.querySelectorAll('.category');
    
    oldCategories.forEach(oldCat => {
        oldCat.remove();
    });
    mainDictionary.categories.forEach(cat => {
        const category = document.createElement('div');
        category.className = 'category';
        category.innerHTML = cat.catName;
        category.id = cat.id;
        CATEGORIES.appendChild(category);
        
    });

    const fast_categories = document.querySelectorAll('.settings__fastGame__categories .category');
    fast_categories.forEach((fastCat) => {
        const id = fastCat.id;
        if(SELECTED_FAST_CATS_ID.find(element => element == id) != undefined){
            fastCat.setAttribute(DATA_SELECTED, 1);
        }
    });
}

function activeCats(){
    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach(cat => {
        const isSelected = cat.getAttribute(DATA_SELECTED);
        if(isSelected == '1') {
            cat.style.backgroundColor = PINK;
            cat.removeEventListener(TOUCH.start, selectCategory);
            cat.addEventListener(TOUCH.start, unselectCategory);
        }
        else{
           cat.style.backgroundColor = LIGHT_GRAY; 
           cat.addEventListener(TOUCH.start, selectCategory);
           cat.removeEventListener(TOUCH.start, unselectCategory);
        } 

    });
}

function unselectCategory(e){
    const selectedCat = e.target;
    selectedCat.setAttribute(DATA_SELECTED, 0);
    activeCats();
}

function selectCategory(e){
    const selectedCat = e.target;
    selectedCat.setAttribute(DATA_SELECTED, 1);
    activeCats();
}

function timerReset(){

}

function timerRun(){
    let sec = TIME_FAST_GAME_SELECT.value;
    let min = div(sec, 60);
    sec = sec%60;
    console.log(min, sec);
}

function div(a, b){
    return (Math.round(a/b - 0.5));
  }

/*---------Start Functions ---------------*/

function openFastGameIntro(e){
    FAST_GAME_INTRO.style.display = FLEX;
    MENU.style.display = NONE;

    MY_FAST_CATS.innerHTML = '';
    mainDictionary.categories.forEach(cat => {
        if(SELECTED_FAST_CATS_ID.includes(cat.id.toString())){
            const myCat = document.createElement('div');
            myCat.className = "my-cat";
            MY_FAST_CATS.appendChild(myCat);
            myCat.innerHTML = cat.catName + '<br><br>';

        }
    });
    const time = TIME_FAST_GAME_SELECT.value;
    switch (time) {
        case '0':
            MY_FAST_TIME.innerHTML = '';
            break;
        case '30':
            MY_FAST_TIME.innerHTML = '0:30';
            break;
        case '60':
            MY_FAST_TIME.innerHTML = '1:00';
            break;
        case '90':
            MY_FAST_TIME.innerHTML = '1:30';
            break;
        case '120':
            MY_FAST_TIME.innerHTML = '2:00';
            break;
        default:
            break;
    }
    START_FAST_GAME.style.animationName = NONE;
    MY_FAST_CATS.style.animationName = NONE;
    START_FAST_GAME.addEventListener(TOUCH.start, startFastGame);
}

function closeFastIntro(){
    FAST_GAME_INTRO.style.display = NONE;
    MENU.style.display = FLEX;
}

function startFastGame(){
    START_FAST_GAME.style.animationName = 'disappear';
    MY_FAST_CATS.style.animationName = 'disappear';
    timerRun();
}

function openNewGameSettings(e){
    console.log("Przycisk NOWA GRA wciścnięty");
}

function openSettings(e){
    MENU.style.display = NONE;
    SETTINGS.style.display = FLEX;
    
    CLOSE_SETTINGS.addEventListener(TOUCH.start, closeSettings);
}

function closeSettings(){
    SELECTED_FAST_CATS_ID.splice(0);
    
    const fast_categories = document.querySelectorAll('.settings__fastGame__categories .category');
    let countOfSelectedCats = 0;
    fast_categories.forEach(fastCat => {
        const isSelected = fastCat.getAttribute(DATA_SELECTED);
        if(isSelected == '1'){
           countOfSelectedCats++;
           SELECTED_FAST_CATS_ID.push(fastCat.id);
        } 
    });

    if(countOfSelectedCats != 0){
        
        WARNING.forEach(war => {
            war.style.display = NONE;
        });
        SETTINGS.style.display = NONE;
        MENU.style.display = FLEX;
    } 
    else {
        WARNING.forEach(war => {
            war.style.display = FLEX;
        });
        
    }
}


function init() {
    FAST_GAME_BUTT.addEventListener(TOUCH.start, openFastGameIntro);
    NEW_GAME_BUTT.addEventListener(TOUCH.start, openNewGameSettings);
    SETTINGS_ICON.addEventListener(TOUCH.start, openSettings);
    CLOSE_FAST_INTRO.addEventListener(TOUCH.start, closeFastIntro);
    FAST_GAME_INTRO.style.animationName = 'show';
    MENU.style.animationName = 'show';
    SETTINGS.style.animationName = 'show';
    displayCats();
    activeCats();
}

export default init;