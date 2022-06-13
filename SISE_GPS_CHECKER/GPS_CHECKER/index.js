import ctiPointer from "./ctiPointer.js";

const CTI_POLYGON = [
  // 1st
  [51.747168, 19.456079],
  // 2nd
  [51.747134, 19.455600],
  // 3rd
  [51.746890, 19.455660],
  // 4th
  [51.746934, 19.456128]
];

const CTI_ROOMS_NAMES = {
  ROOM_1: "room 1",
  ROOM_2: "room 2",
  ROOM_3: "room 3",
  ROOM_4: "room 4",
  ROOM_5: "room 5",
  ROOM_6: "room 6",
  ROOM_7: "room 7",
  ROOM_8: "room 8",
  ROOM_9: "room 9",
  ROOM_10: "room 10",
  ROOM_11: "room 11",
  NO_ROOM: "NO_ROOM",
}

const CTI_ROOMS_COORDS = [
  {
    name: CTI_ROOMS_NAMES.ROOM_1,
    startX: 0,
    endX: 23,
    startY: 61,
    endY: 100,
  }, 
  {
    name: CTI_ROOMS_NAMES.ROOM_2,
    startX: 0,
    endX: 23,
    startY: 38,
    endY: 61
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_3,
    startX: 0,
    endX: 23,
    startY: 0,
    endY: 33
  }, 
  {
    name: CTI_ROOMS_NAMES.ROOM_4,
    startX: 23,
    endX: 32,
    startY: 0,
    endY: 29
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_5,
    startX: 32,
    endX: 77,
    startY: 0,
    endY: 29
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_6,
    startX: 77,
    endX: 100,
    startY: 0,
    endY: 33
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_7,
    startX: 77,
    endX: 100,
    startY: 33,
    endY: 45
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_8,
    startX: 77,
    endX: 100,
    startY: 45,
    endY: 72
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_9,
    startX: 77,
    endX: 100,
    startY: 72,
    endY: 100
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_10,
    startX: 57,
    endX: 77,
    startY: 82,
    endY: 100
  },
  {
    name: CTI_ROOMS_NAMES.ROOM_11,
    startX: 23,
    endX: 57,
    startY: 82,
    endY: 100
  }
]

const CTI_POPUP_TXT = "CTI";

const CTI_MAP_CONTAINER_ACTIVE_CLASS = 'map--active';

const FOCUS_MAP_BTN_SELECTOR = "#focus-map";
const CTI_LOCATION_SELECTOR = '.cti-btn';
const CTI_ENTER_BTN_SELECTOR = '.go-to-cti';
const MAP_UI_SELECTOR = '.map-ui';
const CTI_MAP_CONTAINER_SELECTOR = '.cti-map-container';
const CTI_MAP_SELECTOR = '.cti-map';
const CTI_CANVAS_SELECTOR = '.cti-pointer-layer';
const USER_MARKER_SELECTOR = '.user-marker';
const CTI_MAP_EXIT_SELECTOR = '.cti-map-exit';
const ROOM_NAME_SELECTOR = '.room-name';

const INIT_LAT = 51.7526355;
const INIT_LONG = 19.4643039;
const INIT_ZOOM = 14;
// const REFRESH_RATE = 600;

class Dashboard {
  constructor(el) {
    this._el = el;
    this._init
    this._map;
    this._osm;
    this._marker;
    this._circle;
    this._ctiPolygon;
    this._currX;
    this._currY;
    this._currentRoom = CTI_ROOMS_NAMES.NO_ROOM;
    const navigationCorrect = this._checkNavigation();

    if (this._el && navigationCorrect) {
      this.init();
    } else if (!navigationCorrect) {
      alert("Navigation is Broken!");
    }
  }

  // public
  init() {
    this._mapInit();
    this._tileLayerInit();
    // this._setViewToUserPosition();
    this._addFocusMapEvent();
    this._addCTILocationEvent();
    this._addEnterCTIEvent();
    this._addExitCTIEvent();
    this._addPositionWatcher();
  }

  getCurrentUserPosition(position) {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    const accuracy = position.coords.accuracy

    return { lat, long, accuracy };
  }

  // private
  _checkNavigation() {
    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!");
      return false;
    }
    return true;
  }

  _mapInit() {
    this._map = L.map(this._el).setView([INIT_LAT, INIT_LONG], INIT_ZOOM);
  }

  _tileLayerInit() {
    this._osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this._osm.addTo(this._map);
    this._ctiPolygon = L.polygon(CTI_POLYGON).addTo(this._map);
    this._ctiPolygon.bindPopup(CTI_POPUP_TXT);
  }

  _setViewToUserPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { lat, long, accuracy } = this.getCurrentUserPosition(position);

      // if marker exist, remove it
      if (this._marker) {
        this._map.removeLayer(this._marker);
      }

      if (this._circle) {
        this._map.removeLayer(this._circle);
      }

      // create market
      this._marker = L.marker([lat, long]);
      this._circle = L.circle([lat, long], { radius: accuracy });

      // add marker to map
      const featureGroup = L.featureGroup([this._marker, this._circle]).addTo(this._map);

      // scale map to accuracy
      this._map.fitBounds(featureGroup.getBounds());

      console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy);
    });
  }

  _addFocusMapEvent() {
    document.querySelector(FOCUS_MAP_BTN_SELECTOR).addEventListener('click', () => {
      this._setViewToUserPosition();
    });
  }

  _addCTILocationEvent() {
    document.querySelector(CTI_LOCATION_SELECTOR).addEventListener('click', () => {
      this._setView(51.747145, 19.455876, 18)
    });
  }

  _setView(coords, zoom) {
    this._setView(coords[0], coords[1], zoom);
  }

  _setView(lat, long, zoom) {
    this._map.setView([lat, long], zoom);
  }

  _addEnterCTIEvent() {
    
    document.querySelector(CTI_ENTER_BTN_SELECTOR).addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { lat, long, accuracy } = this.getCurrentUserPosition(pos);
        
        const estimated_round_trip_time = navigator.connection;
        console.log(estimated_round_trip_time);
        // const lat = 51.747000;
        // const long = 19.455700;
        
        this._currX = lat;
        this._currY = long;

        const inCTI = this._checkInCTI(this._currX, this._currY);

        if (inCTI) {
          this._showCTIMap();
        } else {
          alert(`You're not in CTI`);
        }
      });
    });
  }

  _checkInCTI(lat, long) {
    const xMax = CTI_POLYGON[0][0];
    const xMin = CTI_POLYGON[2][0];
    const yMax = CTI_POLYGON[3][1];
    const yMin = CTI_POLYGON[1][1];

    if (lat >= xMin && lat <= xMax && long >= yMin && long <= yMax) {
      return true;
    }

    return false;
  }

  _showCTIMap() {
    document.querySelector(CTI_MAP_CONTAINER_SELECTOR).classList.add(CTI_MAP_CONTAINER_ACTIVE_CLASS);
    this._initCTICanvas();
  }

  _addExitCTIEvent() {
    document.querySelector(CTI_MAP_EXIT_SELECTOR).addEventListener('click', this._exitCTIMap);
  }

  _exitCTIMap() {
    document.querySelector(CTI_MAP_CONTAINER_SELECTOR).classList.remove(CTI_MAP_CONTAINER_ACTIVE_CLASS);
  }

  _initCTICanvas() {
    this._resizeCanvas();
    this._correctUserMarker();
  }

  _resizeCanvas() {
    const canvas = document.querySelector(CTI_CANVAS_SELECTOR);
    const mapEl = document.querySelector(CTI_MAP_SELECTOR);
    const mapSize = mapEl.getBoundingClientRect().height;

    canvas.style.height = `${mapSize}px`;
  }

  _correctUserMarker() {
    const ctiCanvas = document.querySelector(CTI_CANVAS_SELECTOR);
    const userMarkerEl = document.querySelector(USER_MARKER_SELECTOR);
    const roomNameEl = document.querySelector(ROOM_NAME_SELECTOR);
    
    const xMax = CTI_POLYGON[0][0];
    const xMin = CTI_POLYGON[2][0];
    const yMax = CTI_POLYGON[3][1];
    const yMin = CTI_POLYGON[1][1];

    const transMaxX = xMax - xMin;
    const transMaxY = yMax - yMin;

    const currX = this._currX - xMin;
    const currY = this._currY - yMin;

    
    const width = ctiCanvas.getBoundingClientRect().width;
    const height = ctiCanvas.getBoundingClientRect().height;

    const transX = (currX / transMaxX) * width;
    const transY = (currY / transMaxY) * height;

    userMarkerEl.style.left = `${transX}px`;
    userMarkerEl.style.top = `${transY}px`;

    this._currentRoom = this._calculateCurrentRoom(transX, transY);

    roomNameEl.textContent = this._currentRoom;
  }

  _calculateCurrentRoom(x, y) {
    const ctiCanvas = document.querySelector(CTI_CANVAS_SELECTOR);
    const width = ctiCanvas.getBoundingClientRect().width;
    const height = ctiCanvas.getBoundingClientRect().height;

    const scaledX = (x / width) * 100;
    const scaledY = (y / height) * 100;

    let room = CTI_ROOMS_NAMES.NO_ROOM;

    CTI_ROOMS_COORDS.forEach((el) => {
      const startXCorrect = scaledX >= el.startX;
      const startYCorrect = scaledY >= el.startY;

      const endXCorrect = scaledX <el.endX;
      const endYCorrect = scaledY <el.endY;

      if (startXCorrect && startYCorrect && endXCorrect && endYCorrect) {
        room = el.name;
        return;
      }
      
    });

    return room;
  }

  _addPositionWatcher() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { lat, long } = this.getCurrentUserPosition(pos);
        this._currX = lat;
        this._currY = long;
        this._correctUserMarker();
      });


    }, 800);
  }
}

document.querySelectorAll('#map').forEach((el) => {
  new Dashboard(el);
})