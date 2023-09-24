export const count = 1;
export const anims = (i) => {
  return {
    play: {
      key: `shoot-sprite-${i}`,
      sprite: `shoot-sprite-${i}`,
      frames: [0, 1, 2, 3],
      frameRate: 15,
      repeat: 0,
    },
  };
};

export const shootFireAnimsData = { count, anims };
