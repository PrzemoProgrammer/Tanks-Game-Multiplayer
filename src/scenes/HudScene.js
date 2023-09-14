class HudScene extends Phaser.Scene {
  constructor() {
    super("HudScene");
  }

  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }
  create() {
    this.healthBar = new HudHealthBar(this, HUD_CONFIG.health);
    this.energyBar = new HudHealthBar(this, HUD_CONFIG.energy);
  }

  update() {}
}
