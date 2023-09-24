export const count = 1;
export const anims = (i) => {
  return {
    idle: {
      key: `helicopter-idle`,
      sprite: `helicopter-sprite-${i}`,
      frames: [0],
      frameRate: 15,
      repeat: 0,
    },
    dead: {
      key: `helicopter-crash`,
      sprite: `helicopter-sprite-${i}`,
      frames: [1],
      frameRate: 15,
      repeat: 0,
    },
    propeller: {
      key: `helicopter-propeller-anim`,
      sprite: `helicopter-sprite-${i}`,
      frames: [2, 3],
      frameRate: 15,
      repeat: -1,
    },
  };
};

export const botHelicopterAnimsData = { count, anims };
