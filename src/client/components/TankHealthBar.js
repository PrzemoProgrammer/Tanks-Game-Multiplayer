export default class TankHealthBar extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.offsetX;
    const y = config.offsetY;
    super(scene, x, y);

    this.scene = scene;
    this.config = config;
    scene.add.existing(this);

    this.maxHealth = this.config.max;
    this.health = this.maxHealth;

    this.bar = this.createBar(-60, 4);
    this.container = this.createContainer(0, 0);

    this.add([this.container, this.bar]);
  }

  createBar(x, y) {
    const image = this.config.image;
    const bar = this.scene.add.image(x, y, image).setOrigin(0, 0.5);

    return bar;
  }

  createContainer(x, y) {
    const image = this.config.containerImage;
    const container = this.scene.add.image(x, y, image);

    return container;
  }

  updateBar() {
    this.bar.displayWidth = this.getHealthBarWidth();
  }

  getHealthBarWidth() {
    return this.getHealthPercent() * this.bar.displayWidth;
  }

  getDamage(damage) {
    this.health -= damage;
    this.updateBar();
  }

  getHealthValue() {
    return this.health;
  }

  getHealthPercent() {
    return this.health / this.maxHealth;
  }
}
