class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }
  create() {
    this.enemies = [];

    this.background = this.createBackground();
    this.playerShip = this.createPlayerShip();
    this.enemyShip = this.createEnemyShip();
    // this.score = this.createScore(10, 10);

    this.addCollisions();

    this.setWorldBounce();
    this.mouseInput = new MouseControl(this);
    this.handleInputs = new HandleInputs(this);
  }

  update() {
    this.playerShip.update();
    this.enemies.forEach((enemy) => {
      this.updateEnemy(enemy);
    });
    this.checkPlayerBulletRange();
    this.handleInputs.handleMovement();
  }

  createBackground() {
    const background = this.add
      .image(0, 0, PLAYER_CONFIG.backgroundImage)
      .setOrigin(0, 0);

    return background;
  }

  setWorldBounce() {
    const worldWidth = this.background.displayWidth;
    const worldHeight = this.background.displayHeight;
    const cameraX = -this.playerShip.getBodyWidth() / 2;
    const cameraY = -this.playerShip.getBodyHeight() / 2;

    this.cameras.main.startFollow(
      this.playerShip,
      false,
      0.5,
      0.5,
      cameraX,
      cameraY
    );
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
  }

  updateEnemy(enemy) {
    // enemy.getActiveBullets()
    // if(  checkCollisionWithObject(
    //   bullet.body,
    //   this.playerShip.body,
    //   PLAYER_CONFIG.attackRange) ) {
    //   }
  }

  createPlayerShip() {
    const config = PLAYER_CONFIG;
    const player = new Player(this, config);

    return player;
  }

  createEnemyShip() {
    const config = ENEMY_CONFIG;
    const enemy = new Enemy(this, config);
    this.enemies.push(enemy);

    return enemy;
  }

  addCollisions() {
    this.addPlayerBulletToEnemyCollisions();
    this.addPlayerToEnemyCollision();
  }

  addPlayerBulletToEnemyCollisions() {
    const playerShipBullets = this.playerShip.shootingAbility.bullets;
    const enemyShip = this.enemyShip;

    setCollision(this, playerShipBullets, enemyShip, (bullet) => {
      this.playerShip.destroyBullet(bullet);
      // this.score.updateScore(1);
      enemyShip.getDamage(this.playerShip.getBulletDamageValue());
    });
  }

  addPlayerToEnemyCollision() {
    setCollision(this, this.playerShip, this.enemyShip, () => {
      console.log("You get Hit");
    });
  }

  checkPlayerBulletRange() {
    const playerShipBullets = this.playerShip.shootingAbility.bullets;

    playerShipBullets.forEach((bullet) => {
      if (
        checkCollisionWithObject(
          bullet.body,
          this.playerShip.body,
          PLAYER_CONFIG.attackRange
        )
      ) {
        this.playerShip.destroyBullet(bullet);
      }
    });
  }

  // createScore(x, y) {
  //   const config = {
  //     fontFamily: "Arial",
  //     fontSize: "30px",
  //     color: "#FFFFFF",
  //     stroke: "#FFFFFF",
  //     strokeThickness: 1,
  //   };
  //   const text = "Score: ";
  //   const score = new ScoreCounter(this, x, y, text, config);
  //   return score;
  // }
}
