class TankHealthBar extends Phaser.GameObjects.Sprite {
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
    return (this.health / this.maxHealth) * this.displayWidth;
  }

  getDamage(damage) {
    this.health -= damage;
    this.updateBar();
  }
}
