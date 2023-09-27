export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const ASSETS_CONFIG = {
  images: {
    path: "./src/client/assets/images/",
    extension: ".png",
  },
  audio: {
    path: "./src/client/assets/audio/",
    extension: ".mp3",
  },
};

export const TANK_SPRITE_STRUCTURE = {
  body: (id) => `tank-body-${id}`,
  gun: (id) => `tank-gun-${id}`,
  track: (id) => `track-${id}-sprite`,
};

export const MOUSE_POINTER_CONFIG = {
  path: "/src/client/assets/images/mousePointers/",
  image: "mouse-pointer-viewfinder",
  imageWidth: "19",
  autoStart: true,
  offDefaultPointer: true,
};

export const BOT_TANK_CONFIG = {
  x: GAME_WIDTH / 2 + 300,
  y: GAME_HEIGHT + 250,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  spriteStructure: {
    top: `tank-sprite-0`,
    down: `tank-sprite-0`,
  },
  anims: {
    top: {
      idle: "tank-gun-idle-anim-0",
      attack: "tank-gun-attack-anim-0",
      dead: "tank-crash-anim-0",
    },
    down: {
      idle: "tank-body-idle-anim-0",
      move: "tank-move-anim-0",
    },
  },
  body: {
    radius: 55,
    offsetX: -55,
    offsetY: -50,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-1",
    speed: 700,
    offset: 130,
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

export const BOT_HELICOPTER_CONFIG = {
  x: GAME_WIDTH / 2 - 300,
  y: GAME_HEIGHT + 100,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  spriteStructure: {
    top: `helicopter-sprite-0`,
    down: `helicopter-sprite-0`,
  },
  anims: {
    top: {
      idle: "helicopter-propeller-anim-0",
      attack: "helicopter-propeller-anim-0",
      dead: "helicopter-crash-0",
    },
    down: {
      idle: "helicopter-idle-0",
      move: "helicopter-idle-0",
    },
  },
  body: {
    radius: 45,
    offsetX: -20,
    offsetY: -55,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-2",
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

export const BOT_GUN_SOLDIER_CONFIG = {
  x: GAME_WIDTH / 2 + 600,
  y: GAME_HEIGHT - 60,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  spriteStructure: {
    top: `soldier-spritesheet-0`,
    down: `soldier-move-spritesheet-0`,
  },
  anims: {
    top: {
      idle: "soldier-idle-0",
      attack: "soldier-shoot-0",
      dead: "soldier-dead-0",
    },
    down: {
      idle: "soldier-move-idle-0",
      move: "soldier-move-0",
    },
  },
  body: {
    radius: 20,
    offsetX: -20,
    offsetY: -20,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-0",
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
  explosionAnim: {
    x: 0,
    y: 0,
    sprite: "object-destroy-sprite-1",
    visibleAtStart: false,
    offset: 0,
  },
};

export const BOT_BAZOOKA_SOLDIER_CONFIG = {
  x: GAME_WIDTH / 2 + 600,
  y: GAME_HEIGHT - 60,
  spriteID: 1,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  spriteStructure: {
    top: `soldier-spritesheet-1`,
    down: `soldier-move-spritesheet-1`,
  },
  anims: {
    top: {
      idle: "soldier-idle-1",
      attack: "soldier-shoot-1",
      dead: "soldier-dead-1",
    },
    down: {
      idle: "soldier-move-idle-1",
      move: "soldier-move-1",
    },
  },
  body: {
    radius: 20,
    offsetX: -20,
    offsetY: -20,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-2",
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
  explosionAnim: {
    x: 0,
    y: 0,
    sprite: "object-destroy-sprite-1",
    visibleAtStart: false,
    offset: 0,
  },
};

export const PLAYER_CONFIG = {
  x: GAME_WIDTH / 2 + 300,
  y: GAME_HEIGHT - 90,
  spriteID: 1,
  speed: 200,
  turnForce: 1,
  shootDelay: 100,
  map: {
    tilemap: {
      JSONKey: "ArmyGameMaps",
      image: "battle_map_1",
    },
    layers: {
      ground: "Ground",
      objects: "Objects",
      collision: "Collision",
      entities: "Entities",
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
    sprite: "bullet-0",
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
    sprite: "track-sprite-0",
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
    sprite: "bullet-1",
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
    sprite: "track-sprite-1",
    visibleAtStart: true,
  },
};
