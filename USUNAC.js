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
