export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;
export const START_ENEMY_X_RESPAWN = 50;
export const END_ENEMY_X_RESPAWN = GAME_HEIGHT - START_ENEMY_X_RESPAWN;
export const ENEMY_Y_RESPAWN = -200;
export const ENEMY_Y_LIMIT = GAME_HEIGHT + 100;

export const TANK_SPRITE_STRUCTURE = {
  body: (id) => `tank-${id}`,
  gun: (id) => `tank-${id}-gun`,
  track: (id) => `track-${id}-sprite`,
};

export const MOUSE_POINTER_CONFIG = {
  path: "/src/client/assets/images/",
  image: "mouse-pointer-viewfinder",
  imageWidth: "19",
  autoStart: true,
  offDefaultPointer: true,
};

export const HELICOPTER_CONFIG = {
  x: GAME_WIDTH / 2 - 600,
  y: GAME_HEIGHT + 100,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  spriteStructure: {
    top: `helicopter-sprite`,
    down: `helicopter-sprite`,
  },
  anims: {
    move: "helicopter-idle",
    shoot: "helicopter-propeller-anim",
    dead: "helicopter-crash",
    idle: "helicopter-propeller-anim",
    legsIdle: "helicopter-idle",
  },
  body: {
    radius: 45,
    offsetX: -20,
    offsetY: -55,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "rocket-bullet",
    speed: 700,
    offset: 100,
    startCount: 15,
    body: {
      width: 12,
      height: 12,
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
    image: "tank-healthbar",
    containerImage: "tank-health-bar-container",
    max: 100,
    offsetX: 0,
    offsetY: -50,
  },
  explosionAnim: {
    x: 0,
    y: 0,
    sprite: "object-destroy-sprite-0",
    visibleAtStart: false,
    offset: 0,
  },
};

export const GUN_SOLDIER_CONFIG = {
  x: GAME_WIDTH / 2 + 200,
  y: GAME_HEIGHT - 60,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  spriteStructure: {
    top: `soldier-spritesheet-0`,
    down: `soldier-move-spritesheet-0`,
  },
  anims: {
    move: "soldier-move-0",
    shoot: "soldier-shoot-0",
    dead: "soldier-dead-0",
    idle: "soldier-idle-0",
    legsIdle: "soldier-move-idle-0",
  },
  body: {
    radius: 20,
    offsetX: -20,
    offsetY: -20,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet",
    speed: 700,
    offset: 30,
    startCount: 15,
    body: {
      width: 12,
      height: 12,
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
    image: "tank-healthbar",
    containerImage: "tank-health-bar-container",
    max: 100,
    offsetX: 0,
    offsetY: -50,
  },
};

export const BAZOOKA_SOLDIER_CONFIG = {
  x: GAME_WIDTH / 2 + 200,
  y: GAME_HEIGHT - 60,
  spriteID: 1,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  spriteStructure: {
    top: `soldier-spritesheet-1`,
    down: `soldier-move-spritesheet-1`,
  },
  anims: {
    move: "soldier-move-1",
    shoot: "soldier-shoot-1",
    dead: "soldier-dead-1",
    idle: "soldier-idle-1",
    legsIdle: "soldier-move-idle-1",
  },
  body: {
    radius: 20,
    offsetX: -20,
    offsetY: -20,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "rocket-bullet",
    speed: 700,
    offset: 30,
    startCount: 15,
    body: {
      width: 12,
      height: 12,
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
    image: "tank-healthbar",
    containerImage: "tank-health-bar-container",
    max: 100,
    offsetX: 0,
    offsetY: -50,
  },
};

export const PLAYER_CONFIG = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 90,
  spriteID: 1,
  speed: 200,
  turnForce: 1,
  shootDelay: 100,
  map: {
    tilemap: {
      JSONKey: "BattleMap_1",
      image: "battle_map_1",
    },
    layers: {
      ground: "Ground",
      obstacles: "Obstacles",
    },
  },
  body: {
    radius: 60,
    offsetX: -60,
    offsetY: -55,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet",
    speed: 700,
    offset: 60,
    startCount: 15,
    body: {
      width: 12,
      height: 12,
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
  bars: {
    x: 0,
    y: 0,
    health: {
      image: "tank-healthbar",
      containerImage: "tank-health-bar-container",
      max: 1000,
      offsetX: 0,
      offsetY: -130,
    },
    ammoBar: {
      image: "ammo-count-image",
      imageWidth: 17,
      containerImage: "tank-ammo-bar-container",
      resetDelayTime: 1000,
      ammoCount: 5,
      maxAmmo: 10,
      offsetX: -100,
      offsetY: -100,
    },
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
  explosionAnim: {
    x: 0,
    y: 0,
    sprite: "object-destroy-sprite-0",
    visibleAtStart: false,
    offset: 0,
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

export const HUD_CONFIG = {
  health: {
    x: 50,
    y: 250,
    max: PLAYER_CONFIG.bars.health.max,
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
  hurtScreen: {
    image: "hurt-screen",
    animEase: "Power2",
    animDuration: 200,
  },
};

export const ENEMY_CONFIG = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2,
  spriteID: 0,
  speed: 200,
  turnForce: 1,
  shootDelay: 200,
  body: {
    radius: 60,
    offsetX: -60,
    offsetY: -55,
  },
  bullet: {
    damage: 20,
    attackRange: 900,
    sprite: "enemy-bullet",
    speed: 700,
    offset: 60,
    startCount: 15,
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
  bars: {
    x: 0,
    y: 0,
    health: {
      image: "tank-healthbar",
      containerImage: "tank-health-bar-container",
      max: 100,
      offsetX: 0,
      offsetY: -100,
    },
    ammoBar: {
      image: "ammo-count-image",
      imageWidth: 17,
      containerImage: "tank-ammo-bar-container",
      resetDelayTime: 3000,
      ammoCount: 10,
      maxAmmo: 10,
      offsetX: -100,
      offsetY: -70,
    },
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
  explosionAnim: {
    x: 0,
    y: 0,
    sprite: "object-destroy-sprite-0",
    visibleAtStart: false,
    offset: 0,
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
