import AstronomiObject from "./AstronomicObject.js";

class LightBox extends AstronomiObject {
  constructor(ctx, props) {
    super(ctx, props);
  }

  _transform() {
    const { width, height, depth } = this.props.box;

    this.ctx.rotateX(this.rotateX);
    this.ctx.rotateY(this.rotateY);
    this.ctx.rotateZ(this.rotateZ);

    

    // const vector = this.ctx.createVector(this.x, this.y, this.z);
    // vector.div(100);
    this.ctx.pointLight(255, 255, 255, this.x, this.y + 400, this.z + 1000);
    this.ctx.shininess(1);
    
    this.ctx.translate(this.x, this.y, this.z);
    this.ctx.specularMaterial(this.color);
    this.ctx.box(width, height, depth);
  }
 }

export default LightBox;