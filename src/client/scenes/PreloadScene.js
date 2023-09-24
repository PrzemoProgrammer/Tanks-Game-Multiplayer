import { ASSETS_CONFIG } from "../gameConfig";
import createAnim from "../helper/createAnim";
import { botSoldierAnimsData } from "../assets/images/soldiers/animsData";
import { botHelicopterAnimsData } from "../assets/images/vehicles/airUnits/helicopter/animsData";
import { botTankAnimsData } from "../assets/images/vehicles/landUnits/tanks/animsData";
import { explosionAnimsData } from "../assets/images/effects/explosion/animsData";
import { shootFireAnimsData } from "../assets/images/effects/shootFire/animsData";
import { shootImpactAnimsData } from "../assets/images/effects/shootImpact/animsData";
import { playerTankTrackAnimsData } from "../assets/images/player/track/animsData";
import loadSpriteSheetsData from "../assets/images/loadSprtiesheetsData.json";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");

    this.imagePath = ASSETS_CONFIG.images.path;
    this.imageExtension = ASSETS_CONFIG.images.extension;
    this.audioPath = ASSETS_CONFIG.audio.path;
    this.audioExtension = ASSETS_CONFIG.audio.extension;
  }

  preload() {
    this.loadOnCompleteCallback();

    this.loadImages();
    this.loadTankElements();
    this.loadAllSpriteSheets();
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
    this.createPlayerTankTrackAnims();
    this.createShootImpactAnims();
    this.createShootFireAnims();
    this.createExplosionEffectAims();
    this.createBotSoldierAnims();
    this.createBotHelicopterAnims();
    this.createBotTankAnims();
  }
  createPlayerTankTrackAnims() {
    this.createAnims(playerTankTrackAnimsData);
  }

  createShootImpactAnims() {
    this.createAnims(shootImpactAnimsData);
  }

  createShootFireAnims() {
    this.createAnims(shootFireAnimsData);
  }

  createExplosionEffectAims() {
    this.createAnims(explosionAnimsData);
  }

  createBotTankAnims() {
    this.createAnims(botTankAnimsData);
  }

  createBotHelicopterAnims() {
    this.createAnims(botHelicopterAnimsData);
  }

  createBotSoldierAnims() {
    this.createAnims(botSoldierAnimsData);
  }

  createAnims({ count, anims }) {
    for (let i = 0; i < count; i++) {
      const animsData = anims(i);

      for (let animData in animsData) {
        createAnim(this, animsData[animData]);
      }
    }
  }

  loadAllSpriteSheets() {
    for (let loadSpriteSheetData in loadSpriteSheetsData) {
      const spriteSheetData = loadSpriteSheetsData[loadSpriteSheetData];
      this.loadSpriteSheets(spriteSheetData);
    }
  }

  loadSetPath(path) {
    this.load.setPath(path);
  }

  loadSpriteSheets({
    path,
    key,
    count,
    frameWidth,
    frameHeight,
    columns,
    rows,
  }) {
    this.loadSetPath(this.imagePath + path);

    for (let i = 0; i < count; i++) {
      const imageKey = key + i;
      const imageName = key + i + this.imageExtension;
      const imageFrameWidth = frameWidth / columns;
      const imageFrameHeight = frameHeight / rows;
      this.loadSpriteSheet(
        imageKey,
        imageName,
        imageFrameWidth,
        imageFrameHeight
      );
    }
  }

  loadSpriteSheet(key, name, frameWidth, frameHeight) {
    this.load.spritesheet(key, name, {
      frameWidth: frameWidth,
      frameHeight: frameHeight,
    });
  }

  //! //////////////////////////////////////////////////////////////////////////////////////////////
  // loadImage({key, name, count}) {
  //   this.loadSetPath(this.imagePath + path);

  //   for (let i = 0; i < count; i++) {
  //     this.load.image(key + i, key + i + this.imageExtension);
  //   }
  // }

  // loadImages() {
  //   for (let loadImageData in loadImagesData) {
  //     const imageData = loadImagesData[loadImageData];
  //     this.loadImage(imageData);
  //   }

  //   this.images = [
  //     "bg",
  //     "bullet",
  //     "laser",
  //     "enemy-bullet",
  //     "tank-healthbar",
  //     "health-bar",
  //     "energy-bar",
  //     "unitBar-container",
  //     "health-icon",
  //     "energy-icon",
  //     "tank-health-bar-container",
  //     "tank-ammo-bar-container",
  //     "ammo-count-image",
  //     "rocket-bullet",
  //     "mouse-pointer-viewfinder",
  //     "hurt-screen",
  //   ];
  //   this.images.forEach((img) => {
  //     this.load.image(img, `${img}.png`);
  //   });
  // }

  //! //////////////////////////////////////////////////////////////////////////////////////////////

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

  loadOnCompleteCallback() {
    this.load.on("complete", () => {
      this.startPlayScene();
    });
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
