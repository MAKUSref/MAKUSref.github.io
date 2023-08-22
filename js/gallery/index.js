const galleryContainerEl = document.getElementById('gallery-container');
const galleryMaskEl = document.getElementById('gallery-mask');

const macyInstance = new Macy({
  container: "#gallery",
  trueOrder: false,
  waitForImages: false,
  useOwnImageLoader: false,
  debug: true,
  mobileFirst: true,
  columns: 1,
  margin: {
    y: 40,
    x: 40,
  },
  breakAt: {
    1500: 4,
    940: 3,
    500: 2,
    300: 1
  },
});

export function handleOpenGallery() {
  galleryContainerEl.style.height = 'auto';
  galleryMaskEl.style.display = 'none';
}

export default macyInstance;
