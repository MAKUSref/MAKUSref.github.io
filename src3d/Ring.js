import IAstronomicObject from "./interfaces/IAstronomicObject.js";

class Ring extends IAstronomicObject {
  constructor(ctx, props) {
    super(ctx, props);
  }

  draw() {
    this.ctx.push();
    this._transform();
    this.ctx.pop();
    this._angle--;
  }

  _transform() {
    this.ctx.fill(this.color);

    this.ctx.rotateX(this.rotateX);
    this.ctx.rotateY(this.rotateY);
    this.ctx.rotateZ(this.angle);

    this.ctx.translate(this.x, this.y, this.z);

    if (this.texture) {
      this.ctx.texture(this.texture);
    } else {
      this.ctx.fill(this.color);
    }
    
    this.ctx.torus(this.radius, this.props.torus?.radius, this.props.torus?.detailX, this.props.torus?.detailY);
  }
}

export default Ring;