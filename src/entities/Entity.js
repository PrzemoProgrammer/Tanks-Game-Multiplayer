class Entity extends Phaser.GameObjects.Container {
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
    this.speed = this.config.speed;
    this.trackOffsetX = this.config.track.offsetX;
    this.shootDelay = this.config.shootDelay;
    this.canAttack = true;

    this.bodyImage = this.createBody(0, 0);
    this.gunImage = this.createGun(0, 0);
    this.leftTrackImage = this.createLeftTrack(-this.trackOffsetX, 0);
    this.rightTrackImage = this.createLeftTrack(this.trackOffsetX, 0);
    this.shootAnim = this.createShootAnim();
    this.healthBar = this.createHealthBar();

    this.add([
      this.leftTrackImage,
      this.rightTrackImage,
      this.bodyImage,
      this.gunImage,
      this.shootAnim,
      this.healthBar,
    ]);

    this.addPhysics();
    this.shootingAbility = this.createShootingAbility();
  }

  update() {
    this.rotateGunTowardMousePointer(
      this.gunImage,
      this.config.gun.rotateSpeed
    );
  }

  createBody(x, y) {
    const sprite = SPRITE_STRUCTURE.body(this.spriteID);
    const body = this.scene.add.image(x, y, sprite).setOrigin(0.5, 0.5);

    return body;
  }

  createGun(x, y) {
    const sprite = SPRITE_STRUCTURE.gun(this.spriteID);
    const gun = this.scene.add.image(x, y, sprite).setOrigin(0.5, 0.5);

    return gun;
  }

  createLeftTrack(x, y) {
    const sprite = SPRITE_STRUCTURE.track(this.spriteID);
    const track = this.scene.add.image(x, y, sprite).setOrigin(0.5, 0.5);

    return track;
  }

  createRightTrack(x, y) {
    const sprite = SPRITE_STRUCTURE.track(this.spriteID);
    const track = this.scene.add.image(x, y, sprite).setOrigin(0.5, 0.5);

    return track;
  }

  createShootAnim() {
    const config = this.config.shootAnim;
    const anim = new AnimationManager(this.scene, config);

    return anim;
  }

  addPhysics() {
    this.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.body.allowGravity = false;
    this.body.immovable = false;
    this.setUpPhysicBody();
  }

  setUpPhysicBody() {
    const { width, height, offsetX, offsetY } = this.config.body;
    const body = this.body;

    body.width = width;
    body.height = height;
    body.offset.x = offsetX;
    body.offset.y = offsetY;
  }

  moveRight() {
    this.body.setVelocityX(this.speed);
  }

  moveLeft() {
    this.body.setVelocityX(-this.speed);
  }

  moveUp() {
    this.body.setVelocityY(-this.speed);
  }

  moveDown() {
    this.body.setVelocityY(this.speed);
  }

  playIdle() {
    this.body.setVelocity(0);
  }

  shoot() {
    this.shootingAbility.disableAttackForTime(this.shootDelay);
    this.shootAnim.playAnimAndRotate(this.gunImage.rotation);
    this.shootingAbility.shootBulletFrom(this.x, this.y, this.gunImage);
    this.moveBackGunTween();
  }

  destroyBullet(bullet) {
    this.shootingAbility.destroyBullet(bullet);
  }

  move(side) {
    const actions = {
      left: this.moveLeft,
      right: this.moveRight,
      up: this.moveUp,
      down: this.moveDown,
    };

    const action = actions[side];
    if (action) {
      action.call(this);
    }
  }

  createShootingAbility() {
    const config = this.config.bullet;
    const ability = new ShotManager(this.scene, config);
    return ability;
  }

  getBodyWidth() {
    return this.body.width;
  }

  getBodyHeight() {
    return this.body.height;
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new HealthBar(this.scene, config);

    return healthbar;
  }

  getBulletDamageValue() {
    return this.config.bullet.damage;
  }

  rotateGunTowardMousePointer(image, rotationSpeed) {
    const targetAngle =
      Phaser.Math.Angle.Between(
        this.x + image.x - this.scene.cameras.main.scrollX,
        this.y + image.y - this.scene.cameras.main.scrollY,
        this.scene.input.x,
        this.scene.input.y
      ) - 80;

    const angleDifference = targetAngle - image.rotation;

    const rotationStep =
      Phaser.Math.Angle.Wrap(angleDifference) * rotationSpeed;

    image.rotation += rotationStep;
  }

  moveBackGunTween() {
    const { offset, ease, duration, yoyo } = this.config.gun;
    const rotation = this.gunImage.rotation;
    const { offsetX, offsetY } = calculateRotationProperties(offset, rotation);

    this.scene.tweens.add({
      targets: this.gunImage,
      ease: ease,
      x: -offsetX,
      y: -offsetY,
      duration: duration,
      yoyo: yoyo,
    });
  }

  getDamage(damage) {
    this.healthBar.getDamage(damage);
  }

  canShootAttack() {
    return this.shootingAbility.isDisabled();
  }
}
