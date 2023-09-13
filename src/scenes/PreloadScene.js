class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.on("complete", () => {
      this.startPlayScene();
    });

    this.loadImages();
    this.loadTankElements();
    this.loadSpriteSheets();
    //   this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.addAnims();
    // this.startPlayScene();
  }

  addAnims() {
    // for (let i = 1; i <= 5; i++) {
    //   this.anims.create({
    //     key: `skin${i}-idle`,
    //     frames: `skin${i}Idle`,
    //     frameRate: 15,
    //     repeat: -1,
    //   });
    // }
    //? ///////////// albo ///////////////////////

    // this.anims.create({
    //   key: `shoot-sprite-0`,
    //   frames: this.anims.generateFrameNumbers(`shoot-sprite-0`, {
    //     start: 0,
    //     end: 3,
    //   }),
    //   frameRate: 15,
    //   repeat: 0,
    // });

    const shootAnimSpriteCount = 1;
    for (let i = 0; i < shootAnimSpriteCount; i++) {
      this.anims.create({
        key: `shoot-sprite-${i}`,
        frames: this.anims.generateFrameNumbers(`shoot-sprite-${i}`, {
          start: 0,
          end: 3,
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `shoot-impact-sprite-${i}`,
        frames: this.anims.generateFrameNumbers(`shoot-impact-sprite-${i}`, {
          start: 0,
          end: 3,
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `object-destroy-sprite-${i}`,
        frames: this.anims.generateFrameNumbers(`object-destroy-sprite-${i}`, {
          start: 0,
          end: 8,
        }),
        frameRate: 15,
        repeat: 0,
      });
    }
  }

  loadImages() {
    this.load.setPath("./src/assets/images");

    this.images = ["bg", "bullet", "laser", "enemy-bullet", "healthbar"];
    this.images.forEach((img) => {
      this.load.image(img, `${img}.png`);
    });
  }

  loadTankElements() {
    for (let i = 0; i <= 1; i++) {
      const tankBody = "tank-" + i;
      const tankGun = "tank-" + i + "-gun";
      const tankTrack = "tank-" + i + "-track";

      this.load.image(tankBody, tankBody + ".png");
      this.load.image(tankGun, tankGun + ".png");
      this.load.image(tankTrack, tankTrack + ".png");
    }
  }

  loadSpriteSheets() {
    const shootAnimSpriteCount = 1;
    for (let i = 0; i < shootAnimSpriteCount; i++) {
      this.load.spritesheet(`shoot-sprite-${i}`, `shoot-sprite-${i}.png`, {
        frameWidth: 848 / 4,
        frameHeight: 212,
      });

      this.load.spritesheet(
        `shoot-impact-sprite-${i}`,
        `shoot-impact-sprite-${i}.png`,
        {
          frameWidth: 568 / 4,
          frameHeight: 142,
        }
      );

      this.load.spritesheet(
        `object-destroy-sprite-${i}`,
        `object-destroy-sprite-${i}.png`,
        {
          frameWidth: 1743 / 9,
          frameHeight: 194,
        }
      );
    }
  }

  // loadAudio() {
  //   this.audio = ["mainMenu", "click", "hurt", "startJump", "endJump"];
  //   this.audio.forEach((name) => {
  //     this.load.audio(name, `../audio/${name}.mp3`);
  //   });
  // }
  // addAudio() {
  //   this.game.audio = {};
  //   this.audio.forEach(
  //     (name) => (this.game.audio[name] = this.sound.add(name))
  //   );
  //   this.game.audio.mainMenu.setLoop(true);
  //   this.setupAudioVolume();
  // }
  // setupAudioVolume() {
  //   this.game.audio.hurt.setVolume(0.5);
  // }

  startPlayScene() {
    this.scene.start("PlayScene");
  }
}
