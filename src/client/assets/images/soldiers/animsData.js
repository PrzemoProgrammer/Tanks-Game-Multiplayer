export const count = 2;
export const anims = (i) => {
  return {
    move: {
      key: `soldier-move-${i}`,
      sprite: `soldier-move-spritesheet-${i}`,
      frames: [0, 1, 2, 3, 4, 5, 6],
      frameRate: 15,
      repeat: 0,
    },
    idle: {
      key: `soldier-move-idle-${i}`,
      sprite: `soldier-move-spritesheet-${i}`,
      frames: [2],
      frameRate: 15,
      repeat: 0,
    },
    attack: {
      key: `soldier-shoot-${i}`,
      sprite: `soldier-spritesheet-${i}`,
      frames: [4, 5, 6, 7],
      frameRate: 15,
      repeat: 0,
    },
    dead: {
      key: `soldier-dead-${i}`,
      sprite: `soldier-spritesheet-${i}`,
      frames: [8, 9, 10, 11],
      frameRate: 15,
      repeat: 0,
    },
    downIdle: {
      key: `soldier-idle-${i}`,
      sprite: `soldier-spritesheet-${i}`,
      frames: [0],
      frameRate: 15,
      repeat: 0,
    },
  };
};

export const botSoldierAnimsData = { count, anims };
