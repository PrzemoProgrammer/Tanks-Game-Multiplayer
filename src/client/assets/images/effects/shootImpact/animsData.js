export const count = 1;
export const anims = (i) => {
  return {
    play: {
      key: `shoot-impact-sprite-${i}`,
      sprite: `shoot-impact-sprite-${i}`,
      frames: [0, 1, 2, 3],
      frameRate: 15,
      repeat: 0,
    },
  };
};

export const shootImpactAnimsData = { count, anims };
