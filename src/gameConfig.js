const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;
const START_ENEMY_X_RESPAWN = 50;
const END_ENEMY_X_RESPAWN = GAME_HEIGHT - START_ENEMY_X_RESPAWN;
const ENEMY_Y_RESPAWN = -200;
const ENEMY_Y_LIMIT = GAME_HEIGHT + 100;

const SPRITE_STRUCTURE = {
  body: (id) => `tank-${id}`,
  gun: (id) => `tank-${id}-gun`,
  track: (id) => `tank-${id}-track`,
};

const PLAYER_CONFIG = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 90,
  spriteID: 1,
  speed: 300,
  shootDelay: 1000,
  body: {
    width: 80,
    height: 130,
    offsetX: -40,
    offsetY: -65,
  },
  bullet: {
    damage: 10,
    sprite: "bullet",
    speed: 700,
    offset: 60,
    body: {
      width: 12,
      height: 20,
      offsetX: 30,
      offsetY: 30,
    },
    impactAnim: {
      x: 0,
      y: 0,
      sprite: "shoot-impact-sprite-0",
      offset: 20,
      visibleAtStart: false,
    },
  },
  health: {
    sprite: "healthbar",
    max: 100,
    offsetX: 0,
    offsetY: 0,
  },
  shootAnim: {
    x: 0,
    y: 0,
    sprite: "shoot-sprite-0",
    visibleAtStart: false,
    offset: 70,
  },
  gun: {
    rotateSpeed: 0.02,
    offset: 10,
    ease: "Power2",
    duration: 100,
    yoyo: true,
  },
  track: {
    offsetX: 28,
  },
};

const ENEMY_CONFIG = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  spriteID: 0,
  speed: 300,
  shootDelay: 1000,
  body: {
    width: 80,
    height: 132,
    offsetX: -42,
    offsetY: -65,
  },
  bullet: {
    damage: 10,
    sprite: "enemy-bullet",
    speed: 700,
    offset: 60,
    body: {
      width: 12,
      height: 20,
      offsetX: 30,
      offsetY: 30,
    },
    impactAnim: {
      x: 0,
      y: 0,
      sprite: "shoot-impact-sprite-0",
      offset: 20,
      visibleAtStart: false,
    },
  },
  health: {
    sprite: "healthbar",
    max: 100,
    offsetX: 0,
    offsetY: 0,
  },
  shootAnim: {
    x: 0,
    y: 0,
    sprite: "shoot-sprite-0",
    visibleAtStart: false,
    offset: 70,
  },
  gun: {
    rotateSpeed: 0.02,
    offset: 10,
    ease: "Power2",
    duration: 100,
    yoyo: true,
  },
  track: {
    offsetX: 28,
  },
};
