export default class PreloadScene extends Phaser.Scene {
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
    this.loadMaps();
    this.loadMapsJSON();
    //   this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.addAnims();
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

      this.anims.create({
        key: `helicopter-idle`,
        frames: this.anims.generateFrameNumbers(`helicopter-sprite`, {
          frames: [0],
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `helicopter-crash`,
        frames: this.anims.generateFrameNumbers(`helicopter-sprite`, {
          frames: [1],
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `helicopter-propeller-anim`,
        frames: this.anims.generateFrameNumbers(`helicopter-sprite`, {
          frames: [2, 3],
        }),
        frameRate: 15,
        repeat: -1,
      });
    }

    const trackAnimSpriteCount = 2;
    for (let i = 0; i < trackAnimSpriteCount; i++) {
      this.anims.create({
        key: `track-${i}-sprite`,
        frames: this.anims.generateFrameNumbers(`track-${i}-sprite`, {
          start: 0,
          end: 1,
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `soldier-move-${i}`,
        frames: this.anims.generateFrameNumbers(
          `soldier-move-spritesheet-${i}`,
          {
            start: 0,
            end: 6,
          }
        ),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `soldier-move-idle-${i}`,
        frames: this.anims.generateFrameNumbers(
          `soldier-move-spritesheet-${i}`,
          {
            start: 2,
            end: 2,
          }
        ),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `soldier-shoot-${i}`,
        frames: this.anims.generateFrameNumbers(`soldier-spritesheet-${i}`, {
          frames: [4, 5, 6, 7],
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `soldier-dead-${i}`,
        frames: this.anims.generateFrameNumbers(`soldier-spritesheet-${i}`, {
          frames: [8, 9, 10, 11],
        }),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `soldier-idle-${i}`,
        frames: [{ key: `soldier-spritesheet-${i}`, frame: 0 }],
        frameRate: 20,
      });
    }
  }

  loadImages() {
    this.load.setPath("./src/client/assets/images");

    this.images = [
      "bg",
      "bullet",
      "laser",
      "enemy-bullet",
      "tank-healthbar",
      "health-bar",
      "energy-bar",
      "unitBar-container",
      "health-icon",
      "energy-icon",
      "tank-health-bar-container",
      "tank-ammo-bar-container",
      "ammo-count-image",
      "rocket-bullet",
      "mouse-pointer-viewfinder",
      "hurt-screen",
    ];
    this.images.forEach((img) => {
      this.load.image(img, `${img}.png`);
    });
  }

  loadMaps() {
    this.load.setPath("./src/client/assets/images/maps");

    this.images = ["battle_map_1"];
    this.images.forEach((img) => {
      this.load.image(img, `${img}.png`);
    });
  }

  loadMapsJSON() {
    this.load.tilemapTiledJSON("BattleMap_1", "BattleMap_1.json");
  }

  loadTankElements() {
    for (let i = 0; i <= 1; i++) {
      const tankBody = "tank-" + i;
      const tankGun = "tank-" + i + "-gun";

      this.load.image(tankBody, tankBody + ".png");
      this.load.image(tankGun, tankGun + ".png");
    }
  }

  loadSpriteSheets() {
    for (let i = 0; i < 1; i++) {
      this.loadShootAnimSprite(i);
      this.loadShootImpactSprite(i);
      this.loadObjectDestroySprite(i);
      this.loadHelicopterSprite();
    }

    for (let i = 0; i < 2; i++) {
      this.loadTankTracksSprite(i);
      this.loadSoldierLegsMoveSprite(i);
      this.loadSoldiersSprite(i);
    }
  }

  loadHelicopterSprite() {
    this.load.setPath(
      "./src/client/assets/images/vehicles/airUnits/helicopter"
    );

    this.load.spritesheet(`helicopter-sprite`, `helicopter-sprite.png`, {
      frameWidth: 1058 / 2,
      frameHeight: 1058 / 2,
    });
  }

  loadShootAnimSprite(i) {
    this.load.setPath("./src/client/assets/images");
    this.load.spritesheet(`shoot-sprite-${i}`, `shoot-sprite-${i}.png`, {
      frameWidth: 848 / 4,
      frameHeight: 212,
    });
  }

  loadShootImpactSprite(i) {
    this.load.setPath("./src/client/assets/images");
    this.load.spritesheet(
      `shoot-impact-sprite-${i}`,
      `shoot-impact-sprite-${i}.png`,
      {
        frameWidth: 568 / 4,
        frameHeight: 142,
      }
    );
  }

  loadObjectDestroySprite(i) {
    this.load.setPath("./src/client/assets/images");
    this.load.spritesheet(
      `object-destroy-sprite-${i}`,
      `object-destroy-sprite-${i}.png`,
      {
        frameWidth: 1743 / 9,
        frameHeight: 194,
      }
    );
  }

  loadTankTracksSprite(i) {
    this.load.setPath("./src/client/assets/images");
    this.load.spritesheet(`track-${i}-sprite`, `track-${i}-sprite.png`, {
      frameWidth: 54 / 2,
      frameHeight: 158,
    });
  }

  loadSoldiersSprite(i) {
    this.load.setPath("./src/client/assets/images/soldiers");
    this.load.spritesheet(
      `soldier-spritesheet-${i}`,
      `soldier-spritesheet-${i}.png`,
      {
        frameWidth: 853 / 4,
        frameHeight: 639 / 3,
      }
    );
  }

  loadSoldierLegsMoveSprite(i) {
    this.load.setPath("./src/client/assets/images/soldiers");

    this.load.spritesheet(
      `soldier-move-spritesheet-${i}`,
      `soldier-move-spritesheet-${i}.png`,
      {
        frameWidth: 1471 / 7,
        frameHeight: 210,
      }
    );
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
    this.scene.start("HudScene");
    this.scene.start("PlayScene");
  }
}
