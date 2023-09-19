import Entity from "./Entity";

export default class Enemy extends Entity {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;

    this.test = false;
  }

  update() {
    this.tankBars.setPosition(this.x, this.y);

    this.rotateGunTowardMousePointer(
      this.gunImage,
      this.config.gun.rotateSpeed
    );
    this.setTankBarsPosition(this.x, this.y);
    if (this.test) return;
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => this.handleShoot(),
      loop: true,
    });
    this.test = true;
  }
}
