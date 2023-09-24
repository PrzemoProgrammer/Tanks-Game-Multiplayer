export const count = 1;
export const anims = (i) => {
  return {
    move: {
      key: `tank-move-anim-${i}`,
      sprite: `tank-sprite-${i}`,
      frames: [0, 1, 2, 3],
      frameRate: 15,
      repeat: -1,
    },
    bodyIdle: {
      key: `tank-body-idle-anim-${i}`,
      sprite: `tank-sprite-${i}`,
      frames: [0],
      frameRate: 15,
      repeat: 0,
    },
    gunIdle: {
      key: `tank-gun-idle-anim-${i}`,
      sprite: `tank-sprite-${i}`,
      frames: [6],
      frameRate: 15,
      repeat: 0,
    },
    dead: {
      key: `tank-crash-anim-${i}`,
      sprite: `tank-sprite-${i}`,
      frames: [7],
      frameRate: 15,
      repeat: 0,
    },
    attack: {
      key: `tank-gun-attack-anim-${i}`,
      sprite: `tank-sprite-${i}`,
      frames: [4, 5, 6],
      frameRate: 15,
      repeat: 0,
    },
  };
};

export const botTankAnimsData = { count, anims };
