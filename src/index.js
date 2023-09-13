const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0.0 },
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, PlayScene, HudScene, GameOverScene],
};

const game = new Phaser.Game(config);
