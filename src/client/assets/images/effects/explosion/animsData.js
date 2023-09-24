export const count = 2;
export const anims = (i) => {
  return {
    play: {
      key: `object-destroy-sprite-${i}`,
      sprite: `object-destroy-sprite-${i}`,
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      frameRate: 15,
      repeat: 0,
    },
  };
};

export const explosionAnimsData = { count, anims };
