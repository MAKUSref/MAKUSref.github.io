import IFragment from "./IFragment.js";
import MODES  from "./Modes.js";

const COLOR_BROWN = [163, 97, 59];

const DEFAULT_XYZ = {
  x: 0,
  y: 0,
  z: 0,
}

const DEFAULT_PROPS = {
  name: "Astronomic Object",
  mode: MODES.NORMAL,
  position: { ...DEFAULT_XYZ },
  rotate: { ...DEFAULT_XYZ },
  radius: 1,
  speed: 1,
  color: [...COLOR_BROWN],
  strokeWeight: 0,
  stroke: [0, 0, 0],
  texture: null,
  model: null,
  scale: 1,
  shininess: 1
  // startingAngle: 0
}

class IAstronomicObject extends IFragment {
  constructor(ctx, props) {
    super(ctx);
    
    this._props = {
      ...DEFAULT_PROPS,
      material: ctx.normalMaterial,
      ...props,
      position: { ...DEFAULT_XYZ, ...props.position },
      rotate: { ...DEFAULT_XYZ, ...props.rotate }
    };

    this._angle = this._props.rotate.z;
    this._objectsAround = [];
  }

  // getters
  get name() { return this._props.name; }

  get props() { return this._props; }

  get position() { return this._props.position; }

  get x() { return this.position.x; }

  get y() { return this.position.y; }

  get z() { return this.position.z; }

  get rotate() { return this._props.rotate; }

  get rotateX() { return this.rotate.x; }

  get rotateY() { return this.rotate.y; }

  get rotateZ() { return this.rotate.z; }

  get radius() { return this._props.radius; }

  get color() { return this._props.color; }

  get speed() { return this._props.speed; }

  get angle() { return this._angle * this.speed / 1000; }

  get strokeWeight() { return this._props.strokeWeight; }

  get stroke() { return this._props.stroke; }

  get startingAngle() { return this._props.startingAngle; }

  get objectsAround() { return this._objectsAround; }

  get mode() { return this._props.mode; }

  get texture() { return this._props.texture; }

  // setters
  set name(val) { this._props.name = val; }

  set x(val) { this._props.position.x = val; }

  set y(val) { this._props.position.y = val; }

  set z(val) { this._props.position.z = val; }
  
  set rotateX(val) { this._props.rotate.x = val; }
  
  set rotateY(val) { this._props.rotate.y = val; }
  
  set rotateZ(val) { this._props.rotate.z = val; }

  set radius(val) { this._props.radius = val; }

  set color(val) { this._props.color = [...val]; }

  set speed(val) { this._props.speed = val; }

  set strokeWeight(val) { this._props.strokeWeight = val; }
}

export default IAstronomicObject;