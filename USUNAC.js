import createAnim from "../helper/createAnim";
import { botSoldierAnimsData } from "../assets/images/soldiers/animsData";
import { botHelicopterAnimsData } from "../assets/images/vehicles/airUnits/helicopter/animsData";
import { botTankAnimsData } from "../assets/images/vehicles/landUnits/tanks/animsData";
import { explosionAnimsData } from "../assets/images/effects/explosion/animsData";

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
      //! //////////////////////////////////// effects //////////////////////////////////////////

      // this.anims.create({
      //   key: "blood-explosion",
      //   frames: this.anims.generateFrameNumbers("blood-explosion", {
      //     frames: [0, 1, 2, 3, 4, 5, 6, 7],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

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

      // this.anims.create({
      //   key: `object-destroy-sprite-${i}`,
      //   frames: this.anims.generateFrameNumbers(`object-destroy-sprite-${i}`, {
      //     start: 0,
      //     end: 8,
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

      //! //////////////////////////////////// helicopter bot //////////////////////////////////////////

      // this.anims.create({
      //   key: `helicopter-idle`,
      //   frames: this.anims.generateFrameNumbers(`helicopter-sprite`, {
      //     frames: [0],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

      // this.anims.create({
      //   key: `helicopter-crash`,
      //   frames: this.anims.generateFrameNumbers(`helicopter-sprite`, {
      //     frames: [1],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

      // this.anims.create({
      //   key: `helicopter-propeller-anim`,
      //   frames: this.anims.generateFrameNumbers(`helicopter-sprite`, {
      //     frames: [2, 3],
      //   }),
      //   frameRate: 15,
      //   repeat: -1,
      // });

      //! //////////////////////////////////// tank bot //////////////////////////////////////////

      // this.anims.create({
      //   key: `tank-move-anim-${i}`,
      //   frames: this.anims.generateFrameNumbers(`tank-sprite-${i}`, {
      //     frames: [0, 1, 2, 3],
      //   }),
      //   frameRate: 15,
      //   repeat: -1,
      // });

      // this.anims.create({
      //   key: `tank-body-idle-anim-${i}`,
      //   frames: this.anims.generateFrameNumbers(`tank-sprite-${i}`, {
      //     frames: [0],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

      // this.anims.create({
      //   key: `tank-gun-idle-anim-${i}`,
      //   frames: this.anims.generateFrameNumbers(`tank-sprite-${i}`, {
      //     frames: [6],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

      // this.anims.create({
      //   key: `tank-gun-attack-anim-${i}`,
      //   frames: this.anims.generateFrameNumbers(`tank-sprite-${i}`, {
      //     frames: [4, 5, 6],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });

      // this.anims.create({
      //   key: `tank-crash-anim-${i}`,
      //   frames: this.anims.generateFrameNumbers(`tank-sprite-${i}`, {
      //     frames: [7],
      //   }),
      //   frameRate: 15,
      //   repeat: 0,
      // });
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

      //! //////////////////////////////////// soldier bot //////////////////////////////////////////
    }
    this.createExplosionEffectAims();
    this.createBotSoldierAnims();
    this.createBotHelicopterAnims();
    this.createBotTankAnims();
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

    // const { count, anims } = botSoldierAnimsData;
    // for (let i = 0; i < count; i++) {
    //   const animsData = anims(i);

    //   for (let animData in animsData) {
    //     createAnim(this, animsData[animData]);
    //   }
    // }
  }

  createAnims({ count, anims }) {
    for (let i = 0; i < count; i++) {
      const animsData = anims(i);

      for (let animData in animsData) {
        createAnim(this, animsData[animData]);
      }
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

      this.loadHelicopterSprite();
      this.loadTankSprite(i);
      // this.loadBloodExplosion();
    }

    for (let i = 0; i < 2; i++) {
      this.loadTankTracksSprite(i);
      this.loadObjectDestroySprite(i);
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
    this.load.setPath("./src/client/assets/images/effects/shoot");
    this.load.spritesheet(`shoot-sprite-${i}`, `shoot-sprite-${i}.png`, {
      frameWidth: 848 / 4,
      frameHeight: 212,
    });
  }

  loadShootImpactSprite(i) {
    this.load.setPath("./src/client/assets/images/effects/shoot");
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
    this.load.setPath("./src/client/assets/images/effects/explosion");
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

  loadTankSprite(i) {
    this.load.setPath("./src/client/assets/images/vehicles/landUnits/tanks");

    this.load.spritesheet(`tank-sprite-${i}`, `tank-sprite-${i}.png`, {
      frameWidth: 621 / 4,
      frameHeight: 566 / 2,
    });
  }

  loadBloodExplosion() {
    this.load.setPath("./src/client/assets/images/effects/explosion");

    this.load.spritesheet(`blood-explosion`, `blood-explosion.png`, {
      frameWidth: 496 / 4,
      frameHeight: 248 / 2,
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












































import ShotManager from "../combat/Shooting";
import TankHealthBar from "../components/TankHealthBar";
import playDelayCallback from "../helper/playDelayCallback";
import collisionHandler from "../helper/collisionHandler";

export default class Bot extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.x;
    const y = config.y;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);
    this.spriteID = this.config.spriteID;
    this.moveSpeed = this.config.moveSpeed;
    this.shootDelay = this.config.shootDelay;
    this.turnForce = this.config.turnForce;
    this.bulletDamage = this.config.bullet.damage;
    this.startAttackRange = this.config.startAttackRange;
    this.canAttack = true;
    this.isAlive = true;

    this.topSprite = this.createTop(0, 0);
    this.downSprite = this.createDown(0, 0);
    this.healthBar = this.createHealthBar();

    this.add([this.downSprite, this.topSprite]);

    this.addPhysics();
    this.shootingAbility = this.createShootingAbility();
    this.playIdle();
    //! /////////////////////////////////
    // this.scene.time.addEvent({
    //   delay: 100,
    //   callback: () => this.handleShoot(),
    //   loop: true,
    // });
    //! /////////////////////////////////
  }

  update() {
    if (!this.isAlive) return;
    this.updateHealthBarPosition();
    // this.moveRight();
  }

  createTop(x, y) {
    const sprite = this.config.spriteStructure.top;
    const body = this.scene.add.sprite(x, y, sprite).setOrigin(0.5, 0.5);

    return body;
  }

  createDown(x, y) {
    const sprite = this.config.spriteStructure.down;
    const legs = this.scene.add.sprite(x, y, sprite).setOrigin(0.5, 0.5);

    return legs;
  }

  createShootingAbility() {
    const config = this.config.bullet;
    const ability = new ShotManager(this.scene, config);
    return ability;
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new TankHealthBar(this.scene, config).setScale(0.7);

    return healthbar;
  }

  addPhysics() {
    this.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.body.allowGravity = false;
    this.body.immovable = false;
    this.setUpPhysicBody();
  }

  setUpPhysicBody() {
    const { radius, offsetX, offsetY } = this.config.body;

    this.body.setCircle(radius);
    this.body.offset.x = offsetX;
    this.body.offset.y = offsetY;
  }

  getBodyWidth() {
    return this.body.width;
  }

  getBodyHeight() {
    return this.body.height;
  }

  updateHealthBarPosition() {
    const healthBar = this.healthBar;
    const offsetY = healthBar.getOffsetY();
    healthBar.setPosition(this.x, this.y + offsetY);
  }

  playIdleAnims() {
    const { idle, legsIdle } = this.config.anims;


    
    this.topSprite.play(idle, true);
    this.downSprite.play(legsIdle, true);
  }

  playShootAnim(callback) {
    const shootAnim = this.config.anims.shoot;
    this.topSprite.play(shootAnim, true).once("animationcomplete", () => {
      if (!callback) return;
      callback();
    });
  }

  playMoveAnim() {
    const animKey = this.config.anims.move;
    this.downSprite.play(animKey, true);
  }

  moveRight() {
    this.setBodyVelocityX(1);
    this.playMoveAnim();
  }

  moveLeft() {
    this.setBodyVelocityX(-1);
    this.playMoveAnim();
  }

  moveUp() {
    this.setBodyVelocityY(-1);
    this.playMoveAnim();
  }

  moveDown() {
    this.setBodyVelocityY(1);
    this.playMoveAnim();
  }
  playIdle() {
    this.stopMove();
    this.playIdleAnims();
  }

  stopAnims() {
    this.downSprite.anims.stop();
    this.topSprite.anims.stop();
  }

  playDeadAnim(callback) {
    const animKey = this.config.anims.dead;
    this.topSprite.play(animKey, true);
    if (!callback) return;
    callback();
  }

  setBodyVelocityX(sign) {
    this.body.setVelocityX(this.moveSpeed * sign);
  }

  setBodyVelocityY(sign) {
    this.body.setVelocityY(this.moveSpeed * sign);
  }

  stopMove() {
    this.body.setVelocity(0);
  }

  getActiveBullets() {
    return this.shootingAbility.getActiveBullets();
  }

  setRotate(targetX, targetY) {
    const targetAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      targetX,
      targetY
    );
    const angleDifference = targetAngle - this.rotation;
    const additionalRotation = Phaser.Math.DegToRad(-90);
    const rotationStep =
      Phaser.Math.Angle.Wrap(angleDifference) + additionalRotation;
    this.rotation += rotationStep;
  }

  handleRotation(targetX, targetY) {
    if (!this.isAlive) return;
    this.setRotate(targetX, targetY);
  }

  manageCondition(damage) {
    this.getDamage(damage);
    if (!this.haveNoHealth()) return;
    this.kill();
  }

  haveNoHealth() {
    return this.healthBar.getHealthValue() <= 0;
  }

  getDamage(damage) {
    this.healthBar.getDamage(damage);
  }

  disablePhysicsBody() {
    this.body.enable = false;
  }

  respawn() {
    this.setIsAlive(true);
  }

  setIsAlive(value) {
    this.isAlive = value;
  }

  setAlphaTween(value) {
    this.scene.tweens.add({
      targets: this,
      ease: "Power2",
      alpha: value,
      duration: 1000,
    });
  }

  makeInvisibleWithDelay(delayTime) {
    playDelayCallback(this.scene, delayTime, () => {
      this.setAlphaTween(0);
    });
  }

  kill() {
    this.disablePhysicsBody();
    this.setIsAlive(false);
    this.healthBar.setVisible(false);
    this.stopAnims();
    this.playDeadAnim(() => {
      this.makeInvisibleWithDelay(this.config.deadInvisibleDelayTime);
    });
  }

  getShootAttackRange() {
    return this.shootingAbility.getAttackRange();
  }

  canShootAttack() {
    return this.shootingAbility.isDisabled();
  }

  getActiveBullets() {
    return this.shootingAbility.getActiveBullets();
  }

  shoot() {
    this.shootingAbility.disableAttackForTime(this.shootDelay);
    this.rotation += Phaser.Math.DEG_TO_RAD * 180;
    this.shootingAbility.shootBulletFrom(this.x, this.y, this.rotation);
  }

  turnOffBullet(bullet) {
    this.shootingAbility.turnOffBullet(bullet);
  }

  getBulletDamageValue() {
    return this.bulletDamage;
  }

  handleShoot(x, y) {
    if (!this.isAlive) return;
    if (!this.isInAttackRange(x, y)) return;
    if (!this.canShootAttack()) return;
    this.shoot();
    this.playShootAnim(() => {
      this.playIdleAnims();
    });
  }

  isInAttackRange(x, y) {
    const target = { x, y };
    const offset = this.startAttackRange;
    return !collisionHandler(target, this, offset);
  }
}































import { SOLDIER_SPRITE_STRUCTURE, SOLDIER_ANIMS } from "../gameConfig";
import ShotManager from "../combat/Shooting";
import TankHealthBar from "../components/TankHealthBar";

export default class Soldier extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.x;
    const y = config.y;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);
    this.spriteID = this.config.spriteID;
    this.moveSpeed = this.config.moveSpeed;
    this.shootDelay = this.config.shootDelay;
    this.turnForce = this.config.turnForce;
    this.canAttack = true;
    this.isAlive = true;

    this.bodySprite = this.createBody(0, 0);
    this.legsSprite = this.createMoveAnim(0, 0);
    this.healthBar = this.createHealthBar();

    this.add([this.legsSprite, this.bodySprite]);

    this.addPhysics();
    this.shootingAbility = this.createShootingAbility();
    this.playIdle();
  }

  update() {
    if (!this.isAlive) return;
    this.updateHealthBarPosition();

    // this.moveRight();
  }

  createBody(x, y) {
    const sprite = SOLDIER_SPRITE_STRUCTURE.body(this.spriteID);
    const body = this.scene.add.sprite(x, y, sprite).setOrigin(0.5, 0.5);

    return body;
  }

  createMoveAnim(x, y) {
    const sprite = SOLDIER_SPRITE_STRUCTURE.legs(this.spriteID);
    const legs = this.scene.add.sprite(x, y, sprite).setOrigin(0.5, 0.5);

    return legs;
  }

  createShootingAbility() {
    const config = this.config.bullet;
    const ability = new ShotManager(this.scene, config);
    return ability;
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new TankHealthBar(this.scene, config).setScale(0.7);

    return healthbar;
  }

  addPhysics() {
    this.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.body.allowGravity = false;
    this.body.immovable = false;
    this.setUpPhysicBody();
  }

  setUpPhysicBody() {
    const { radius, offsetX, offsetY } = this.config.body;

    this.body.setCircle(radius);
    this.body.offset.x = offsetX;
    this.body.offset.y = offsetY;
  }

  getBodyWidth() {
    return this.body.width;
  }

  getBodyHeight() {
    return this.body.height;
  }

  updateHealthBarPosition() {
    const healthBar = this.healthBar;
    const offsetY = healthBar.getOffsetY();
    healthBar.setPosition(this.x, this.y + offsetY);
  }

  moveRight() {
    this.body.setVelocityX(this.moveSpeed);
    this.legsSprite.play(SOLDIER_ANIMS.move(this.spriteID), true);
  }

  moveLeft() {
    this.body.setVelocityX(-this.moveSpeed);
    this.legsSprite.play(SOLDIER_ANIMS.move(this.spriteID), true);
  }

  moveUp() {
    this.body.setVelocityY(-this.moveSpeed);
    this.legsSprite.play(SOLDIER_ANIMS.move(this.spriteID), true);
  }

  moveDown() {
    this.body.setVelocityY(this.moveSpeed);
    this.legsSprite.play(SOLDIER_ANIMS.move(this.spriteID), true);
  }
  playIdle() {
    this.stopMove();
    this.legsSprite.play(SOLDIER_ANIMS.legsIdle(this.spriteID), true);
    this.legsSprite.play(SOLDIER_ANIMS.idle(this.spriteID), true);
  }

  stopMove() {
    this.body.setVelocity(0);
  }

  getActiveBullets() {
    return this.shootingAbility.getActiveBullets();
  }

  setRotate(targetX, targetY) {
    const targetAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      targetX,
      targetY
    );

    const angleDifference = targetAngle - this.rotation;

    const additionalRotation = Phaser.Math.DegToRad(-90);
    const rotationStep =
      Phaser.Math.Angle.Wrap(angleDifference) + additionalRotation;

    this.rotation += rotationStep;
  }
}














import calculateRotationProperties from "../helper/calculateRotationProperties";
import AnimationManager from "../utils/AnimationManager";

export default class ShotManager {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.speed = this.config.speed;
    this.bulletOffset = this.config.offset;

    this.canAttack = true;
    this.activeBullets = [];
    this.bulletId = 0;
  }

  shootBulletFrom(playerX, playerY, rotation) {
    const { MathSinRotation, MathCosRotation, offsetX, offsetY } =
      calculateRotationProperties(this.bulletOffset, rotation);
    const x = playerX - 1 * MathCosRotation;
    const y = playerY - 1 * MathSinRotation;
    const xVelocity = MathSinRotation * this.speed;
    const yVelocity = -MathCosRotation * this.speed;

    const bullet = this.createBullet(x + offsetX, y + offsetY * -1)
      .setVelocity(xVelocity, yVelocity)
      .setRotation(rotation);

    bullet.setId(this.bulletId++);
    this.activeBullets.push(bullet);
  }

  createBullet(x, y) {
    const sprite = this.config.sprite;
    const bullet = new Bullet(this.scene, x, y, sprite, this.config);
    return bullet;
  }

  destroyBullet(bullet) {
    bullet.destroy();
    const bIndex = this.activeBullets.findIndex((b) => b.id === bullet.id);
    this.activeBullets.splice(bIndex, 1);
  }

  disableAttack() {
    this.canAttack = false;
  }

  enableAttackAfterDelay(time) {
    this.scene.time.delayedCall(time, () => {
      this.canAttack = true;
    });
  }

  disableAttackForTime(time) {
    this.disableAttack();
    this.enableAttackAfterDelay(time);
  }

  isDisabled() {
    return this.canAttack;
  }

  getActiveBullets() {
    return this.activeBullets;
  }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, config) {
    super(scene, x, y, sprite);
    this.scene = scene;
    (this.x = x), (this.y = y);
    scene.add.existing(this);
    this.config = config;
    this.impactAnimOffset = this.config.impactAnim.offset;

    this.impactAnim = new AnimationManager(this.scene, this.config.impactAnim);
    this.id = null;

    this.addPhysicsBody();
  }

  destroy() {
    super.destroy();
    this.destroyImpactAnim();
  }

  destroyAll() {
    super.destroy();
    this.impactAnim.destroy();
  }

  destroyImpactAnim() {
    this.impactAnim.rotation = this.rotation;
    const rotation = this.rotation;

    const MathSinRotation = Math.sin(rotation);
    const MathCosRotation = Math.cos(rotation);
    const x = this.x - 1 * MathCosRotation;
    const y = this.y - 1 * MathSinRotation;
    const offsetX = this.impactAnimOffset * MathSinRotation;
    const offsetY = this.impactAnimOffset * -MathCosRotation;

    this.impactAnim.playAnimWithPosition(x + offsetX, y + offsetY, () => {
      this.impactAnim.destroy();
    });
  }

  setId(id) {
    this.id = id;
  }

  addPhysicsBody() {
    this.scene.physics.world.enable(this);
    this.setupBody();
  }

  setupBody() {
    const { width, height, offsetX, offsetY } = this.config.body;
    this.body.width = width;
    this.body.height = height;
    this.body.offset.y = offsetY;
    this.body.offset.x = offsetX;
  }

  playImpactAnim() {
    this.impactAnim.playAnimWithPosition(this.x, this.y);
  }
}
