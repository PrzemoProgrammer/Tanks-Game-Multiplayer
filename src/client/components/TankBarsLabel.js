import TankHealthBar from "./TankHealthBar";
import TankAmmoBar from "./TankAmmoBar";

export default class TankBarsLabel extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    console.log(config);
    const x = config.x;
    const y = config.y;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);

    this.healthBar = this.createHealthBar();
    this.ammoBar = this.createAmmoBar();

    this.add([this.healthBar, this.ammoBar]);
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new TankHealthBar(this.scene, config);

    return healthbar;
  }

  createAmmoBar() {
    const config = this.config.ammoBar;
    const ammoBar = new TankAmmoBar(this.scene, config);

    return ammoBar;
  }
}
