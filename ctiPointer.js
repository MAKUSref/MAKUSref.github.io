const DEFAULY_DATA = {
  width: 400,
  height: 400,
  xMax: 1,
  yMax: 1
}

class ctiPointer {
  constructor(ctx, data) {
    this._ctx = ctx;
    this._data = { ...DEFAULY_DATA, ...data };
  }

  get ctx() { return this._ctx; }
  get width() { return this._data.width; }
  get height() { return this._data.height; }
  get xMax() { return this._data.xMax; }
  get yMax() { return this._data.yMax; }

  draw(currX, currY) {
    const transformX = currX / this.xMax * this.width;
    const transformY = currY / this.yMax * this.height;

    
  }
}

export default ctiPointer;