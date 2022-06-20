import Background from "./Background.js";
import AstronomicObject from "./AstronomicObject.js";
import Ring from "./Ring.js";
import MODES from "./interfaces/Modes.js";
import LightBox from "./LightBox.js";

const KEY_CODE_W = 'KeyW';
const KEY_CODE_A = 'KeyA';
const KEY_CODE_S = 'KeyS';
const KEY_CODE_D = 'KeyD';
const KEY_CODE_J = 'KeyJ';
const KEY_CODE_K = 'KeyK';
const KEY_CODE_Q = 'KeyQ';
const KEY_CODE_E = 'KeyE';

const ORBIT_DEFAULT = {
  speed: 0,
  color: [255, 255, 255, 50],
  torus: { radius: 0.5, detailX: 100 }
}

const RING_DEFAULT = {
  rotate: { y: -0.2 },
  speed: -30,
  torus: { radius: 5, detailX: 24, detailY: 3 }
}

class View {
  constructor(el) {
    this._el = el;
    this._p5;
    this._sun;

    this._sketch = this._sketch.bind(this);

    if (this._el) {
      this.init();
    }
  }

  init() {
    this._p5 = new p5(this._sketch, this._el);
  }

  _sketch(ctx) {
    let background;
    let img1, img2, img3, img4, img5, img6;
    let obj;

    ctx.setup = () => {
      img1 = ctx.loadImage("./src3d/assets/planet1.png");
      img2 = ctx.loadImage("./src3d/assets/planet2.png");
      img3 = ctx.loadImage("./src3d/assets/planet3.png");
      img4 = ctx.loadImage("./src3d/assets/brown.png");
      img5 = ctx.loadImage("./src3d/assets/planet5.png");
      img6 = ctx.loadImage("./src3d/assets/planet6.png");
      obj = ctx.loadModel("./src3d/assets/teapot.obj", true);

      background = new Background(ctx);

      this._sun = new AstronomicObject(ctx, {
        mode: MODES.EMISSIVE,
        // texture: sun,
        color: [255, 215, 38],
        radius: 50,
        speed: 0
      });

      const planet1Rotate = { x: 1, y: 0.6 };
      const planet2Rotate = { x: 1, y: 2.7 };
      const planet3Rotate = { x: 1, y: -0.2 };
      const planet4Rotate = { x: 1 };

      // Orbits
      const orbit1 = new Ring(ctx, { ...ORBIT_DEFAULT, radius: 100, rotate: { ...planet1Rotate } });
      const orbit2 = new Ring(ctx, { ...ORBIT_DEFAULT, radius: 200, rotate: { ...planet2Rotate } });
      const orbit3 = new Ring(ctx, { ...ORBIT_DEFAULT, radius: 300, rotate: { ...planet3Rotate } });
      const orbit4 = new Ring(ctx, { ...ORBIT_DEFAULT, radius: 500, rotate: { ...planet4Rotate } });

      // Planets
      const planet1 = new AstronomicObject(ctx, {
        position: { x: 100 },
        // texture: img2,
        mode: MODES.AMBIENT,
        rotate: { ...planet1Rotate },
        radius: 20,
        speed: 15,
        shininess: 1
      });

      const planet2 = new AstronomicObject(ctx, {
        position: { x: 200 },
        texture: img3,
        mode: MODES.AMBIENT,
        rotate: { x: 1, y: 2.7 },
        radius: 25,
        speed: -15
      });

      const planet3 = new AstronomicObject(ctx, {
        position: { x: 300 },
        texture: img6,
        rotate: { x: 1, y: -0.2 },
        radius: 15,
        speed: -15
      });

      const planet4 = new AstronomicObject(ctx, {
        position: { x: 500 },
        texture: img5,
        rotate: { x: 1 },
        radius: 35,
        speed: 15
      });

      // Moons
      const moon11 = new AstronomicObject(ctx, {
        position: { x: 30 },
        texture: img1,
        rotate: { y: 0.5, x: 0.5 },
        radius: 5,
        speed: -40
      });

      const moon21 = new AstronomicObject(ctx, {
        position: { x: 45 },
        texture: img1,
        rotate: { x: 1 },
        radius: 5,
        speed: -40
      });

      const moon22 = new AstronomicObject(ctx, {
        position: { x: 30 },
        texture: img4,
        rotate: { y: 0.5, x: 0.5 },
        radius: 5,
        speed: 40
      });

      const moon23 = new AstronomicObject(ctx, {
        position: { x: 50 },
        texture: img1,
        rotate: { y: 0.1, x: -0.5 },
        radius: 3,
        speed: 50
      });

      const moon31 = new AstronomicObject(ctx, {
        position: { x: 30 },
        texture: img1,
        rotate: { x: 1 },
        radius: 5,
        speed: -30
      });

      const moon41 = new AstronomicObject(ctx, {
        position: { x: 45 },
        texture: img2,
        rotate: { x: 1.8 },
        radius: 7,
        speed: 30
      });

      const moon42 = new AstronomicObject(ctx, {
        position: { x: 100 },
        texture: img4,
        rotate: { x: 0.4 },
        radius: 9,
        speed: 30
      });

      const teapot = new AstronomicObject(ctx, {
        position: { x: 50 },
        rotate: { x: 1 },
        speed: 30,
        model: obj,
        scale: 0.1,
        mode: MODES.NORMAL
      });

      // Ring
      const ring41 = new Ring(ctx, { ...RING_DEFAULT, radius: 70, texture: img4 });
      const ring42 = new Ring(ctx, { ...RING_DEFAULT, radius: 75, texture: img1 });
      const ring43 = new Ring(ctx, { ...RING_DEFAULT, radius: 80, texture: img1 });
      const ring44 = new Ring(ctx, { ...RING_DEFAULT, radius: 85, texture: img4 });
      const ring45 = new Ring(ctx, { ...RING_DEFAULT, radius: 90, texture: img4 });

      // Light Boxes
      const lightBox = new LightBox(ctx, { box: { width: 4, height: 4, depth: 8 }, position: { z: 50 } })

      // Appends
      planet1.addObjectAround(moon11);

      planet2.addObjectAround(moon21);
      planet2.addObjectAround(moon22);
      planet2.addObjectAround(moon23);

      planet3.addObjectAround(moon31);
      planet3.addObjectAround(teapot);


      planet4.addLight(lightBox);
      planet4.addObjectAround(ring41);
      planet4.addObjectAround(ring42);
      planet4.addObjectAround(ring43);
      planet4.addObjectAround(ring44);
      planet4.addObjectAround(ring45);
      planet4.addObjectAround(moon41);
      planet4.addObjectAround(moon42);

      this._sun.addObjectAround(orbit1);
      this._sun.addObjectAround(orbit2);
      this._sun.addObjectAround(orbit3);
      this._sun.addObjectAround(orbit4);
      this._sun.addObjectAround(planet1);
      this._sun.addObjectAround(planet2);
      this._sun.addObjectAround(planet3);
      this._sun.addObjectAround(planet4);
    }

    let cameraPosX = 0;
    let cameraPosY = 0;
    let cameraPosZ = 1000;
    let cameraRotX = 0;
    let cameraRotY = 0;
    let cameraRotZ = 0;

    document.addEventListener('keydown', (e) => {
      const { code } = e;
      let currentSpeed;

      switch(code) {
        case KEY_CODE_W:
          cameraPosY -= 5;
          break;
        case KEY_CODE_A:
          cameraPosX -= 5;
          break;
        case KEY_CODE_S:
          cameraPosY += 5;
          break;
        case KEY_CODE_D:
          cameraPosX += 5;
          break;
        case KEY_CODE_J:
          cameraPosZ -= 30;
          break;
        case KEY_CODE_K:
          cameraPosZ += 30;
          break;
        case KEY_CODE_Q:
          currentSpeed = this._sun._objectsAround[5].speed;
          this._sun._objectsAround[5].speed = currentSpeed / 1.05;

          currentSpeed = this._sun._objectsAround[6].speed;
          this._sun._objectsAround[6].speed = currentSpeed / 1.05;

          currentSpeed = this._sun._objectsAround[7].speed;
          this._sun._objectsAround[7].speed = currentSpeed / 1.05;
          break;
        case KEY_CODE_E:
          currentSpeed = this._sun._objectsAround[5].speed;
          this._sun._objectsAround[5].speed = currentSpeed * 1.05;

          currentSpeed = this._sun._objectsAround[6].speed;
          this._sun._objectsAround[6].speed = currentSpeed * 1.05;

          currentSpeed = this._sun._objectsAround[7].speed;
          this._sun._objectsAround[7].speed = currentSpeed * 1.05;
          break;
      }
    });

    ctx.draw = () => {
      background.clear();
      ctx.noStroke();

      // light
      ctx.ambientLight(150);
      ctx.pointLight(255, 255, 255, 0, 0, 0);

      ctx.push();
      ctx.pop();

      // draw planetary system
      this._sun.draw();

      ctx.push()
      ctx.stroke(20);

      ctx.translate(cameraPosX, cameraPosY + 50, cameraPosZ - 200);

      const halfW = ctx.width / 2;
      const halfH = ctx.height / 2;

      const prescaleX = ctx.mouseX - halfW;
      const prescaleY = ctx.mouseY - halfH;

      ctx.rotateY(-prescaleX / halfW * 0.3);
      ctx.rotateX(prescaleY / halfH * 0.3);
      ctx.rotateZ(0);

      ctx.box(20, 5, 60);

      ctx.push()
      ctx.translate(5, 0, 40);
      ctx.box(3, 3, 10);
      ctx.pop()

      ctx.push();
      ctx.translate(-5, 0, 40);
      ctx.box(3, 3, 10);
      ctx.pop();

      ctx.push();
      ctx.translate(0, -5, -20);
      ctx.box(10, 3, 5);
      ctx.pop();

      ctx.pop();
      ctx.camera(0, 0, cameraPosZ, cameraRotX, cameraRotY, cameraRotZ, 0, 1, 0);
    }
  }
}

new View(document.querySelector('.root'));