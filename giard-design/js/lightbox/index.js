import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.3.8/photoswipe-lightbox.esm.min.js';

export default new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: () => import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.3.8/photoswipe.esm.min.js')
});
