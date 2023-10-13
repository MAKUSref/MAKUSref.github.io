const navSearchEl = document.getElementById('nav-search');

const ANIME_DEFAULT_PROPS = {
  targets: navSearchEl,
  easing: 'easeInOutQuad',
  duration: 500,
};

const SEARCH_TO_CLOSE_PROPS = {
  ...ANIME_DEFAULT_PROPS,
  width: '0px',
  paddingLeft: '0px',
  paddingRight: '0px'
}

const SEARCH_TO_OPEN_PROPS = {
  ...ANIME_DEFAULT_PROPS,
  width: '200px',
  paddingLeft: '12px',
  paddingRight: '12px'
}

let searchVisible = false;

function toggleSearch() {
  const animeProps = searchVisible ? SEARCH_TO_CLOSE_PROPS : SEARCH_TO_OPEN_PROPS;
  anime(animeProps);
  navSearchEl.focus();
  toggleSearchVisible();
}

function toggleSearchVisible() { searchVisible = !searchVisible; }

export default toggleSearch;
