import macyInstance, { handleOpenGallery } from './gallery/index.js';
import lightbox from './lightbox/index.js';
import { scaleImages } from './bgScale/index.js';
import slider from './slider/index.js';
import toggleSearch from './search/index.js';
import humburger from './humburgerMenu/index.js';

const openGalleryBtnEl = document.getElementById('open-gallery-btn');
const navSearchBtnEl = document.getElementById('nav-search-btn');

(() => {
  lightbox.init();
  slider.mount();
  scaleImages();
  humburger();
  
  ScrollReveal().reveal('.reveal', {
    delay: 120,
    distance: '30px',
    duration: 700
  });

  openGalleryBtnEl?.addEventListener('click', handleOpenGallery);
  navSearchBtnEl?.addEventListener('click', toggleSearch);
  window.addEventListener('resize', scaleImages);
})();
