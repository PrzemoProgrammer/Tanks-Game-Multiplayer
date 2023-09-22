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
    const offset = 500;
    return !collisionHandler(target, this, offset);
  }
}
