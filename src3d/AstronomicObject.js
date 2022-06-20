import IAstronomiObject from "./interfaces/IAstronomicObject.js";
import MODES from "./interfaces/Modes.js";

class AstronomiObject extends IAstronomiObject {
  constructor(ctx, props) {
    super(ctx, props);
    this.light;
  }

  // public
  draw() {
    this.ctx.push();
    this._transform();

    this.objectsAround.forEach((obj) => {
      obj.draw();
    });

    this.ctx.pop();
    this._angle--;
  }

  addObjectAround(obj) {
    this.objectsAround.push(obj);
  }

  addLight(obj) {
    this.light = obj;
  }

  // private
  _transform() {

    this.ctx.rotateX(this.rotateX);
    this.ctx.rotateY(this.rotateY);
    this.ctx.rotateZ(this.angle);

    this.ctx.translate(this.x, this.y, this.z);

    this.ctx.noStroke();

    if (!!this.light) {
      this.light.draw();
    }

    this._turnOnMaterialMode();
    
    if (this.texture) {
      this.ctx.texture(this.texture);
    } else {
      this.ctx.fill(this.color);
    }

    this.ctx.scale(this.props.scale);
    
    // console.log(this.props.model);
    if (this.props.model) {
      this.ctx.model(this.props.model);
    } else {
      this.ctx.sphere(this.radius);
    }

    
  }

  _turnOnMaterialMode() {
    switch (this.mode) {
      case MODES.AMBIENT:
        this.ctx.ambientMaterial(this.color);
        break;
      case MODES.EMISSIVE:
        this.ctx.emissiveMaterial(this.color);
        break;
      case MODES.SPECULAR:
        this.ctx.shininess(this.props.shininess);
        this.ctx.specularMaterial(this.color);
        break;
      case MODES.NORMAL:
        this.ctx.noFill();
        this.ctx.normalMaterial();
        break;
      default:
        this.ctx.fill(this.color);
    }
  }
}

export default AstronomiObject;