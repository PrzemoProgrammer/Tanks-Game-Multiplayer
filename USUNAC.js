setUpPhysicBody() {
  const { width, height, offsetX, offsetY } = this.config.body;
  const body = this.body;

  body.width = width;
  body.height = height;
  body.offset.x = offsetX;
  body.offset.y = offsetY;
}



body: {
  width: 80,
  height: 110,
  offsetX: -40,
  offsetY: -55,
},














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

  unableAttackAfterDelay(time) {
    this.scene.time.delayedCall(time, () => {
      this.canAttack = true;
    });
  }

  disableAttackForTime(time) {
    this.disableAttack();
    this.unableAttackAfterDelay(time);
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
