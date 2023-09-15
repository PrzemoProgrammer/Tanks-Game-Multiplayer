import Entity from "./Entity";

export default class Enemy extends Entity {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;

    this.test = false;
  }

  update() {
    this.tankBars.setPosition(this.x, this.y);
    // if (this.test) return;
    // this.scene.time.addEvent({
    //   delay: 1000,
    //   callback: () => this.shoot(),
    //   loop: true,
    // });
    // this.test = true;
  }
}
