import { GAME_WIDTH, GAME_HEIGHT, HUD_CONFIG } from "../gameConfig";
import HudHealthBar from "../components/HudHealthBar";

export default class HudScene extends Phaser.Scene {
  constructor() {
    super("HudScene");
  }

  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }

  update() {}

  create() {
    this.healthBar = new HudHealthBar(this, HUD_CONFIG.health);
    this.energyBar = new HudHealthBar(this, HUD_CONFIG.energy);
  }

  updateHealthBar(value) {
    this.healthBar.updateStatus(value);
  }
}
