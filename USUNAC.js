setUpPhysicBody() {
  const { width, height, offsetX, offsetY } = this.config.body;
  const body = this.body;

  body.width = width;
  body.height = height;
  body.offset.x = offsetX;
  body.offset.y = offsetY;
}



body: {
  width: 80,
  height: 110,
  offsetX: -40,
  offsetY: -55,
},








export default class TankHealthBar extends Phaser.GameObjects.Sprite {
  constructor(scene, config) {
    const x = config.offsetX;
    const y = config.offsetY;
    const sprite = config.sprite;

    super(scene, x, y, sprite);
    scene.add.existing(this);

    this.maxHealth = config.max;
    this.health = this.maxHealth;
  }

  updateBar() {
    this.displayWidth = this.getHealthBarWidth();
  }

  getHealthBarWidth() {
    return this.getHealthPercent() * this.displayWidth;
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
