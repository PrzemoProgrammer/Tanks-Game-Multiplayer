export const count = 1;
export const anims = (i) => {
  return {
    play: {
      key: `track-sprite-${i}`,
      sprite: `track-sprite-${i}`,
      frames: [0, 1],
      frameRate: 15,
      repeat: 0,
    },
  };
};

export const playerTankTrackAnimsData = { count, anims };
