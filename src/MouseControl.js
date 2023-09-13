class MouseControl {
  constructor(scene) {
    this.scene = scene;

    this.addEvents();
  }

  addEvents() {
    this.scene.input.on("pointerdown", (pointer) => {
      if (!this.scene.playerShip.canShootAttack()) return;
      this.scene.playerShip.shoot();
    });
  }
}
