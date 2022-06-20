import IFragment from "./interfaces/IFragment.js";

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const FRAME_RATE = 60;

const EVENT_RESIZE = 'resize';

class Background extends IFragment {
  constructor(ctx, color = [20, 25, 33]) {
    super(ctx);

    this._backgroundColor = color;
    this._width = WINDOW_WIDTH;
    this._height = WINDOW_HEIGHT;
    this._frameRate = FRAME_RATE;

    this._resizeHandler = this._resizeHandler.bind(this);

    if (this._ctx) {
      this.draw();
      this._setEvents();
    }
  }

  // getters
  get width() { return this._width; }

  get heigth() { return this._height; }

  get centerX() { return this._width / 2; }
  
  get centerY() { return this._height / 2; }

  // setters
  set width(val) { this._width = val; }

  set height(val) { this._height = val; }

  set backgroundColor(val) { this._backgroundColor = val; }

  draw() {
    this.ctx.createCanvas(this._width, this._height, this.ctx.WEBGL);
    this.ctx.frameRate(this._frameRate);
    this.ctx.background(...this._backgroundColor);
    this.ctx.translate(this._width / 2, this._height / 2);
  }

  setupCenter() {
    this.ctx.resetMatrix();
    this.ctx.translate(this.centerX, this.centerY, 0);
  }

  clear() {
    this.ctx.background(...this._backgroundColor);
  }

  _setEvents() {
    window.addEventListener(EVENT_RESIZE, this._resizeHandler);
  }

  _resizeHandler() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.draw();
  }
}

export default Background;