const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;
const START_ENEMY_X_RESPAWN = 50;
const END_ENEMY_X_RESPAWN = GAME_HEIGHT - START_ENEMY_X_RESPAWN;
const ENEMY_Y_RESPAWN = -200;
const ENEMY_Y_LIMIT = GAME_HEIGHT + 100;

const SPRITE_STRUCTURE = {
  body: (id) => `tank-${id}`,
  gun: (id) => `tank-${id}-gun`,
  track: (id) => `track-${id}-sprite`,
};

const PLAYER_CONFIG = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 90,
  spriteID: 1,
  speed: 300,
  turnForce: 1,
  shootDelay: 1000,
  attackRange: 600,
  backgroundImage: "bg",
  body: {
    radius: 60,
    offsetX: -60,
    offsetY: -55,
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
      offset: 30,
      visibleAtStart: false,
    },
  },
  health: {
    sprite: "healthbar",
    max: 100,
    offsetX: 0,
    offsetY: 0,
  },
  energy: {
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
  trackAnim: {
    x: 40,
    y: 0,
    sprite: "track-0-sprite",
    visibleAtStart: true,
  },
};

const HUD_CONFIG = {
  health: {
    x: 50,
    y: 250,
    max: PLAYER_CONFIG.health.max,
    barSprite: "health-bar",
    containerSprite: "unitBar-container",
    iconImage: "health-icon",
  },
  energy: {
    x: 120,
    y: 250,
    max: PLAYER_CONFIG.energy.max,
    barSprite: "energy-bar",
    containerSprite: "unitBar-container",
    iconImage: "energy-icon",
  },
};

const ENEMY_CONFIG = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  spriteID: 0,
  speed: 300,
  turnForce: 1,
  shootDelay: 1000,
  attackRange: 600,
  body: {
    radius: 60,
    offsetX: -60,
    offsetY: -55,
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
  trackAnim: {
    x: 40,
    y: 0,
    sprite: "track-1-sprite",
    visibleAtStart: true,
  },
};
